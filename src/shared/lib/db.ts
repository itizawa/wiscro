import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let cached: NeonQueryFunction<false, false> | null = null;

export const getSql = (): NeonQueryFunction<false, false> => {
  if (cached) return cached;
  const connectionString =
    process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL (or POSTGRES_URL) is required to connect to Neon.",
    );
  }
  cached = neon(connectionString);
  return cached;
};
