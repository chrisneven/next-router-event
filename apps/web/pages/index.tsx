import Link from "next/link";
import useRouterEvent from "next-router-event";

export default function Web() {
  useRouterEvent("hashChangeComplete", () => console.log("hashChangeComplete"));
  return (
    <div>
      <h1>Web</h1>
      <Link href={{ hash: "nibba" }}>nibba</Link>
    </div>
  );
}
