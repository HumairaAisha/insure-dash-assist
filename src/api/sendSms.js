import AfricasTalking from "africastalking";
import { config } from "dotenv";

// Load environmental variables
config();

const africastalking = AfricasTalking({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME,
});

// Function to send SMS
const sendSms = async (to, msg) => {
  try {
    const result = await africastalking.SMS.send({
      to: to,
      message: msg,
      from: process.env.AT_NUMBER,
    });
    console.log(`Sent -> '${msg}' to '${to}'`);
    return result;
  } catch (ex) {
    console.error("Error sending SMS:", ex);
  }
};

export { sendSms };
