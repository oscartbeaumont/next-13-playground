"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useData } from "../utils/someLibrary";

export default function MyClientComponent() {
  const queryClient = useQueryClient();
  const data = useData(["suspenseDemo"]); // Same key as server component means it should exist in cache

  return (
    <>
      <p>According to client: {data}</p>
      <button
        onClick={() => {
          queryClient.setQueryData(["suspenseDemo"], "This is the new data!");
        }}
      >
        Mutate Cache
      </button>
    </>
  );
}
