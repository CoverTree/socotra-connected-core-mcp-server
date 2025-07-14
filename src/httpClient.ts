import { getAuthenticator, ProfileManager } from "@socotra/auth";
import { HttpClient } from "@socotra/api";

const profileManager = new ProfileManager();

let httpClient: HttpClient;

/**
 * Creates an HTTP client for interacting with the Socotra API.
 */
export const getHttpClient = async () => {
  if (httpClient) {
    return httpClient;
  }

  const profile = await profileManager.load(process.env.SOCOTRA_PROFILE || "");
  const authenticator = getAuthenticator(profile, false);

  httpClient = new HttpClient({
    authenticator,
    uri: process.env.SOCOTRA_API_URL,
  });

  return httpClient;
};
