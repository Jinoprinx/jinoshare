
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAILGUN_SMTP_HOST,
  port: process.env.MAILGUN_SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILGUN_SMTP_LOGIN,
    pass: process.env.MAILGUN_SMTP_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: '"Jino" <no-reply@jino.com>', // sender address
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
