import Link from "next/link";
import { IconPhone, IconShield, IconSpark } from "./icons";

// Sayt bo'ylab (barcha sahifalarda) ko'rinadigan pastki qism —
// maxfiylik siyosati va aloqa raqami shu yerda joylashgan.
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 py-8 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 font-display font-semibold text-slate-700">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 p-1.5 text-white">
            <IconSpark className="h-full w-full" />
          </span>
          IQ Test
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
          <Link
            href="/maxfiylik"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-violet-600"
          >
            <IconShield className="h-4 w-4" />
            Maxfiylik siyosati
          </Link>
          <a
            href="tel:+998940442604"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-violet-600"
          >
            <IconPhone className="h-4 w-4" />
            +998 94 044 26 04
          </a>
        </div>
      </div>
      <p className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} IQ Test. Barcha huquqlar himoyalangan.
      </p>
    </footer>
  );
}
