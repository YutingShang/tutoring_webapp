import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <script src="https://kit.fontawesome.com/f43ce5e2b0.js" crossOrigin="anonymous"></script>
                <link
                    href="https://fonts.googleapis.com/css2?family=Eczar:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
