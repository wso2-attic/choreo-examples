import { createBaseURL } from "../create-base-url";
import { initInstance } from "../instance";

export const getReadingListInstance = () => {
  const config = {
    host: import.meta.env.VITE_RESOURCE_HOST,
    service: import.meta.env.VITE_RESOURCE_SERVICE_NAME,
    endpointContext: import.meta.env.VITE_RESOURCE_ENDPOINT_CONTEXT,
    version: import.meta.env.VITE_RESOURCE_VERSION,
    handle: import.meta.env.VITE_RESOURCE_HANDLE,
  };
  return initInstance(createBaseURL(config));
};
