const userModel = require("../models/userModel");
const FormData = require("form-data");
const axios = require("axios");

const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    if (!userId || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "No user found" });
    }

    if (user.creditBalance < 5) {
      return res.json({
        success: false,
        message: "No credit balance",
        credit: user.creditBalance,
      });
    }

    const form = new FormData();
    form.append("prompt", prompt);

    const response = await axios.post("https://clipdrop-api.co/text-to-image/v1", form, {
      headers: {
        ...form.getHeaders(), // required for multipart/form-data
        "x-api-key": process.env.CLIPDROP_API,
      },
      responseType: "arraybuffer",
    });

    const contentType = response.headers["content-type"] || "image/png"; // fallback
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const resultImage = `data:${contentType};base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 5,
    });

    return res.json({
      success: true,
      message: "Image generated",
      creditBalance: user.creditBalance - 5,
      resultImage,
    });
  } catch (error) {
    console.error("Error generating image:", error.message);
    return res.status(500).json({ success: false, message: "Error: " + error.message });
  }
};

module.exports = { generateImage };
