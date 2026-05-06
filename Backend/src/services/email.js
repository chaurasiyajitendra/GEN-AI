require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass:process.env.APP_PASSWORD
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html,attachments=[]) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.EMAIL_USER}>`, 
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
      attachments
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendWelcomeEmail(userEmail, name) {
    const subject = "Welcome to AIInterviewPro – Your Interview Journey Starts Now";

    const text = `Hello ${name},

Welcome to AIInterviewPro!

You're now ready to take your interview preparation to the next level.

With AIInterviewPro, you can:
- Upload your resume
- Add job descriptions
- Get AI-powered interview reports
- Receive a personalized preparation plan
- Generate an optimized resume

Start here: http://localhost:5173/home

Best regards,  
AIInterviewPro Team  
Smart Prep. Real Results.
`;

    const html = `
    <div style="background-color: #0f172a; padding: 40px 20px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
        
        <table align="center" width="100%" style="max-width: 600px; background-color: #020617; border-radius: 14px; overflow: hidden; border: 1px solid #1e293b;">
            
            <!-- Header -->
            <tr>
                <td style="padding: 40px;">
                    <h1 style="margin: 0; font-size: 22px; color: #38bdf8; font-weight: 700;">
                        AIInterviewPro
                    </h1>
                    <div style="height: 2px; width: 50px; background: linear-gradient(to right, #38bdf8, #6366f1); margin-top: 10px;"></div>
                </td>
            </tr>

            <!-- Body -->
            <tr>
                <td style="padding: 0 40px 30px 40px;">
                    <h2 style="font-size: 24px; margin-top: 0; color: #f8fafc;">
                        Welcome, ${name} 👋
                    </h2>

                    <p style="font-size: 15px; color: #cbd5f5; line-height: 1.7;">
                        You're now part of a smarter way to prepare for interviews.
                        AIInterviewPro analyzes your resume and job goals to give you a complete preparation system.
                    </p>

                    <div style="background-color: #020617; border: 1px solid #1e293b; border-radius: 10px; padding: 20px; margin: 25px 0;">
                        <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #64748b;">
                            What You Can Do
                        </h3>

                        <ul style="padding: 0; list-style: none; font-size: 14px;">
                            <li style="margin-bottom: 10px;">📄 Upload your resume</li>
                            <li style="margin-bottom: 10px;">🎯 Add job description</li>
                            <li style="margin-bottom: 10px;">🤖 Get AI Interview Report (Score + Feedback)</li>
                            <li style="margin-bottom: 10px;">❓ Practice real interview Q&A</li>
                            <li>📈 Get 7–10 day personalized preparation plan</li>
                        </ul>
                    </div>

                    <div style="background-color: #020617; border: 1px solid #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                        <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #64748b;">
                            Bonus Feature
                        </h3>

                        <p style="font-size: 14px; color: #cbd5f5; margin: 0;">
                            ✨ Generate a brand-new optimized resume tailored to your target job role.
                        </p>
                    </div>

                    <!-- CTA -->
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="https://aiinterviewpro.com/dashboard"
                            style="display: inline-block; background: linear-gradient(to right, #38bdf8, #6366f1);
                            color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none;
                            font-weight: 600; font-size: 15px;">
                            Start Your Preparation
                        </a>
                    </div>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="padding: 30px 40px; border-top: 1px solid #1e293b;">
                    <p style="font-size: 13px; color: #64748b; margin: 0;">
                        Need help? 
                        <a href="https://aiinterviewpro.com/support" style="color: #38bdf8;">Support</a>
                    </p>
                </td>
            </tr>

            <tr>
                <td style="background-color: #020617; padding: 25px 40px; text-align: center;">
                    <p style="margin: 0; font-size: 12px; color: #475569;">
                        AIInterviewPro © 2026 <br>
                        Smart Prep. Real Results.
                    </p>
                </td>
            </tr>

        </table>
    </div>
    `;

    await sendEmail(userEmail, subject, text, html);
}

async function sendResumeGeneratedEmail(userEmail, name, pdfBuffer, reportId) {
  const subject = "🚀 Your Resume is Ready";

  const text = `Hey ${name},

Your AI-generated resume is ready.

Download it now and start applying.

– AIInterviewPro`;

  const html = `
  <div style="background:#020617;padding:40px;color:white;font-family:Arial;">
    <h2>Your Resume is Ready 🚀</h2>
    <p>${name}, your optimized resume is attached with this email.</p>
    <p>Use it to apply and boost your chances.</p>

    <a href="http://localhost:5173/resume"
      style="display:inline-block;margin-top:20px;padding:12px 25px;
      background:#38bdf8;color:black;border-radius:6px;text-decoration:none;">
      View Online
    </a>
  </div>
  `;

  await sendEmail(
    userEmail,
    subject,
    text,
    html,
    attachments = [
      {
        filename: `resume_${reportId}.pdf`,
        content: pdfBuffer, // 👈 your generated PDF
      },
    ],
  );
}

async function sendPaymentOTPEmail(userEmail, name, otp) {

  const subject = "🔐 Payment OTP Verification";

  const text = `Hey ${name},

        Your OTP for completing the payment is: ${otp}

        This OTP is valid for 5 minutes.

        Do not share this OTP with anyone.

– AIInterviewPro`;

  const html = `
  <div style="background:#020617;padding:40px;color:white;font-family:Arial;">
    
    <h2 style="color:#38bdf8;">Payment Verification 🔐</h2>

    <p>Hello <b>${name}</b>,</p>
    
    <p>Use the OTP below to complete your payment:</p>

    <h1 style="
      letter-spacing:6px;
      text-align:center;
      margin:30px 0;
      color:#22c55e;
    ">
      ${otp}
    </h1>

    <p style="color:#94a3b8;">
      This OTP is valid for 5 minutes. Do not share it with anyone.
    </p>

    <div style="margin-top:30px;">
      <a href="http://localhost:5173/profile"
        style="
        display:inline-block;
        padding:12px 25px;
        background:#38bdf8;
        color:black;
        border-radius:6px;
        text-decoration:none;
        font-weight:bold;
      ">
        Go to Dashboard
      </a>
    </div>

    <p style="margin-top:40px;color:#64748b;">
      – AIInterviewPro Team
    </p>

  </div>
  `;

  await sendEmail(
    userEmail,
    subject,
    text,
    html,
  );
}



module.exports = {
    sendWelcomeEmail,
    sendResumeGeneratedEmail,
    sendPaymentOTPEmail
};