import { queryClient } from "../utils/server";

export default function Component() {
  queryClient.setQueryData(["anotherComponentQuery"], "This is the data!");

  return <h1>Another Component</h1>;
}
