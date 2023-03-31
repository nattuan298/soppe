import axios from "axios";

/**
 * Axios instance for node server
 */
export const apiClientServer = axios.create();
apiClientServer.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
