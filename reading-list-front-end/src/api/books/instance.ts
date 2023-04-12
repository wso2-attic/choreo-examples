import { initInstance } from "../instance";

export const getReadingListInstance = () => {
  return initInstance(import.meta.env.VITE_CHOREO_BACKEND_URL);
};
