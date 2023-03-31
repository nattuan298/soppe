import * as React from "react";
import { render } from "src/lib/test-utils";
import { SignInForm } from "../components/sign-in/sign-in-form";

describe("SignInForm", () => {
  it("should render properly", async () => {
    const helper = render(<SignInForm />);
    const heading = await helper.findByRole("heading", {
      name: /common:signin/i,
    });
    expect(heading).toBeVisible();
  });
});
