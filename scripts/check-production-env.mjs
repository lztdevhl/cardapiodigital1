const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required and cannot be empty.`);
  return value;
};

try {
  const databaseUrl = required("DATABASE_URL");
  const sessionSecret = required("SESSION_SECRET");

  let parsedDatabaseUrl;
  try {
    parsedDatabaseUrl = new URL(databaseUrl);
  } catch {
    throw new Error("DATABASE_URL must be a valid PostgreSQL connection URL.");
  }

  if (!["postgresql:", "postgres:"].includes(parsedDatabaseUrl.protocol)) {
    throw new Error("DATABASE_URL must use PostgreSQL; SQLite file URLs are not allowed.");
  }

  const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
  if (isProduction) {
    const hostname = parsedDatabaseUrl.hostname.toLowerCase();
    if (["localhost", "127.0.0.1", "::1"].includes(hostname)) {
      throw new Error("DATABASE_URL cannot point to localhost in production.");
    }
  }

  if (sessionSecret.length < 32) {
    throw new Error("SESSION_SECRET must contain at least 32 characters.");
  }

  required("CLOUDINARY_CLOUD_NAME");
  required("CLOUDINARY_API_KEY");
  required("CLOUDINARY_API_SECRET");

  console.log("Production environment OK");
} catch (error) {
  console.error(`Production environment error: ${error instanceof Error ? error.message : "invalid configuration"}`);
  process.exitCode = 1;
}
