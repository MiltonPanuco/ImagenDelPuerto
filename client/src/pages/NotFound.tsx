import { Home } from "lucide-react";
import { Link } from "wouter";
import { media } from "@/assets";
import { useCms } from "@/cms/CmsProvider";

export default function NotFound() {
  const { text, image } = useCms();
  return (
    <main className="flex h-dvh w-full items-center justify-center overflow-hidden bg-white">
      <div className="relative inline-block">
        <h1 className="sr-only">{text("notFound", "title", "Página no encontrada")}</h1>
        <img
          className="block h-auto max-h-[95dvh] w-auto max-w-[95vw]"
          src={image("notFound", "image", media.notFound)}
          alt={text("notFound", "imageAlt", "Página 404, no pudimos encontrar lo que buscabas")}
        />
        <Link
          className="absolute top-[64%] left-[71%] inline-flex min-h-10 -translate-x-1/2 items-center justify-center gap-1.5 rounded-full bg-charcoal px-3.5 text-[10px] font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-violet focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rx-blue sm:min-h-11 sm:gap-2 sm:px-5 sm:text-xs"
          href="/"
        >
          <Home className="size-3.5 sm:size-4" aria-hidden="true" />
          {text("notFound", "button", "Volver al inicio")}
        </Link>
      </div>
    </main>
  );
}
