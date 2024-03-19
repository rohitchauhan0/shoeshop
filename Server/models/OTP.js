const mongoose = require("mongoose");
const mailSender = require("../utils/MailSender");

const otpModal = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 5,
  },
});

async function sendVerificationEmail (email, otp){
    try {
        const mailresponse = await mailSender(email, "Verification Email", `Here is your OTP -> ${otp}`)
        console.log("Email sent successfully.. ", email)
        
    } catch (error) {
        console.log("Error occurred while sending email: ", error);
		throw error;
    }
}

otpModal.pre("save", async function(next){
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp)
    }
    next()
})



module.exports = mongoose.model("otp", otpModal)