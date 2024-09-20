import multer from "multer";
import fs from "fs";
import cloudinary from "cloudinary"; // Import your Cloudinary configuration
import util from "util";

// Multer configuration to handle file uploads
const upload = multer({ dest: "uploads/" });

const readFileAsync = util.promisify(fs.readFile);
const unlinkFileAsync = util.promisify(fs.unlink);

const singleFileUpload = (folderName) => {
  return (req, res, next) => {
    
    upload.single("file")(req, res, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "File upload failed", error: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      try {
        // Convert file to Base64
        const filePath = req.file.path;
        console.log("Attempting to process file at:", filePath);

        const fileBuffer = await readFileAsync(filePath);
        const base64File = fileBuffer.toString("base64");
        const base64String = `data:${req.file.mimetype};base64,${base64File}`;

        // Upload Base64 string to Cloudinary
        const result = await cloudinary.v2.uploader.upload(base64String, {
          folder: folderName, // Use the dynamic folder name
          resource_type: "auto", // Auto-detect the resource type (image, raw, etc.)
        });

        // Add the Cloudinary response to the request object for further processing
        req.cloudinaryUpload = result;

        // Delete the local file after upload
        try {
          await unlinkFileAsync(filePath);
          console.log(`Successfully deleted the file at ${filePath}`);
        } catch (error) {
          console.error(`Failed to delete the file at ${filePath}:`, error);
        }

        // Move to the next middleware or route handler
        next();
      } catch (error) {
        console.error("Error processing file:", error);
        return res
          .status(500)
          .json({ message: "File processing failed", error: error.message });
      }
    });
  };
};

export default singleFileUpload;
