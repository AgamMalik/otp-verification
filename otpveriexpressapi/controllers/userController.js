import dotenv from "dotenv";
dotenv.config();

import { initClient } from "messagebird";
const messagebird = initClient(process.env.MESSAGEBIRD_API_KEY);

class UserController {
  // send otp to user
  static userLogin = async (req, res) => {
    const { phonenumber } = req.body;
    const newPhoneNumber = "+91" + phonenumber;
    var params = {
      template: "Your Login OTP is %token",
      timeout: 300,
    };

    messagebird.verify.create(newPhoneNumber, params, (err, response) => {
      if (err) {
        console.log("OTP Send Error:", err);
        res
          .status(200)
          .send({ status: "failed", message: "Unable to Send OTP" });
      } else {
        // OTP Send Success
        console.log("OTP Send Response:", response);
        res.status(200).send({
          status: "success",
          message: "OTP Send Successfully",
          id: response.id,
        });
      }
    });
  };

  // Verify OTP is correct or Not
  static verifyOTP = async (req, res) => {
    const { id, otpcode } = req.body;
    messagebird.verify.verify(id, otpcode, (err, response) => {
      if (err) {
        // Incorrect OTP
        console.log("OTP Verification Error:", err);
        res.status(200).send({ status: "failed", message: "Invalid OTP" });
      } else {
        // Login Success
        console.log("OTP Verification Response:", response);
        res.status(200).send({ status: "success", message: "Login Success" });
      }
    });
  };
}

export default UserController;
