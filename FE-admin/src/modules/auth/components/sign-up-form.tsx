import { FormEvent, useCallback } from "react";
import { Button, ButtonLink } from "src/components";
import { routeHomeBase } from "src/constants/routes";

export function SignUpForm() {
  const handleSignup = useCallback(async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  }, []);

  return (
    <div>
      <h2>{"signup"}</h2>

      <form onSubmit={handleSignup}>
        <div>
          <div className="mb-2">
            <label className="block">
              <span className="block mt-2">{"username"}</span>
              <input type="text" />
            </label>
            <label className="block">
              <span className="block">{"password"}</span>
              <input type="password" />
            </label>
          </div>
        </div>
        <Button type="submit" variant="primary" className="mt2">
          {"sign-up"}
        </Button>
      </form>

      <div>
        <ButtonLink to={routeHomeBase} className="w-40">
          {"back-to-home"}
        </ButtonLink>
      </div>
    </div>
  );
}
