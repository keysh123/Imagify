const userModel = require("../models/userModel");
const FormData = require("form-data");
const axios = require("axios");
const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;
    if (!userId && !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "No user found" });
    }
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "No credit balance",
        credit: user.creditBalance,
      });
    }
    const form = new FormData();
    form.append("prompt", prompt);
    console.log(process.env.CLIPDROP_API)

    const response = await axios.post("https://clipdrop-api.co/text-to-image/v1", form, {

      headers: {
        "x-api-key": process.env.CLIPDROP_API,
      },
      
      responseType: 'arrayBuffer',
    });
    const base64Image = Buffer.from(response.data , 'binary').toString('base64')
    const resultImage = `data:image.png;base64,${base64Image}`

    await userModel.findByIdAndUpdate(user._id , {creditBalance : user.creditBalance-1});
    return res.json({ success: true, message: "Image generated" , creditBalance : user.creditBalance-1 , resultImage});
  } catch (error) {
    console.log("error", error);
    return res.json({ success: false, message: "some error" + error.message });
  }
};
module.exports = { generateImage };
