// next.config.ts
import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

// 1) Base config you control
const baseConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
        port: "",
        pathname: "/tcf-images/**",
        search: "",
      },
    ],
  },
};

// 2) Initialize wrappers
const withNextIntl = createNextIntlPlugin();

const sentryOptions = {
  org: "cad-models",
  project: "fe-warehouse",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: false,
};

// 3) Compose: wrap baseConfig with your plugins
// Order rarely matters here, but keeping Sentry outermost is common.
const withPlugins = (config: NextConfig): NextConfig =>
  withSentryConfig(withNextIntl(config), sentryOptions);

// 4) Single default export
export default withPlugins(baseConfig);
