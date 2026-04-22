const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();

app.use(cors());
app.use(express.json());

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@yourdomain.com";

if (!SENDGRID_API_KEY) {
  console.error("Missing SENDGRID_API_KEY");
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

app.get("/", (req, res) => {
  res.status(200).send("Server is alive and responding!");
});

app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

const sendEmail = async (to, subject, html) => {
  if (!SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY is not configured");
  }

  const msg = {
    to,
    from: FROM_EMAIL,
    subject,
    html,
  };

  return await sgMail.send(msg);
};

app.post("/send-email", async (req, res) => {
  try {
    const { recipientEmail, inviteLink } = req.body;

    if (!recipientEmail || !inviteLink) {
      return res.status(400).json({
        error: "recipientEmail and inviteLink are required",
      });
    }

    const subject = "Password Reset - Secure Invitation Link";
    const htmlContent = `
      <div>
        <p>You have been added as a user to Nationwide Assist CRM.</p>
        <p>To activate your account and set your password, click below:</p>
        <a href="${inviteLink}">${inviteLink}</a>
      </div>
    `;

    const response = await sendEmail(recipientEmail, subject, htmlContent);

    return res.status(200).json({
      message: "Success",
      statusCode: response?.[0]?.statusCode || 202,
    });
  } catch (err) {
    console.error("SendGrid /send-email error:", {
      message: err.message,
      code: err.code,
      responseBody: err.response?.body,
    });

    return res.status(500).json({
      error: "Failed to send email",
      details: err.response?.body || err.message,
    });
  }
});

app.post("/send-reset-link", async (req, res) => {
  try {
    const { recipientEmail, inviteLink } = req.body;

    if (!recipientEmail || !inviteLink) {
      return res.status(400).json({
        error: "recipientEmail and inviteLink are required",
      });
    }

    const subject = "Reset Password";
    const htmlContent = `
      <div>
        <p>We received a request to reset the password for your Nationwide Assist CRM account.</p>
        <p>To reset your password, click below:</p>
        <a href="${inviteLink}">${inviteLink}</a>
      </div>
    `;

    const response = await sendEmail(recipientEmail, subject, htmlContent);

    return res.status(200).json({
      message: "Success",
      statusCode: response?.[0]?.statusCode || 202,
    });
  } catch (err) {
    console.error("SendGrid /send-reset-link error:", {
      message: err.message,
      code: err.code,
      responseBody: err.response?.body,
    });

    return res.status(500).json({
      error: "Failed to send email",
      details: err.response?.body || err.message,
    });
  }
});

app.post("/send-otp", async (req, res) => {
  try {
    const { recipientEmail, otp } = req.body;

    if (!recipientEmail || !otp) {
      return res.status(400).json({
        error: "recipientEmail and otp are required",
      });
    }

    const subject = "Your One-Time Password (OTP)";
    const htmlContent = `
      <div style="font-family: Helvetica, Arial, sans-serif; padding: 24px;">
        <h2>Hi</h2>
        <p>Your One-Time Password (OTP) for accessing your Nationwide Assist CRM account is:</p>
        <div style="font-size: 40px; font-weight: 700; color: #0352FD; letter-spacing: 8px; margin: 24px 0;">
          ${otp}
        </div>
        <p>This OTP is valid for 5 minutes and can only be used once.</p>
        <p>If you did not request this OTP, you can safely ignore this email.</p>
      </div>
    `;

    const response = await sendEmail(recipientEmail, subject, htmlContent);

    return res.status(200).json({
      message: "Success",
      statusCode: response?.[0]?.statusCode || 202,
    });
  } catch (err) {
    console.error("SendGrid /send-otp error:", {
      message: err.message,
      code: err.code,
      responseBody: err.response?.body,
    });

    return res.status(500).json({
      error: "Failed to send email",
      details: err.response?.body || err.message,
    });
  }
});

// For local use
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

// For Vercel
module.exports = app;
