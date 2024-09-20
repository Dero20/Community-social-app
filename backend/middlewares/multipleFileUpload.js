import multer from "multer";
import fs from "fs";
import cloudinary from "cloudinary"; // Import your Cloudinary configuration
import util from "util";

// Multer configuration to handle file uploads
const upload = multer({ dest: "uploads/" });

const readFileAsync = util.promisify(fs.readFile);
const unlinkFileAsync = util.promisify(fs.unlink);

const multipleFileUpload = (folderName) => {
    return (req, res, next) => {
        upload.array("files")(req, res, async (err) => {
            console.log("Req.files,", req.files);
            if (err) {
                return res
                    .status(500)
                    .json({ message: "File upload failed", error: err.message });
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: "No files uploaded" });
            }

            try {
                const uploadResults = [];

                for (const file of req.files) {
                    // Convert file to Base64
                    const filePath = file.path;
                    console.log("Attempting to process file at:", filePath);

                    const fileBuffer = await readFileAsync(filePath);
                    const base64File = fileBuffer.toString("base64");
                    const base64String = `data:${file.mimetype};base64,${base64File}`;

                    // Upload Base64 string to Cloudinary
                    const result = await cloudinary.v2.uploader.upload(base64String, {
                        folder: folderName, // Use the dynamic folder name
                        resource_type: "auto", // Auto-detect the resource type (image, raw, etc.)
                    });

                    // Collect the Cloudinary response
                    uploadResults.push(result);

                    // Delete the local file after upload
                    try {
                        await unlinkFileAsync(filePath);
                        console.log(`Successfully deleted the file at ${filePath}`);
                    } catch (error) {
                        console.error(`Failed to delete the file at ${filePath}:`, error);
                    }
                }

                // Add the Cloudinary responses to the request object for further processing
                req.cloudinaryUploads = uploadResults;

                // Move to the next middleware or route handler
                next();
            } catch (error) {
                console.error("Error processing files:", error);
                return res
                    .status(500)
                    .json({ message: "File processing failed", error: error.message });
            }
        });
    };
};

export default multipleFileUpload;
