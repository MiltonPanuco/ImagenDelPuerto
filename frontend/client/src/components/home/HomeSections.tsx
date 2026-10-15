import HeroIntroSections from "./HeroIntroSections";
import OfferSections from "./OfferSections";
import TrustGallerySections from "./TrustGallerySections";
import {
  ProcessSection
} from "@/components/site/Shared";

export default function HomeSections() {
  return (
    <>
      <HeroIntroSections />
      <OfferSections />
      <TrustGallerySections />
      <ProcessSection />
    </>
  );
}
