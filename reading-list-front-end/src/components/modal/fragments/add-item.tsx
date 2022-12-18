import React, { useState } from "react";
import { postBooks } from "../../../api/books/post-books";
import { Book, Status } from "../../../api/books/types/book";
import Modal from "../modal";
import { v4 as uuid } from "uuid";

export interface AddItemProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddItem(props: AddItemProps) {
  const { isOpen, setIsOpen } = props;
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");

  const handleOnSubmit = () => {
    async function setBooks() {
      const payload: Book = {
        name: name,
        author: author,
        id: uuid(),
        status: Status.to_read,
      };
      const response = await postBooks(payload);
      setIsOpen(false);
      console.log(response);
    }
    setBooks();
  };

  const innerFragment = (
    <div className="mt-2">
      <form className="bg-white rounded pt-2 pb-1">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Author
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="author"
            type="text"
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Add Book"
      children={innerFragment}
      handleSubmit={handleOnSubmit}
      isDisabled={!(name && author)}
    />
  );
}
