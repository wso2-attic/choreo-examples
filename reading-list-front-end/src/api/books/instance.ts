import { createBaseURL } from "../create-base-url";
import { initInstance } from "../instance";

export const getReadingListInstance = () => {
  const config = {
    host: import.meta.env.VITE,
    env: import.meta.env.VITE_RESOURCE_ENV,
    service: import.meta.env.VITE_RESOURCE_SERVICE_NAME,
    version: import.meta.env.VITE_RESOURCE_VERSION,
    handle: import.meta.env.VITE_RESOURCE_HANDLE,
  };
  return initInstance(createBaseURL(config));
};
