export default {
  DSN: process?.env?.NEXT_PUBLIC_SENTRY_DSN,
  SEND_ERRORS: Boolean(process?.env?.NEXT_PUBLIC_SENTRY_SEND_ERRORS) || false,
};
