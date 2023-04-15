export const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:3000",
  baseUrl: process.env.REACT_APP_BASE_URL,
  apiKey: process.env.REACT_APP_ADMIN_API_KEY,
  projectId: process.env.REACT_APP_ADMIN_PROJECT_ID,
  authDomain: process.env.REACT_APP_ADMIN_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_ADMIN_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_ADMIN_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ADMIN_APP_ID,
  measurementId: process.env.REACT_APP_ADMIN_MEASUREMENT_ID,
  adminReportIssueLink: process.env.REACT_APP_ADMIN_REPORT_ISSUE_LINK,
};
