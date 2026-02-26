export interface EmailNotification {
  id: string
  to: string
  subject: string
  body: string
  sentAt: string
  type: 'welcome' | 'password-reset' | 'password-changed' | 'login-alert' | 'email-verification'
}

export class EmailService {
  static async sendEmail(notification: Omit<EmailNotification, 'id' | 'sentAt'>): Promise<void> {
    const emailLog: EmailNotification = {
      ...notification,
      id: Date.now().toString(),
      sentAt: new Date().toISOString()
    }

    const existingLogs = await window.spark.kv.get<EmailNotification[]>('email-notifications') || []
    await window.spark.kv.set('email-notifications', [...existingLogs, emailLog])

    console.log('📧 Email sent:', {
      to: notification.to,
      subject: notification.subject,
      type: notification.type
    })
  }

  static async sendWelcomeEmail(email: string, name: string): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: 'Welcome to NextPhase IT',
      type: 'welcome',
      body: `Hi ${name},

Welcome to NextPhase IT! Your account has been successfully created.

You can now access your client portal to:
- View your project status and milestones
- Book or reschedule audit calls
- Access your documents and invoices
- Message our team directly
- Track your project progress in real-time

If you have any questions, feel free to reach out to us at info@nextphaseit.co.uk

Best regards,
The NextPhase IT Team`
    })
  }

  static async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: 'Password Reset Request - NextPhase IT',
      type: 'password-reset',
      body: `Hi there,

We received a request to reset your password for your NextPhase IT account.

Your password reset code is: ${resetToken}

This code will expire in 1 hour.

If you didn't request this password reset, please ignore this email or contact us at info@nextphaseit.co.uk

Best regards,
The NextPhase IT Team`
    })
  }

  static async sendPasswordChangedEmail(email: string, name: string): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: 'Password Changed Successfully - NextPhase IT',
      type: 'password-changed',
      body: `Hi ${name},

Your password has been successfully changed.

If you didn't make this change, please contact us immediately at info@nextphaseit.co.uk

Best regards,
The NextPhase IT Team`
    })
  }

  static async sendLoginAlertEmail(email: string, name: string): Promise<void> {
    const now = new Date()
    const timestamp = now.toLocaleString('en-GB', { 
      dateStyle: 'full', 
      timeStyle: 'short',
      timeZone: 'Europe/London'
    })

    await this.sendEmail({
      to: email,
      subject: 'New Login to Your Account - NextPhase IT',
      type: 'login-alert',
      body: `Hi ${name},

We noticed a new login to your NextPhase IT account.

Time: ${timestamp}

If this was you, you can safely ignore this email.

If you didn't log in, please contact us immediately at info@nextphaseit.co.uk and consider changing your password.

Best regards,
The NextPhase IT Team`
    })
  }

  static async sendVerificationEmail(email: string, name: string, verificationCode: string): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: 'Verify Your Email - NextPhase IT',
      type: 'email-verification',
      body: `Hi ${name},

Thank you for signing up for NextPhase IT!

Please verify your email address to complete your registration and access your client portal.

Your verification code is: ${verificationCode}

This code will expire in 24 hours.

If you didn't create this account, please ignore this email.

Best regards,
The NextPhase IT Team`
    })
  }

  static async getEmailHistory(email?: string): Promise<EmailNotification[]> {
    const allEmails = await window.spark.kv.get<EmailNotification[]>('email-notifications') || []
    
    if (email) {
      return allEmails.filter(e => e.to === email)
    }
    
    return allEmails
  }
}
