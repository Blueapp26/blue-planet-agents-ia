export const logger = {
  info: (msg: string) => console.log(`✅ ${msg}`),
  error: (msg: string) => console.error(`❌ ${msg}`),
  warn: (msg: string) => console.warn(`⚠️ ${msg}`),
  debug: (msg: string) => process.env.DEBUG && console.log(`🐛 ${msg}`)
};