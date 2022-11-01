import { queryClient } from "../utils/server";
import AnotherComponent from "./AnotherComponent";

export default function Page() {
  queryClient.setQueryData(["test"], "Hello World");

  return (
    <>
      <h1>Hello World</h1>
      <AnotherComponent />
    </>
  );
}
