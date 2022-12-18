export interface Book {
  id: string;
  name: string;
  author: string;
  status?: Status;
}

export enum Status {
  reading = "reading",
  read = "read",
  to_read = "to_read",
}
