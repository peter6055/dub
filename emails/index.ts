import { buildSendMail } from "mailing-core";
import nodemailer from "nodemailer";
//
// const sendMail = buildSendMail({
//   transport: nodemailer.createTransport({
//     host: process.env.POSTMARK_API_KEY,
//     port: 587,
//     auth: {
//       user: process.env.POSTMARK_API_KEY,
//       pass: process.env.POSTMARK_API_KEY,
//     },
//   }),
//   defaultFrom: "Steven from Dub <steven@internal-short.shopmy.com.au>",
//   configPath: "./mailing.config.json",
// });
//
// export default sendMail;
//
// export const sendMarketingMail = buildSendMail({
//   transport: nodemailer.createTransport({
//     host: "smtp-broadcasts.postmarkapp.com",
//     port: 587,
//     auth: {
//       user: process.env.POSTMARK_MARKETING_API_KEY,
//       pass: process.env.POSTMARK_MARKETING_API_SECRET,
//     },
//   }),
//   defaultFrom: "Steven from Dub <steven@ship.internal-short.shopmy.com.au>",
//   configPath: "./mailing.config.json",
// });


// SendGrid
const sendMail = buildSendMail({
  transport: nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: process.env.EMAIL_SMTP_USERNAME,
      pass: process.env.EMAIL_SMTP_PASSWORD
    },
  }),
  defaultFrom: "SHOPMY 员工 <emp_no_reply@shopmy.com.auu>",
  configPath: "./mailing.config.json",
});



export default sendMail;

export const sendMarketingMail = buildSendMail({
  transport: nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: process.env.EMAIL_SMTP_USERNAME,
      pass: process.env.EMAIL_SMTP_PASSWORD
    },
  }),
  defaultFrom: "SHOPMY 员工 <emp_no_reply@shopmy.com.auu>",
  configPath: "./mailing.config.json",
});