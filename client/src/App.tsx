import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import FloatingWhatsApp from "./components/site/FloatingWhatsApp";
import LoadingScreen from "./components/site/LoadingScreen";
import { useCms } from "./cms/CmsProvider";
import { DEFAULT_SOCIAL_IMAGE, pageMetadata, SITE_URL } from "../../shared/seo";

const Home = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const DetailPage = lazy(() => import("./pages/ServiceDetail"));
const GalleryPage = lazy(() => import("./pages/Gallery"));
const LegalPage = lazy(() => import("./pages/Legal"));
const RentalPage = lazy(() => import("./pages/Rental"));
const ServicesPage = lazy(() => import("./pages/Services"));
const NotFound = lazy(() => import("./pages/NotFound"));

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = url;
}

function PageEffects() {
  const [location] = useLocation();
  const { site, text } = useCms();
  useEffect(() => {
    const routePath = location.length > 1 ? location.replace(/\/+$/, "") : "/";
    const knownPage = pageMetadata[routePath];
    const seoKey: Record<string, string> = {
      "/": "home", "/servicios": "services", "/servicios/rayos-x": "xray",
      "/servicios/electrocardiogramas": "ecg", "/servicios/poligrafia-respiratoria": "respiratory",
      "/renta": "rental", "/nosotros": "about", "/galeria": "gallery", "/contacto": "contact",
      "/aviso-de-privacidad": "privacy", "/terminos": "terms",
    };
    const fallbackPage = knownPage ?? {
      title: "Imagen del Puerto | Página no encontrada",
      description: "La página solicitada no existe o cambió de ubicación.",
    };
    const seoContent = text("seo", seoKey[routePath] || "notFound", fallbackPage.description);
    const description = seoContent.includes("|")
      ? seoContent.slice(seoContent.lastIndexOf("|") + 1).trim()
      : seoContent;
    const page = { ...fallbackPage, description: description || fallbackPage.description };
    const canonical = `${SITE_URL}${knownPage ? routePath : "/404"}`;
    const brandName = text("global", "brand.name", "Imagen del Puerto");
    const areaServed = text("global", "brand.areaServed", "Puerto Vallarta\nBahía de Banderas").split("\n").filter(Boolean);

    document.title = page.title;
    setMeta("name", "description", page.description);
    setMeta("name", "robots", knownPage ? "index,follow,max-image-preview:large" : "noindex,nofollow");
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", DEFAULT_SOCIAL_IMAGE);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    setMeta("name", "twitter:image", DEFAULT_SOCIAL_IMAGE);
    setCanonical(canonical);

    const organizationId = `${SITE_URL}/#organization`;
    const graph: Record<string, unknown>[] = [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: brandName,
        url: SITE_URL,
        logo: `${SITE_URL}/storage/icons/apple-touch-icon.png`,
        image: DEFAULT_SOCIAL_IMAGE,
        telephone: site.phone,
        email: site.email,
        areaServed,
        sameAs: [site.facebook, site.instagram],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: brandName,
        publisher: { "@id": organizationId },
        inLanguage: "es-MX",
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": organizationId },
        inLanguage: "es-MX",
      },
    ];
    if (page.service) {
      graph.push({
        "@type": "Service",
        name: page.service,
        url: canonical,
        description: page.description,
        provider: { "@id": organizationId },
        areaServed,
      });
    }
    let structuredData = document.getElementById("site-structured-data") as HTMLScriptElement | null;
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "site-structured-data";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });

    let observer: IntersectionObserver | undefined;
    const frame = window.requestAnimationFrame(() => {
      const elements = document.querySelectorAll<HTMLElement>(
        "main section > div, main article, main figure, main form, main li, footer > div"
      );
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("reveal-visible");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: 0.12 }
      );
      elements.forEach((element, index) => {
        element.classList.add("reveal-ready");
        element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
        observer?.observe(element);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [location, site, text]);
  return null;
}

function Router() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/nosotros" component={AboutPage} />
        <Route path="/servicios" component={ServicesPage} />
        <Route path="/renta" component={RentalPage} />
        <Route path="/contacto" component={ContactPage} />
        <Route path="/servicios/rayos-x">
          <DetailPage serviceSlug="rayos-x" />
        </Route>
        <Route path="/servicios/electrocardiogramas">
          <DetailPage serviceSlug="electrocardiogramas" />
        </Route>
        <Route path="/servicios/poligrafia-respiratoria">
          <DetailPage serviceSlug="poligrafia-respiratoria" />
        </Route>
        <Route path="/galeria" component={GalleryPage} />
        <Route path="/aviso-de-privacidad">
          <LegalPage title="Aviso de privacidad" />
        </Route>
        <Route path="/terminos">
          <LegalPage title="Términos y condiciones" />
        </Route>
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function RoutedApp() {
  const [location] = useLocation();
  const routePath = location.length > 1 ? location.replace(/\/+$/, "") : "/";
  const showFloatingWhatsApp = Boolean(pageMetadata[routePath]) &&
    routePath !== "/terminos" &&
    routePath !== "/aviso-de-privacidad";

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <PageEffects />
      <Router />
      {showFloatingWhatsApp && <FloatingWhatsApp />}
    </>
  );
}

export default function App() {
  return <ErrorBoundary><RoutedApp /></ErrorBoundary>;
}
