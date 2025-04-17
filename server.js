const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let currentOTP = null;

// Configure your email transporter (use your real Gmail and App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',       // replace with your email
    pass: 'your_app_password'          // replace with your Gmail App Password
  }
});

// Generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST endpoint to send OTP
app.post('/send-otp', (req, res) => {
  const email = req.body.email;
  currentOTP = generateOTP();

  const mailOptions = {
    from: 'EcoRevive <youremail@gmail.com>',
    to: email,
    subject: 'Your EcoRevive OTP Code',
    text: `Your OTP is: ${currentOTP}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending OTP:', error);
      res.status(500).send({ success: false, message: 'Failed to send OTP' });
    } else {
      console.log('OTP sent:', info.response);
      res.send({ success: true, message: 'OTP sent successfully' });
    }
  });
});

// POST endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
  const { otp } = req.body;
  if (otp === currentOTP) {
    res.send({ success: true, message: 'OTP verified' });
  } else {
    res.status(401).send({ success: false, message: 'Invalid OTP' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
