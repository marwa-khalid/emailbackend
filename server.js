const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware MUST come before routes
app.use(cors());
app.use(express.json());

// Add a simple GET route to test the browser directly
app.get("/", (req, res) => {
  res.send("Server is alive and responding!");
});
console.log("Initializing transporter...");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "marwakhalid558@gmail.com",
    pass: "mjeh qhpm tocf opxw", // <--- MAKE SURE THIS IS CORRECT
  },
});

// Test the transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.log("Transporter error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send-email", async (req, res) => {
  console.log("Received request:", req.body);
  const { recipientEmail, inviteLink } = req.body;

  const mailOptions = {
    from: "marwakhalid558@gmail.com",
    to: recipientEmail,
    subject: "Password Reset - Secure Invitation Link",
    html: `<div> 
<table border="0" cellpadding="0" cellspacing="0" width="100%">

<tr>

<td style="padding: 40px 0;">

<table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-collapse: collapse; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">


<tr>

<td align="center" style="padding: 48px;">


<h2 style="color: #000000; font-size: 20px; font-weight: 600; margin: 0 0 16px 0; line-height: 1.2;">

Hi

</h2>



<p style="color: #444444; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">

You have been added as a user to the <br />

<span style="font-weight: 600;">Nationwide Assist CRM</span>

</p>



<table border="0" cellpadding="0" cellspacing="0" width="100%">

<tr>

<td align="center" style="padding-bottom: 32px;">

<p style="color: #444444; font-size: 12px; font-weight: 400; margin: 0 0 12px 0; max-width: 424px;">

To activate your account and set your password, please click the link below:

</p>

<a href=${inviteLink}

style="color: #0352FD; font-size: 12px; text-decoration: none; word-break: break-all;">

${inviteLink}

</a>

</td>

</tr>

</table>



<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 394px;">

<tr>

<td align="center" style="padding-bottom: 48px;">

<p style="color: #444444; font-size: 12px; line-height: 1.6; margin: 0 0 24px 0;">

For security reasons, this link will expire in 24 hours.<br />

If the link expires, please contact your admin to request a new activation email.

</p>

<p style="color: #444444; font-size: 12px; font-style: semi-bold; margin: 0;">

If you did not expect this invitation, you can safely ignore this message.

</p>

</td>

</tr>

</table>



<table border="0" cellpadding="0" cellspacing="0" width="100%">

<tr>

<td style="height: 1px; background-color: #CCCCCC; line-height: 1px; font-size: 1px;">&nbsp;</td>

</tr>

</table>



<table border="0" cellpadding="0" cellspacing="0" width="100%">

<tr>

<td align="center" style="padding-top: 32px; padding-bottom: 48px;">

<span style="color: #000000; font-size: 12px; font-weight: 400;">Kind regards,</span><br />

<span style="color: #000000; font-size: 14px; font-weight: 600;">Nationwide Assist IT / Systems Team</span>

</td>

</tr>

</table>



<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F9FAFB; border: 1px solid #F3F4F6; border-radius: 6px;">

<tr>

<td align="center" style="padding: 16px;">

<span style="color: #888888; font-family: 'Stack Sans Headline-SemiBold', Helvetica; font-size: 14px; font-weight: 600; letter-spacing: 0.5px;">Security notice:</span>

<p style="color: #888888; font-size: 12px; font-family: 'Stack Sans Headline-Regular', Helvetica; font-weight: 400; margin: 4px 0 0 0; line-height: 1.4;">

Never share your login details with anyone. Nationwide Assist will never ask for your password by email.

</p>

</td>

</tr>

</table>



</td>

</tr>

</table>

</td>

</tr>

</table>

</div>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent!");
    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.error("Send error:", err);
    res.status(500).send({ error: err.message });
  }
});
app.post("/send-reset-link", async (req, res) => {
  console.log("Received request:", req.body);
  const { recipientEmail, inviteLink } = req.body;

  const mailOptions = {
    from: "marwakhalid558@gmail.com",
    to: recipientEmail,
    subject: "Forgot / Reset Password",
    html: `<div>

<table border="0" cellpadding="0" cellspacing="0" width="100%">

<tr>

<td style="padding: 40px 0;">

<table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-collapse: collapse; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">


<tr>

<td align="center" style="padding: 48px;">


<h2 style="color: #000000; font-size: 20px; font-weight: 600; margin: 0 0 16px 0; line-height: 1.2;">

Hi

</h2>



<p style="color: #444444; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">

We received a request to reset the password for your <br />

<span style="font-weight: 600;">Nationwide Assist CRM Account</span>

</p>



<table border="0" cellpadding="0" cellspacing="0" width="100%">

<tr>

<td align="center" style="padding-bottom: 32px;">

<p style="color: #444444; font-size: 12px; font-weight: 400; margin: 0 0 12px 0; max-width: 424px;">

To reset your password, please click the link below:

</p>

<a href=${inviteLink}

style="color: #0352FD; font-size: 12px; text-decoration: none; word-break: break-all;">

${inviteLink}

</a>

</td>

</tr>

</table>



<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 394px;">

<tr>

<td align="center" style="padding-bottom: 48px;">

<p style="color: #444444; font-size: 12px; line-height: 1.6; margin: 0 0 24px 0;">

For security reasons, this link will expire in 24 hours.<br />

If the link expires, please contact your admin to request a new activation email.

</p>

<p style="color: #444444; font-size: 12px; font-style: italic; margin: 0;">

If you did not If you did not request a password reset, you can safely ignore this email <br />
 -your account will remain secure

</p>

</td>

</tr>

</table>



<table border="0" cellpadding="0" cellspacing="0" width="100%">

<tr>

<td style="height: 1px; background-color: #CCCCCC; line-height: 1px; font-size: 1px;">&nbsp;</td>

</tr>

</table>



<table border="0" cellpadding="0" cellspacing="0" width="100%">

<tr>

<td align="center" style="padding-top: 32px; padding-bottom: 48px;">

<span style="color: #000000; font-size: 12px; font-weight: 400;">Kind regards,</span><br />

<span style="color: #000000; font-size: 14px; font-weight: 600;">Nationwide Assist IT / Systems Team</span>

</td>

</tr>

</table>



<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F9FAFB; border: 1px solid #F3F4F6; border-radius: 6px;">

<tr>

<td align="left" style="padding: 16px;">

<span style="color: #888888; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Security notice:</span>

<p style="color: #888888; font-size: 12px; font-weight: 400; margin: 4px 0 0 0; line-height: 1.4;">

Never share your login details with anyone. Nationwide Assist will never ask for your password by email.

</p>

</td>

</tr>

</table>



</td>

</tr>

</table>

</td>

</tr>

</table>

</div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent!");
    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.error("Send error:", err);
    res.status(500).send({ error: err.message });
  }
});
app.post("/send-otp", async (req, res) => {
  console.log("Received request:", req.body);
  const { recipientEmail, otp } = req.body;

  const mailOptions = {
    from: "marwakhalid558@gmail.com",
    to: recipientEmail,
    subject: "Two Factor Authentication",
    html: `<div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; padding: 48px;">
                    
                    <tr>
                        <td align="center" style="padding-bottom: 16px;">
                            <h2 style="margin: 0; color: #000000; font-size: 20px; font-weight: 600; line-height: 20px;">
                                Hi
                            </h2>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding-bottom: 40px;">
                            <p style="margin: 0; color: #444444; font-size: 14px; font-weight: 400; line-height: 1.6;">
                                Your One-Time Password (OTP) for accessing<br>
                                your Nationwide Assist CRM account is
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding-bottom: 40px;">
                            <div style="color: #0352FD; font-size: 40px; font-weight: 700; letter-spacing: 8px;">
                                ${otp}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding-bottom: 48px;">
                            <div style="max-width: 394px; margin: 0 auto; color: #444444; font-size: 12px; line-height: 1.6;">
                                <p style="margin: 0;">This OTP is valid for 5 minutes and can only be used once.</p>
                                <p style="margin: 16px 0 0 0;">
                                    If you did not request this OTP, you can safely ignore this email or contact your system administrator.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="border-top: 1px solid #CCCCCC; padding-bottom: 32px;"></td>
                    </tr>

                    <tr>
                        <td align="center" style="padding-bottom: 48px;">
                            <span style="color: #000000; font-size: 12px; font-weight: 400;">Kind regards,</span><br>
                            <span style="color: #000000; font-size: 14px; font-weight: 600;">Nationwide Assist IT / Systems Team</span>
                        </td>
                    </tr>

                    <tr>
                        <td align="center">
                            <div style="background-color: #f9f9f9; padding: 16px; border-radius: 6px; width: 100%;">
                                <span style="color: #888888; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                                    Security notice:
                                </span><br>
                                <p style="margin: 4px 0 0 0; color: #888888; font-size: 12px; line-height: 1.4;">
                                    Never share your login details with anyone. Nationwide Assist will never ask for your password by email.
                                </p>
                            </div>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
    </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent!");
    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.error("Send error:", err);
    res.status(500).send({ error: err.message });
  }
});
app.get("/ping", (req, res) => res.send("pong"));
const PORT = 5000;
app.listen(5000, "0.0.0.0", () => {
  console.log("Server is listening on port 5000: :)");
});
