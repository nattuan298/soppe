export enum UserResponseMessage {
  AlreadyExist = `Username or Email already existed.`,
  NotFound = `User is not found.`,
  InvalidPassword = `Invalid password.`,
  CanNotChangePassword = `You cannot change password.`,
  VerifyEmailFail = `Cannot verify your account. Please try to verify again.`,
  VerifyEmailSuccess = `Successfully verified.`,
  Verified = `Your account has been verified`,
}

export const defaultAvatar = `avatar/8575d67b-8efa-412f-9524-2cc2848b98d8-default-avatar.png`;
