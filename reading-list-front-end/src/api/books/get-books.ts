import { AxiosResponse } from "axios";
import { getReadingListInstance } from "./instance";
import { Book } from "./types/book";

export async function getBooks(accessToken: string) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await getReadingListInstance().get("/books", {
    headers: headers,
  });
  return response as AxiosResponse<Book[]>;
}
