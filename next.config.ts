import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

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

const withNextIntl = createNextIntlPlugin();

const sentryOptions = {
  org: "cad-models",
  project: "fe-warehouse",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  disableLogger: true,
  automaticVercelMonitors: true,
};

const withPlugins = (config: NextConfig): NextConfig =>
  withSentryConfig(withNextIntl(config), sentryOptions);

export default withPlugins(baseConfig);
