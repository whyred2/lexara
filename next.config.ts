import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*svg": {
        loaders: ["@svgr/webpack"],
        as: "*.ts",
      },
    },
  },
  transpilePackages: ["next-intl"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
