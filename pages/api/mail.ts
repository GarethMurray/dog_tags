import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, text, email } = JSON.parse(req.body);

    const html = `Hi there <br>
    My name is ${name}
    My email address is ${email}
    <br>
    ${text}`;

    await sendEmail({
      from: email,
      to: process.env.SMTP_USER!,
      subject: "URGENT: DOG ALERT",
      html,
    });
    await sendEmail({
      from: email,
      to: process.env.EMAIL2!,
      subject: "URGENT: DOG ALERT",
      html,
    });

    return res.json({ message: "Success!" });
  } else {
    return res.json({ message: "Oh no this failed!" });
  }
}

import nodemailer from "nodemailer";

type EmailPayload = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  console.log("transporter", transporter);
  try {
    await transporter.sendMail(data);
  } catch (e: unknown) {
    console.log("error sending mail", e);
    console.log("data:", data);
  }
};
