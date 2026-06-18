import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <span className="mb-4 text-5xl opacity-30">◇</span>
      <h1 className="mb-2 text-2xl font-bold">Agent not found</h1>
      <p className="mb-6 text-muted">
        This agent doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Browse agents
      </Link>
    </div>
  );
}
