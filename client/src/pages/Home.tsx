import HomeSections from "@/components/home/HomeSections";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="relative isolate overflow-hidden">
        <HomeSections />
      </main>
      <Footer />
    </div>
  );
}
