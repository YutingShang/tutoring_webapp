import "../styles/globals.css";
import type { AppProps } from "next/app";
import {SessionProvider} from "next-auth/react"

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from "@fortawesome/fontawesome-svg-core";
// Prevent fontawesome from dynamically adding its css since we are going to include it manually
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
    return (
    <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
    </SessionProvider>)
    
}

export default MyApp;
