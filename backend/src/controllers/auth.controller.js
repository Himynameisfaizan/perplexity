import userModel from "../models/user.model.js";
import { sendMail } from "../services/mail.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function userRegister(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User already exist with this account",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "20h" },
  );

  res.cookie("token", token);

  await sendMail({
    to: email,
    subject: "Welcome to perplexity",
    html: `
    <p>Hi ${user.username},</p>
    <p>This is team perplexity to meet with you for a speacial candidate</p>
    <p>Click the link to to verified your account <a href='http://localhost:3000/api/auth/verified?token=${token}'>Verify email</a></p>,
    <p style='color:red;'>If you never know about this never click on this link</p>
    <p>Best regards, <br> The perplexity team</p>
    `,
  });

  res.status(201).json({
    message: `Profile created successfully for ${user.username}`,
    user,
    token,
  });
}

export async function userLogin(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await userModel
      .findOne({
        $or: [{ username }, { email }],
      })
      .select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found by this account",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "20h" },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: `${user.username} you logged in successfully`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    });
  } catch (err) {
    return res.status(403).json({
      message: `forbidden content ${err}`,
    });
  }
}

export async function getMe(req, res) {
  const userId = req.user.id;

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found by this request",
    });
  }

  res.status(200).json({
    message: `${user.username} your profile successfully fetched`,
    success: true,
    user,
  });
}

export async function verifyMail(req, res) {
  const user = await userModel.findOne({ username: req.user.username });

  if (!user) {
    return res.status(404).json({
      meesage: "user not found by this account",
    });
  }

  user.verified = true;
  user.save();

  res.status(200).json({
    message: "email verified successfully",
  });
}
