"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type Props = {};
function Input({}: Props) {
  const mutation = useMutation({
    mutationFn: async (url: string) => {
      console.log(url);
      const data = await axios.post("api/", { url: url });
      return data.data;
    },
    onSuccess: (data) => {
      setUrl(
        `${process.env.VERCEL ? "https://" : "http://"}${
          process.env.NEXT_PUBLIC_VERCEL_URL
        }/${data.url}`
      );
      setError("");
    },
    onError: (error) => {
      setUrl("");
      setError("Could not get a shorter url");
    },
  });
  const [url, setUrl] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="input bg-white text-black text-lg w-2/4"
        type="url"
      />
      <button
        onClick={() => {
          mutation.mutate(input);
        }}
        className="btn  text-black  text-lg w-2/4"
      >
        Get a Shorter Url
      </button>
      {url ? (
        <div
          onClick={() => {
            navigator.clipboard.writeText(url);
          }}
          className="text-white"
        >
          {url}{" "}
        </div>
      ) : (
        error && <div className="text-white">{error} </div>
      )}
    </div>
  );
}
export default Input;
