import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

/** @type {import ("next").NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [path.join(__dirname, "/src/(FSD)/shareds/styles")],
    },
    i18n: {
        locales: ["ko-KR"],
        defaultLocale: "ko-KR",
    },
};

export default nextConfig;