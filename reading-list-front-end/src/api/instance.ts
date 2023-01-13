import axios from "axios";

export const initInstance = (baseURL: string) => {
  return axios.create({ baseURL });
};
