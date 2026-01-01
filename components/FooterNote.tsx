"use client";

export default function FooterNote() {
  return (
    <footer className="pb-10">
      <div className="container-neaw">
        <div className="card-neaw px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              Hidden page
            </div>
            <div className="text-base md:text-lg font-semibold">/note</div>
            <div className="text-sm md:text-base" style={{ color: "var(--muted)" }}>
              Энэ хуудас menu дээр харагдахгүй, зөвхөн мэддэг хүн л орох хувилбар.
            </div>
          </div>

          <a className="btn-neaw text-sm md:text-base inline-flex items-center justify-center" href="/note">
            Нээх
          </a>
        </div>
      </div>
    </footer>
  );
}
