export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      S3_API_URL: string;
    }
  }
}
