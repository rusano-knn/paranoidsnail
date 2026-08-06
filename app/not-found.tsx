import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
      <Image src="/snail.svg" alt="" width={140} height={140} className="opacity-80" />
      <h1 className="font-display text-3xl font-bold">404 — the snail is lost behind the couch</h1>
      <p className="max-w-md text-muted">
        Whatever you were following, it left no trail (that&apos;s our policy). Let&apos;s get you
        back to safe ground.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-onaccent hover:opacity-90">
          Home
        </Link>
        <Link href="/tools" className="rounded-lg border border-line px-5 py-2.5 font-semibold hover:bg-raise">
          Tools
        </Link>
      </div>
    </div>
  );
}
