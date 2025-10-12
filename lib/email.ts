import { Resend } from 'resend';

// Initialize Resend with your API key (only if available)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface FormSubmissionEmailData {
  name: string;
  email: string;
  company: string;
  website?: string;
  message: string;
  whyPrismExcites: string;
  submittedAt: string;
}

export async function sendFormSubmissionEmail(data: FormSubmissionEmailData) {
  try {
    if (!resend) {
      console.warn('Email service not configured. Skipping email notification.');
      return null;
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'Prism Website <support@design-prism.com>',
      to: ['support@design-prism.com'],
      subject: `New Get Started Form Submission from ${data.name}`,
      html: generateEmailHtml(data),
      text: generateEmailText(data),
    });

    if (error) {
      console.error('Error sending email:', error);
      throw error;
    }

    return emailData;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    throw error;
  }
}

function generateEmailHtml(data: FormSubmissionEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Form Submission</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background-color: #171717;
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .content {
            padding: 40px 30px;
          }
          .field {
            margin-bottom: 25px;
          }
          .label {
            font-weight: 600;
            color: #666;
            font-size: 14px;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value {
            color: #171717;
            font-size: 16px;
            padding: 12px;
            background-color: #f9f9f9;
            border-radius: 6px;
            border: 1px solid #e5e5e5;
          }
          .message {
            white-space: pre-wrap;
            line-height: 1.8;
          }
          .footer {
            background-color: #f9f9f9;
            padding: 20px 30px;
            text-align: center;
            font-size: 14px;
            color: #666;
          }
          .cta-button {
            display: inline-block;
            background-color: #171717;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 New Get Started Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${escapeHtml(data.name)}</div>
            </div>
            
            <div class="field">
              <div class="label">Email</div>
              <div class="value">
                <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>
              </div>
            </div>
            
            <div class="field">
              <div class="label">Company</div>
              <div class="value">${escapeHtml(data.company)}</div>
            </div>
            
            ${data.website ? `
            <div class="field">
              <div class="label">Website</div>
              <div class="value">
                <a href="${escapeHtml(data.website)}" target="_blank">${escapeHtml(data.website)}</a>
              </div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Growth Challenge</div>
              <div class="value message">${escapeHtml(data.message)}</div>
            </div>
            
            <div class="field">
              <div class="label">Why Prism Excites Them</div>
              <div class="value message">${escapeHtml(data.whyPrismExcites)}</div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${escapeHtml(data.email)}" class="cta-button">
                Reply to ${escapeHtml(data.name.split(' ')[0])}
              </a>
            </div>
          </div>
          <div class="footer">
            <p>Submitted on ${new Date(data.submittedAt).toLocaleString('en-US', {
              dateStyle: 'full',
              timeStyle: 'short'
            })}</p>
            <p style="margin-top: 10px; font-size: 12px; color: #999;">
              This is an automated notification from the Prism website.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateEmailText(data: FormSubmissionEmailData): string {
  return `
New Get Started Form Submission

Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
${data.website ? `Website: ${data.website}` : ''}

Growth Challenge:
${data.message}

Why Prism Excites Them:
${data.whyPrismExcites}

Submitted on: ${new Date(data.submittedAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
  })}

---
Reply directly to this email or contact them at: ${data.email}
  `.trim();
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
} 
