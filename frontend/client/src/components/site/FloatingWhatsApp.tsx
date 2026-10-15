import { FaWhatsapp } from "react-icons/fa";
import { useCms } from "@/cms/CmsProvider";
import { whatsappHref } from "@/data";

export default function FloatingWhatsApp() {
  const { site, text } = useCms();
  return (
    <div className="whatsapp-float fixed right-5 bottom-5 z-[900] max-[680px]:right-4 max-[680px]:bottom-4">
      <a
        className="grid size-14 place-items-center rounded-full border border-white/25 bg-[#4f806c] text-white shadow-[0_12px_32px_rgba(23,21,27,.28)] transition-[transform,background-color,box-shadow] duration-500 ease-brand hover:scale-[1.06] hover:bg-[#416d5c] hover:shadow-[0_17px_40px_rgba(23,21,27,.36)] active:scale-[.96]"
        href={whatsappHref(site.whatsapp)}
        target="_blank"
        rel="noreferrer"
        aria-label={text(
          "global",
          "whatsapp.floatingLabel",
          "Contactar por WhatsApp"
        )}
      >
        <FaWhatsapp size={27} aria-hidden="true" />
      </a>
    </div>
  );
}
