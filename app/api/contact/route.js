import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, subject, message } = await req.json();

    // 1. Save to MongoDB
    const newMessage = await Message.create({ name, email, subject, message });

    // 2. Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Define Email Content
    const mailOptions = {
      from: `"Portfolio Contact" <${email}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `✉️ New Message from ${name} — ${subject}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background-color:#0b1220;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b1220;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a5f 0%,#0d1a2e 60%,#111927 100%);border-radius:16px 16px 0 0;padding:40px 40px 32px;border:1px solid #1e2d3d;border-bottom:none;text-align:center;position:relative;">
              
              <!-- Logo / Avatar -->
              <div style="display:inline-block;width:56px;height:56px;background:linear-gradient(135deg,#2563eb,#4f46e5);border-radius:14px;line-height:56px;font-size:24px;font-weight:900;color:#fff;margin-bottom:20px;letter-spacing:-1px;">
                MV
              </div>

              <!-- Badge -->
              <div style="display:inline-block;background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.3);color:#60a5fa;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:5px 14px;border-radius:100px;margin-bottom:16px;">
                ● New Portfolio Message
              </div>

              <h1 style="margin:0;font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;line-height:1.2;">
                You've got a new message!
              </h1>
              <p style="margin:10px 0 0;color:#64748b;font-size:14px;">
                Someone reached out through your portfolio contact form.
              </p>
            </td>
          </tr>

          <!-- ── SENDER INFO STRIP ── -->
          <tr>
            <td style="background:#0f1e30;border-left:1px solid #1e2d3d;border-right:1px solid #1e2d3d;padding:0 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Avatar initial -->
                  <td width="52" style="padding:20px 0;">
                    <div style="width:48px;height:48px;background:linear-gradient(135deg,#1d4ed8,#7c3aed);border-radius:50%;text-align:center;line-height:48px;font-size:18px;font-weight:900;color:#fff;">
                      ${name.charAt(0).toUpperCase()}
                    </div>
                  </td>
                  <td style="padding:20px 0 20px 14px;">
                    <p style="margin:0;font-size:15px;font-weight:700;color:#f1f5f9;">${name}</p>
                    <a href="mailto:${email}" style="color:#60a5fa;font-size:13px;text-decoration:none;">${email}</a>
                  </td>
                  <td align="right" style="padding:20px 0;">
                    <span style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.25);color:#93c5fd;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:5px 12px;border-radius:100px;">
                      Visitor
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── META PILLS ── -->
          <tr>
            <td style="background:#0f1e30;border-left:1px solid #1e2d3d;border-right:1px solid #1e2d3d;padding:0 40px 24px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:10px;">
                    <span style="display:inline-block;background:#1e293b;border:1px solid #334155;color:#94a3b8;font-size:11px;padding:5px 12px;border-radius:8px;">
                      📋 &nbsp;<strong style="color:#e2e8f0;">Subject:</strong>&nbsp; ${subject}
                    </span>
                  </td>
                  <td>
                    <span style="display:inline-block;background:#1e293b;border:1px solid #334155;color:#94a3b8;font-size:11px;padding:5px 12px;border-radius:8px;">
                      🕐 &nbsp;<strong style="color:#e2e8f0;">${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</strong>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── MESSAGE BODY ── -->
          <tr>
            <td style="background:#111927;border-left:1px solid #1e2d3d;border-right:1px solid #1e2d3d;padding:24px 40px;">
              <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#3b82f6;">
                Message
              </p>
              <div style="background:#0d1a2e;border:1px solid #1e3a5f;border-left:3px solid #2563eb;border-radius:12px;padding:24px 24px 24px 28px;">
                <p style="margin:0;color:#cbd5e1;font-size:15px;line-height:1.8;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- ── DIVIDER ── -->
          <tr>
            <td style="background:#111927;border-left:1px solid #1e2d3d;border-right:1px solid #1e2d3d;padding:0 40px;">
              <div style="height:1px;background:linear-gradient(to right,transparent,#1e3a5f,transparent);margin:8px 0;"></div>
            </td>
          </tr>

          <!-- ── CTA BUTTON ── -->
          <tr>
            <td style="background:#111927;border-left:1px solid #1e2d3d;border-right:1px solid #1e2d3d;padding:28px 40px;text-align:center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
                 style="display:inline-block;background:linear-gradient(135deg,#2563eb,#4f46e5);color:#ffffff;font-size:14px;font-weight:700;padding:14px 36px;border-radius:12px;text-decoration:none;letter-spacing:0.3px;box-shadow:0 4px 24px rgba(37,99,235,0.35);">
                ↩ Reply to ${name}
              </a>
              <p style="margin:14px 0 0;color:#475569;font-size:12px;">
                Replying will open your default email client
              </p>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background:#0d1520;border:1px solid #1e2d3d;border-top:1px solid #1e3a5f;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
              
              <!-- Social links -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td align="center">
                    <a href="https://github.com/manishverma" style="display:inline-block;margin:0 8px;color:#475569;font-size:12px;text-decoration:none;background:#1e293b;border:1px solid #334155;padding:6px 14px;border-radius:8px;">
                      GitHub
                    </a>
                    <a href="https://linkedin.com/in/manishverma" style="display:inline-block;margin:0 8px;color:#475569;font-size:12px;text-decoration:none;background:#1e293b;border:1px solid #334155;padding:6px 14px;border-radius:8px;">
                      LinkedIn
                    </a>
                    <a href="https://wa.me/919074730029" style="display:inline-block;margin:0 8px;color:#475569;font-size:12px;text-decoration:none;background:#1e293b;border:1px solid #334155;padding:6px 14px;border-radius:8px;">
                      WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#1e3a5f;font-size:11px;line-height:1.7;">
                This email was sent from the contact form on<br/>
                <strong style="color:#334155;">manishverma.dev</strong> · Noida, Uttar Pradesh, India
              </p>
              <p style="margin:12px 0 0;color:#1e2d3d;font-size:10px;letter-spacing:1px;text-transform:uppercase;">
                © ${new Date().getFullYear()} Manish Verma · Full Stack Developer
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
      `,
    };

    // 4. Send the Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Message sent and saved successfully!",
    });
  } catch (error) {
  console.error("FULL ERROR:", error);
  return NextResponse.json(
    { success: false, message: error.message },
    { status: 500 }
  );
}
}