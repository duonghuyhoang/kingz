import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center text-white">
      <p className="text-6xl font-extrabold text-color-main">404</p>
      <h1 className="text-2xl font-semibold">
        This page does not exist · Trang này không tồn tại
      </h1>
      <Link
        href="/"
        className="rounded-2xl border border-color-main px-6 py-3 text-color-main duration-100 hover:border-2"
      >
        Back home · Về trang chủ
      </Link>
    </main>
  );
}
