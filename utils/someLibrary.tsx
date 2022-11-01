// This is meant to represent a generic library that is designed to work with RCS. Think tRPC or Supabase wrapper.

import { queryClient as clientQueryClient } from "./client";
import React, {
  // @ts-expect-error: Trust me bro. // TODO: Fix types here
  createServerContext,
  PropsWithChildren,
} from "react";

export const genRanHex = (size: number) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

// const isRsc = !("createContext" in React); // TODO: Better way to do this without importing whole of React?
const isRunningOnServer = typeof window === "undefined";

export function useData(key: string[]): any {
  const serverCtx = useServerCtx();

  if (!isRunningOnServer) {
    const queryClient = clientQueryClient; // TODO: Get from `useQueryClient` hook???
    // We would wanna try and pass off to the useQuery here instead of redefining all that complicated logic.
    const [data, setData] = React.useState(queryClient.getQueryData(key));

    queryClient.getQueryCache().subscribe(() => {
      setData(queryClient.getQueryData(key));
    });

    return data;
  }

  let data = serverCtx.data[key as any];
  if (!data) {
    throw new Promise((res) => {
      setTimeout(() => {
        const data = "Hello World"; // This + setTimeout is to simulate a network request

        serverCtx.data[key as any] = data;
        console.log("SET RSC DATA");
        res(undefined);
      }, 1000);
    });
  }

  return data;
}

export interface ServerCtx {
  requestId: string;
  data: Record<any, any>;
}

const serverCtx = createServerContext("ServerContext", undefined);

export async function SomeLibraryProvider({ children }: PropsWithChildren) {
  const value: ServerCtx = {
    requestId: genRanHex(5), // This is just for debugging purposes
    data: {}, // We can't use a `new QueryClient()` or `new Map()` because this has to be serializable
  };

  return <serverCtx.Provider value={value}>{children}</serverCtx.Provider>;
}
export function useServerCtx(): ServerCtx {
  return React.useContext(serverCtx);
}
