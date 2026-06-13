import nodemailer from 'nodemailer';
import { env } from '../config/env';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter && env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
  }
  return transporter;
}

export async function sendEmail(to: string, subject: string, html: string) {
  const t = getTransporter();
  if (!t) {
    console.warn('SMTP not configured, skipping email to:', to);
    return;
  }
  try {
    await t.sendMail({ from: `"E367 ERP" <${env.SMTP_USER}>`, to, subject, html });
    console.log(`Email sent to ${to}: ${subject}`);
  } catch (err) {
    console.error('Failed to send email:', err);
  }
}

export async function sendAttendanceAlert(studentName: string, parentEmail: string, attendance: number) {
  await sendEmail(
    parentEmail,
    `Attendance Alert: ${studentName}`,
    `<h2>Attendance Alert</h2>
     <p>Dear Parent,</p>
     <p>Your ward <strong>${studentName}</strong>'s attendance has dropped to <strong>${attendance}%</strong>.</p>
     <p>Please ensure regular attendance to maintain the minimum 75% requirement.</p>
     <br/><p>Regards,<br/>E367 College of Engineering</p>`,
  );
}

export async function sendFeeReminder(studentName: string, studentEmail: string, amount: number, dueDate: string) {
  await sendEmail(
    studentEmail,
    `Fee Payment Reminder - ₹${amount.toLocaleString()}`,
    `<h2>Fee Payment Reminder</h2>
     <p>Dear <strong>${studentName}</strong>,</p>
     <p>This is a reminder that your fee of <strong>₹${amount.toLocaleString()}</strong> is due by <strong>${dueDate}</strong>.</p>
     <p>Please make the payment at the earliest to avoid late fees.</p>
     <br/><p>Regards,<br/>Accounts Department<br/>E367 College of Engineering</p>`,
  );
}
