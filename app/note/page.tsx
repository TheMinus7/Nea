import Link from "next/link";

export default function NotePage() {
  return (
    <main className="min-h-screen py-10">
      <div className="container-neaw">
        <div className="card-neaw px-6 py-6 md:px-8 md:py-8">
          <div className="text-sm" style={{ color: "var(--muted)" }}>
            /note
          </div>
          <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight">Нэг л захиа</h1>

          <p className="mt-5 text-sm md:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            Энд ганцхан урт захиа байрлана. Menu дээр харагдахгүй. Зөвхөн линкийг мэдсэн хүн орно.
          </p>

          <div className="mt-6">
            <Link className="link-neaw text-sm md:text-base" href="/">
              Буцах
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
