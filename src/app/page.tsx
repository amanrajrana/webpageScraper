import Link from "next/link";

export default function Home() {
  return (
    <main className="pb-32">
      <h1 className="text-2xl text-white">Hello World</h1>
      <ul className="flex flex-col justify-center items-center w-full">
        <li>
          <Link href={"/website"}>website</Link>
        </li>
        <li>
          <Link href={"/files"}>Files</Link>
        </li>
      </ul>
    </main>
  );
}
