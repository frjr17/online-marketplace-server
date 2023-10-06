export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      MONGO_DB_KEY: string;
      JWT_SECRET: string;
    }
  }
}
