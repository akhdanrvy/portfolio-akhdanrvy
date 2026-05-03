import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

/* ------------------------------------------------------------------ */
/* Rate limiter (in-memory, resets on cold start)                      */
/* ------------------------------------------------------------------ */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }

  if (entry.count >= 3) return true;

  entry.count += 1;
  return false;
}

/* ------------------------------------------------------------------ */
/* Zod schema                                                           */
/* ------------------------------------------------------------------ */
const contactSchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:   z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

/* ------------------------------------------------------------------ */
/* CORS headers                                                         */
/* ------------------------------------------------------------------ */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

/* ------------------------------------------------------------------ */
/* Email templates                                                      */
/* ------------------------------------------------------------------ */
function notificationEmailHtml(name: string, email: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#0a0a1a;padding:32px 40px;">
            <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;font-weight:600;">Portfolio Contact</p>
            <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-weight:700;">New Contact Form Submission</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:24px;">
                  <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#999;">From</p>
                  <p style="margin:0;font-size:16px;font-weight:600;color:#0a0a1a;">${name}</p>
                  <p style="margin:2px 0 0;font-size:14px;color:#555;">
                    <a href="mailto:${email}" style="color:#c9a84c;text-decoration:none;">${email}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style="margin:0 0 12px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#999;">Message</p>
                  <div style="background:#f8f8fb;border-left:3px solid #c9a84c;border-radius:4px;padding:20px 24px;">
                    <p style="margin:0;font-size:15px;color:#2a2a3a;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8f8fb;padding:20px 40px;border-top:1px solid #ebebef;">
            <p style="margin:0;font-size:12px;color:#aaa;">Sent from your portfolio website</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function autoReplyEmailHtml(name: string, message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#0a0a1a;padding:32px 40px;">
            <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;font-weight:600;">Akhdan Ravi Andaman</p>
            <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff;font-weight:700;">Thanks for reaching out! 👋</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 16px;font-size:15px;color:#2a2a3a;line-height:1.7;">Hi <strong>${name}</strong>,</p>
            <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.7;">
              Thank you for contacting <strong>Akhdan Ravi Andaman</strong>. I've received your message and will get back to you within <strong style="color:#c9a84c;">1–2 business days</strong>.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7;">
              In the meantime, feel free to connect with me on LinkedIn!
            </p>
            <!-- LinkedIn button -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:#0a0a1a;border-radius:8px;padding:12px 24px;">
                  <a href="https://www.linkedin.com/in/akhdan-ravi-andaman/" style="color:#c9a84c;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.5px;">
                    Connect on LinkedIn →
                  </a>
                </td>
              </tr>
            </table>
            <!-- Message copy -->
            <p style="margin:0 0 12px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#999;">Your message</p>
            <div style="background:#f8f8fb;border-left:3px solid #c9a84c;border-radius:4px;padding:20px 24px;">
              <p style="margin:0;font-size:14px;color:#555;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#0a0a1a;padding:24px 40px;">
            <p style="margin:0;font-size:13px;color:#c9a84c;font-weight:600;">Akhdan Ravi Andaman</p>
            <p style="margin:4px 0 0;font-size:12px;color:#888;">App Developer &amp; Fullstack Web Developer</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/* POST handler                                                         */
/* ------------------------------------------------------------------ */
export async function POST(req: NextRequest) {
  /* Rate limit */
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      { status: 429, headers: CORS_HEADERS },
    );
  }

  /* Parse body */
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  /* Validate */
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  const { name, email, message } = parsed.data;

  /* Send emails */
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from   = process.env.CONTACT_EMAIL_FROM ?? 'onboarding@resend.dev';
  const to     = process.env.CONTACT_EMAIL_TO   ?? 'akhdanravy@gmail.com';

  try {
    await Promise.all([
      resend.emails.send({
        from,
        to,
        subject: `[Portfolio] New message from ${name}`,
        html: notificationEmailHtml(name, email, message),
      }),
      resend.emails.send({
        from,
        to: email,
        subject: "Thanks for reaching out, I'll get back to you soon!",
        html: autoReplyEmailHtml(name, message),
      }),
    ]);
  } catch (err) {
    console.error('[contact/route] Resend error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500, headers: CORS_HEADERS },
    );
  }

  return NextResponse.json(
    { success: true, message: 'Email sent successfully' },
    { status: 200, headers: CORS_HEADERS },
  );
}
