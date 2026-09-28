import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  audiences as fallbackAudiences,
  faqs as fallbackFaqs,
  process as fallbackProcess,
  rentals as fallbackRentals,
  services as fallbackServices,
  site as fallbackSite,
} from "@/data";
import { equipmentImages, galleryImages, serviceImages } from "@/assets";

type Site = typeof fallbackSite;
type Service = (typeof fallbackServices)[number] & {
  image?: string;
  gallery?: string[];
  experienceEyebrow?: string;
  experienceTitle?: string;
  experienceNote?: string;
  steps?: string[][];
};
type Rental = (typeof fallbackRentals)[number] & { images?: string[] };
type Entry = { key: string; kind: string; value?: string; imageUrl?: string };
type CmsResponse = {
  pages?: Array<{ page: string; entries?: Entry[] }>;
  site?: Partial<Site>;
  services?: Array<Record<string, unknown>>;
  rentals?: Array<Record<string, unknown>>;
  audiences?: Array<{ number: string; name: string; description: string }>;
  process?: Array<{ number: string; title: string; description: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  gallery?: Array<{ title: string; imageUrl: string }>;
};

type CmsValue = {
  site: Site;
  services: Service[];
  rentals: Rental[];
  audiences: string[][];
  process: string[][];
  faqs: string[][];
  gallery: Array<{ src: string; alt: string }>;
  text: (page: string, key: string, fallback: string) => string;
  image: (page: string, key: string, fallback: string) => string;
};

const fallbackRentalImages = Object.fromEntries(
  fallbackRentals.map((item) => [item.image, equipmentImages[item.image as keyof typeof equipmentImages]]),
);
const fallbackGallery = [...galleryImages, ...serviceImages.xray, ...serviceImages.ecg].map((src, index) => ({
  src,
  alt: `Galería Imagen del Puerto ${index + 1}`,
}));
const CmsContext = createContext<CmsValue | null>(null);

export function CmsProvider({ children }: { children: ReactNode }) {
  const [remote, setRemote] = useState<CmsResponse>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/content", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Sanity respondió ${response.status}`);
        return response.json() as Promise<{ result?: CmsResponse }>;
      })
      .then(({ result }) => result && setRemote(result))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.warn("No se pudo cargar Sanity; se usa el contenido local.", error);
        }
      });
    return () => controller.abort();
  }, []);

  const value = useMemo<CmsValue>(() => {
    const entries = new Map<string, Entry>();
    remote.pages?.forEach(({ page, entries: pageEntries }) =>
      pageEntries?.forEach((entry) => entries.set(`${page}.${entry.key}`, entry)),
    );
    const text = (page: string, key: string, fallback: string) =>
      entries.get(`${page}.${key}`)?.value || fallback;
    const image = (page: string, key: string, fallback: string) =>
      entries.get(`${page}.${key}`)?.imageUrl || fallback;
    const services = remote.services?.length
      ? remote.services.map((item) => ({
          ...(item as unknown as Service),
          steps: (item.steps as Array<{ number: string; title: string; body: string }> | undefined)?.map(({ number, title, body }) => [number, title, body]),
        }))
      : fallbackServices;
    const rentals = remote.rentals?.length
      ? remote.rentals as unknown as Rental[]
      : fallbackRentals.map((item) => ({ ...item, images: fallbackRentalImages[item.image] }));
    return {
      site: { ...fallbackSite, ...remote.site },
      services,
      rentals,
      audiences: remote.audiences?.length ? remote.audiences.map(({ number, name, description }) => [number, name, description]) : fallbackAudiences,
      process: remote.process?.length ? remote.process.map(({ number, title, description }) => [number, title, description]) : fallbackProcess,
      faqs: remote.faqs?.length ? remote.faqs.map(({ question, answer }) => [question, answer]) : fallbackFaqs,
      gallery: remote.gallery?.length ? remote.gallery.map(({ imageUrl, title }) => ({ src: imageUrl, alt: title })) : fallbackGallery,
      text,
      image,
    };
  }, [remote]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const value = useContext(CmsContext);
  if (!value) throw new Error("useCms debe usarse dentro de CmsProvider.");
  return value;
}
