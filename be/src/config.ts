// Put all configuration value from .env file here to centralized config.
// (+) easier for future env key-value changes
import "dotenv/config";

const config = {
  APP_ENV: process.env.APP_ENV,
  APP_PORT: process.env.APP_PORT,
};
export default config;
