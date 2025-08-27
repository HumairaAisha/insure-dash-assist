import express from "express";
import bodyParser from "body-parser";
import { sendSms } from "./sendSms.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mock claim storage
let claims = [];
let counter = 1;

// Handle incoming SMS from users
app.post("/incoming-messages", async (req, res) => {
  const { text, from } = req.body;
  console.log(`Received from ${from}: ${text}`);

  let reply;

  if (text.trim() === "" || text.toLowerCase() === "hi" || text.toLowerCase() === "claim") {
    reply =
      "Welcome to Smart Claim Assistant \n" +
      "Reply with your details like this:\n" +
      "Name, Claim Type, Amount, Location";
  } else {
    const parts = text.split(",").map(p => p.trim());
    if (parts.length < 4) {
      reply =
        "Invalid format.\nUse: Name, Claim Type, Amount, Location";
    } else {
      const [name, claimType, amount, location] = parts;

      // Create new claim
      const claimId = `CLM-2025-${String(counter).padStart(3, "0")}`;
      counter++;
      const claim = {
        id: claimId,
        customerName: name,
        channel: "SMS",
        fraudScore: Math.floor(Math.random() * 100), // mock fraud score
        status: "pending",
        amount,
        date: new Date().toISOString().split("T")[0],
        location,
        claimType
      };
      claims.push(claim);

      reply =
        `Claim received!\n` +
        `ID: ${claimId}\n` +
        `Name: ${name}\n` +
        `Type: ${claimType}\n` +
        `Amount: ${amount}\n` +
        `Location: ${location}\n\n` +
        "We’ll update you once it is processed.";
    }
  }

  await sendSms(from, reply);
  res.status(200).send("Message processed");
});

// New endpoint for ClaimsTable frontend
app.post("/api/send-sms", async (req, res) => {
  const { phoneNumber, message } = req.body;
  try {
    const result = await sendSms(phoneNumber, message);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send SMS" });
  }
});

// Endpoint for frontend to fetch claims
app.get("/api/claims", (req, res) => {
  res.json(claims);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
