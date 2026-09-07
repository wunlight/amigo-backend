import "dotenv/config";

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function optionalEnv(name: string): string | undefined {
  return process.env[name];
}

export const env = {
  nodeEnv: optionalEnv("NODE_ENV") ?? "development",

  port: Number(optionalEnv("PORT") ?? 3000),

  database: {
    host: requiredEnv("DB_HOST"),
    port: Number(optionalEnv("DB_PORT") ?? 5432),
    name: requiredEnv("DB_NAME"),
    user: requiredEnv("DB_USER"),
    password: requiredEnv("DB_PASSWORD"),
  },
};
