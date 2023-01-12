import { AxiosResponse } from "axios";
import { getReadingListInstance } from "./instance";
import { Book } from "./types/book";

export async function postBooks(accessToken: string, payload?: Book) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await getReadingListInstance().post("/books", payload, {
    headers: headers,
  });
  return response;
}
