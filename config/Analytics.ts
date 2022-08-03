const ANALYTICS = {
  GA_TRACKING_ID: process?.env?.NEXT_PUBLIC_GA_TRACKING_ID || null,
  ENABLE_TRACKING: Boolean(process?.env?.NEXT_PUBLIC_GA_ENABLE_TRACKING) || false,
};

export default ANALYTICS;
