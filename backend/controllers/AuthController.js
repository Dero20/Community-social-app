import bcrypt from "bcryptjs";
import User from "../models/User.Model.js";
import Chat from "../models/Chat.Model.js";
import Notification from "../models/Notification.Model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import { generateToken } from "../utils/generateToken.js";
import { passwordResetEmail, sendOtp } from "../utils/emailClient.js";

export const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, location, speciality } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(
        new ErrorResponse("User with same email already exists", 400)
      );
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicture: {
        url: "https://res.cloudinary.com/dxkufsejm/image/upload/v1630356446/profile_pictures/default_profile_picture.png",
        public_id: "profile_pictures/default_profile_picture.png",
      },
      location,
      speciality,
    });

    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit otp

    const expiry = new Date();

    expiry.setMinutes(expiry.getMinutes() + 5); // 5 minutes expiry

    user.otp = {
      code: otp,
      expiry: expiry,
    };

    await user.save();

    // const emailSent = await sendOtp(email, otp);
    console.log("OTP: ", otp);

    // if (emailSent instanceof Error) {
    //   return next(new ErrorResponse("Error sending OTP", 500));
    // }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
});

export const verifyOtp = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    if (user.otp === otp) {
      return next(new ErrorResponse("Invalid OTP", 400));
    }

    if (user.otp.expiry < new Date()) {
      return next(new ErrorResponse("OTP expired", 400));
    }
    user.otp = undefined; // Clear OTP after verification
    user.isVerified = true; // Mark user as verifie
    await user.save();

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      data: user,
      token: token,
    });
  } catch (error) {
    return next(error);
  }
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new ErrorResponse("Please provide email and password", 400));
    }

    let user;

    user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid email", 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid password", 401));
    }

    const foundUser = await User.findById(user._id).select("-password");

    const token = generateToken(foundUser);

    return res.status(200).json({
      success: true,
      data: foundUser,
      token: token,
    });
  } catch (error) {
    return next(error);
  }
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  console.log("email: ", req.body);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit otp

    const resetEmail = await passwordResetEmail(email, otp);

    if (resetEmail instanceof Error) {
      return next(new ErrorResponse("Error sending password reset email", 500));
    }

    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 5); // 5 minutes expiry

    user.passwordResetOtp = {
      code: otp,
      expiry: expiry,
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, otp, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    if (user.passwordResetOtp.code !== otp) {
      return next(new ErrorResponse("Invalid OTP", 400));
    }

    if (user.passwordResetOtp.expiry < new Date()) {
      return next(new ErrorResponse("OTP expired", 400));
    }

    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return next(error);
  }
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.userID).select("+password");

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      data: "Password updated successfully",
    });
  } catch (error) {
    return next(error);
  }
});

export const getProfile = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.userID).select("-password");

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
});

export const getSingleProfile = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    gender,
    profilePicture,
  } = req.body;

  try {
    const user = await User.findById(req.userID);

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    let newProfilePicture;
    if (profilePicture) {
      // Delete the previous profile picture from cloudinary
      await cloudinary.uploader.destroy(user.profilePicture.public_id);

      // Upload new profile picture to cloudinary

      const uploadedImage = await cloudinary.uploader.upload(profilePicture, {
        folder: "profile_pictures",
        width: 150,
        height: 150,
        crop: "fill",
      });

      newProfilePicture = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;
    user.profilePicture = profilePicture
      ? newProfilePicture
      : user.profilePicture;

    await user.save();

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
});

export const getUserInbox = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.userID);

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    const inboxes = await Chat.find({});

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return next(error);
  }
});


export const getNearbyUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find({})
    const me = await User.findById(req.userID)
    const neighborHoodMatch = users.filter(user => user.location.neighborHood === me.location.neighborHood)

    // Need to filter out the current user from the list

    const filteredUsers = neighborHoodMatch.filter(user => user._id.toString() !== me._id.toString())

    if (!filteredUsers) {
      return next(new ErrorResponse("No users found in your neighborhood", 404))
    }

    return res.status(200).json({
      success: true,
      data: filteredUsers
    })

  } catch (error) {
    return next(error);

  }
})


export const getUserNotifications = asyncHandler(async (req, res, next) => {
  try {
    const userNotifications = await Notification.find({ user: req.userID }).sort({ date: -1 })

    return res.status(200).json({
      success: true,
      data: userNotifications
    })

  } catch (error) {
    return next(error);

  }
})