"use client";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";

type Props = {};
function Input({}: Props) {
  const mutation = useMutation({
    mutationFn: async (url: string) => {
      z.string().url().parse(url);
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
      setInput("");
      setError("");
    },
    onError: (error: any) => {
      if (error.issues) {
        setError(error.issues[0].message);
        toast.error(error.issues[0].message);
        return;
      }

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
        <div className="flex text-lg gap-2">
          <span>Here your shorter url:</span>
          <div
            onClick={() => {
              toast.success("Copied to clipboard");
              navigator.clipboard.writeText(url);
            }}
            className="text-white hover:text-blue-500 cursor-pointer text-lg"
          >
            {url}
          </div>
        </div>
      ) : (
        error && (
          <div className="text-red-600 text-lg  font-semibold">{error} </div>
        )
      )}
      <Toaster />
    </div>
  );
}
export default Input;
