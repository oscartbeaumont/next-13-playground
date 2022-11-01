import MyClientComponent from "./MyClientComponent";
import { useData } from "../utils/someLibrary";

export default function Page() {
  const data = useData(["suspenseDemo"]);

  return (
    <>
      <p>According to RCS: {data}</p>
      <MyClientComponent />
    </>
  );
}
