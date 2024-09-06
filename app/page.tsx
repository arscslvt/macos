import Link from "next/link";

export default function Home() {
  return (
    <main className="p-6">
      this is still under development. ⚠️
      <br /> <br />
      available pages:
      <ul>
        <li>
          <Link href={"/setup"} className="text-accent">
            /setup
          </Link>
        </li>
      </ul>
      <br />
    </main>
  );
}
