// app/api/sendEmail/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { to_email, from_name, message_html, file_name } = await request.json();

  // Nodemailer transporter configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to_email,
    subject: `Message from ${from_name}`,
    html: message_html,
    attachments: [
      {
        filename: file_name,
        path: `${process.cwd()}/public/FinalResume.pdf`, // Adjust the path if needed
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to send email: ${err}` },
      { status: 500 }
    );
  }
}
