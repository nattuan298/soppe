import { render as reactRender, waitFor } from "@testing-library/react";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";

// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
type DefaultParams = Parameters<typeof reactRender>;
type RenderUI = DefaultParams[0];

export function customRender(ui: RenderUI, { initialUrl = "/" }: { initialUrl?: string } = {}) {
  return reactRender(<MemoryRouter initialEntries={[initialUrl]}>{ui}</MemoryRouter>);
}

export function delay(ms: number) {
  return waitFor(async () => new Promise((res) => setTimeout(res, ms)));
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
