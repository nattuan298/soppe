import { nextCsrf } from "next-csrf";
import { browserConfig } from "src/constants/browser-config";

const options = {
  secret: browserConfig.appId,
};

export const { csrf, csrfToken } = nextCsrf(options);
