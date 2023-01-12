import { createBaseURL } from "../create-base-url";
import { initInstance } from "../instance";

export const getReadingListInstance = () => {
  const config = {
    host: "6de500af-4608-46ca-944b-9f9810807bda-dev.e1-us-east-azure.choreoapis",
    env: "dev",
    service: "reading-list-service",
    version: "0.3.0",
  };
  return initInstance(createBaseURL(config));
};
