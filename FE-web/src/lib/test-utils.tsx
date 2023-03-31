import { render as reactRender, waitFor } from "@testing-library/react";
/* @ts-ignore */
import { RouterContext } from "next/dist/next-server/lib/router-context";
import { NextRouter } from "next/router";
import * as React from "react";

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
type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> };

const mockRouter: NextRouter = {
  isReady: true,
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  push: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  reload: jest.fn(() => Promise.resolve(true)),
  prefetch: jest.fn(() => Promise.resolve()),
  back: jest.fn(() => Promise.resolve(true)),
  beforePopState: jest.fn(() => Promise.resolve(true)),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: true,
  isPreview: false,
};

export function customRender(ui: RenderUI, { wrapper, router, ...options }: RenderOptions = {}) {
  if (!wrapper) {
    // eslint-disable-next-line no-param-reassign
    wrapper = ({ children }) => (
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        {children}
      </RouterContext.Provider>
    );
  }

  return reactRender(ui, { wrapper, ...options });
}

export function delay(ms: number) {
  return waitFor(async () => new Promise((res) => setTimeout(res, ms)));
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
