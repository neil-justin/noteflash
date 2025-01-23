import { APP_PASSWORD, MY_GMAIL, SECRET } from './config';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const sendEmailVerification = async (email: string, host: string) => {
  const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: MY_GMAIL,
      pass: APP_PASSWORD,
    },
  });
  const token = jwt.sign(
    {
      email: email,
    },
    SECRET
  );
  const verificationUrl = `http://${host}/api/account-verification?token=${token}`;
  const mailOptions = {
    from: 'mallarineil9@gmail.com',
    to: email,
    subject: 'Noteflash email verification',
    html: `<p>Please click this <a href=${verificationUrl}>link</a> to verify your email</p>`,
  };
  return await emailTransporter.sendMail(mailOptions);
};

export { sendEmailVerification };
