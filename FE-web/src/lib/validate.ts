export function validateEmail(email: string) {
  const re =
    /^([^~!#$%&^<>()[\]\\.,;:\s@"]+(\.[^~!#$%&^<>()[\]\\.,;:\s@"]+)*)@[a-z0-9](([a-z\-0-9]+\.)+[a-zA-Z]{2,})$/;

  return re.test(email.toLowerCase());
}
