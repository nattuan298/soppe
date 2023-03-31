// jest-dom adds custom jest matchers for asserting on DOM nodes.
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// jest.setup.js
import { setConfig } from "next/config";

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig({ publicRuntimeConfig: {
  apiBaseUrl: "",
}});

// Mocking methods which are not implemented in JSDOM
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
