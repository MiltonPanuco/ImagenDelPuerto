import React from "react";
import LegalDocument from "@/components/LegalDocument";
import privacyMarkdown from "@/content/privacy.md?raw";
import termsMarkdown from "@/content/terms.md?raw";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCms } from "@/cms/CmsProvider";
import {
  CONTAINER, SECTION_PAD, Eyebrow,
} from "@/components/site/Shared";
export default function LegalPage({ title }: { title: string }) {
  const { text } = useCms();
  const privacy = title === "Aviso de privacidad";
  const pageTitle = text("legal", privacy ? "privacy.title" : "terms.title", title);
  return (
    <div>
      <Header />
      <main
        className={`${SECTION_PAD} min-h-[70vh] bg-mist pt-40 max-[680px]:pt-[120px]`}
      >
        <div className={`${CONTAINER} max-w-[800px]`}>
          <Eyebrow>{pageTitle}</Eyebrow>
          <h1 className="my-[26px_35px] font-display text-[clamp(52px,7vw,92px)] font-medium leading-[.9] tracking-[-.08em] max-[680px]:text-[clamp(51px,14vw,73px)]">
            {pageTitle}
          </h1>
          <p className="text-[11px] font-semibold uppercase tracking-[.12em] text-rx-blue">
            {text("legal", "updated", "Última actualización: 25 de septiembre de 2026")}
          </p>
          <p className="mt-[35px] max-w-[570px] leading-[1.8] text-steel">
            {privacy
              ? text("legal", "privacy.intro", "Este aviso explica de forma clara cómo utilizamos la información que compartes al ponerte en contacto con nosotros.")
              : text("legal", "terms.intro", "Estas condiciones establecen el uso responsable del sitio y el alcance de la información publicada por Imagen del Puerto.")}
          </p>
          <LegalDocument markdown={text("legal", privacy ? "privacy.markdown" : "terms.markdown", privacy ? privacyMarkdown : termsMarkdown)} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
