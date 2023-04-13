import { ComponentType } from "react";

export function retry(
  fn: () => Promise<any>,
  retriesLeft: number = 5,
): Promise<{ default: ComponentType<any> }> {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error: any) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error);
            window.location.reload();
            return;
          }
          retry(fn, retriesLeft - 1).then(resolve, reject);
        }, 1000);
      });
  });
}
