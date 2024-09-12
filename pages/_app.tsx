import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="653356577668-v06100nhgtuqs8jmlltn2626sprk3q4g.apps.googleusercontent.com">
      <Component {...pageProps} />;
    </GoogleOAuthProvider>
  );
}
