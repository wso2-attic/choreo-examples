import { getReadingListInstance } from "./instance";

export async function deleteBooks(accessToken: string, id: string) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await getReadingListInstance().delete(`/books?id=${id}`, {
    headers: headers,
  });
  return response;
}
