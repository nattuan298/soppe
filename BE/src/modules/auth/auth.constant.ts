export enum UserSignInResponseMessage {
  Waiting = `Your account needs admin approval.`,
  Reject = `Your account has been rejected.
Contact admin with any questions.`,
  Verify = `You need to verify your email. Verification code has been sent with welcome email.`,
  Invalid_Credentials = 'Invalid credentials',
}

export enum AdminSignInResponseMessage {
  Invalid_Credentials = 'Invalid credentials',
}
