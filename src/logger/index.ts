import { env } from "../env";

function format(
  level: 'LOG' | 'INFO' | 'ERROR',
  message: string,
  meta?: unknown
): string {
  const time = new Date().toISOString();
  const base = `[${time}] [${level}] ${message}`;
  return meta ? `${base} | ${JSON.stringify(meta)}` : base;
}

const logger = {
  // only in dev / staging
  log(message: string, meta?: unknown) {
    if (env.VITE_ENV !== 'prod') {
      console.log(format('LOG', message, meta));
    }
  },

  // always
  info(message: string, meta?: unknown) {
    console.info(format('INFO', message, meta));
  },

  // always
  error(message: string, meta?: unknown) {
    console.error(format('ERROR', message, meta));
  },
};

export default logger;
