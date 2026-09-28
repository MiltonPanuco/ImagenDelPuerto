import { Clock3, FileCheck2, HeartPulse, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { media } from "@/assets";
import { useCms } from "@/cms/CmsProvider";
import {
  AnimatedStat, CONTAINER, Eyebrow, ProgressiveImage, SECTION_DARK, SECTION_PAD,
  SectionHeader, coverStyle, heroImage,
} from "@/components/site/Shared";

export default function AboutPage() {
  const { text, image } = useCms();
  const [heroTitle, heroAccent] = text("about", "hero.title", "Cuidado que llega\nhasta tu hogar.").split("\n");
  const founderTitle = text("about", "founder.titlePrefix", "Ayudar sin pedirle al paciente un");
  const founderAccent = text("about", "founder.titleAccent", "esfuerzo más.");
  const [commitmentTitle, commitmentAccent] = text("about", "commitments.title", "Respuestas claras.\nCuidado oportuno.").split("\n");
  const commitments = [Clock3, FileCheck2, HeartPulse].map((icon, index) => {
    const [label, title, body] = text("about", `commitments.${index + 1}`, [
      "Atención 24/7|Cuando necesitas orientación|Disponibles para solicitudes urgentes y citas programadas. Ante una emergencia que ponga en riesgo la vida, llama al 911.",
      "Radiografías|Resultados en 24 horas|Entrega digital e interpretación realizada por radiólogos certificados.",
      "Electrocardiogramas|Información clara y oportuna|Interpretación cardiológica y reportes digitales para facilitar el seguimiento médico.",
    ][index]).split("|");
    return { icon, label, title, body };
  });
  const stats = [
    text("about", "stats.1", "10|+|Años de experiencia"),
    text("about", "stats.2", "500|+|Pacientes atendidos"),
    text("about", "stats.3", "24|/7|Atención y coordinación"),
  ].map((item) => item.split("|"));
  return (
    <div>
      <Header />
      <main>
        <section
          className={`${SECTION_DARK} relative flex min-h-screen items-center overflow-hidden bg-cover bg-center bg-no-repeat py-[180px_110px] after:absolute after:right-[-210px] after:top-[-200px] after:size-[640px] after:rounded-full after:border after:border-lavender/15 after:shadow-[0_0_0_100px_rgba(172,180,211,.025),0_0_0_200px_rgba(172,180,211,.02)] max-[900px]:pt-[150px] max-[680px]:py-[130px_76px]`}
          style={coverStyle(
            image("about", "hero.image", heroImage),
            "linear-gradient(90deg, rgba(23,21,27,.97), rgba(23,21,27,.72) 50%, rgba(23,21,27,.25))"
          )}
        >
          <div className={`${CONTAINER} relative z-[1]`}>
            <Eyebrow light>{text("about", "hero.eyebrow", "Nuestra historia")}</Eyebrow>
            <h1 className="my-[25px_26px] font-display text-[clamp(58px,8vw,110px)] font-medium leading-[.88] tracking-[-.09em] max-[680px]:text-[clamp(58px,15vw,82px)] [&_i]:not-italic [&_i]:text-lavender">
              {heroTitle}
              <br />
              <i>{heroAccent}</i>
            </h1>
            <p className="mt-0 mb-8 max-w-[500px] leading-[1.75] text-white/65">
              {text("about", "hero.body", "Diagnóstico y equipo médico a domicilio en Puerto Vallarta y Bahía de Banderas.")}
            </p>
            <div className="flex items-center gap-2 text-xs text-lavender">
              <MapPin size={17} /> {text("about", "hero.location", "Puerto Vallarta · Bahía de Banderas")}
            </div>
          </div>
        </section>

        <section className={SECTION_PAD}>
          <div className={`${CONTAINER} grid grid-cols-[.86fr_1.14fr] items-center gap-[100px] max-[900px]:grid-cols-1 max-[900px]:gap-12`}>
            <figure className="relative m-0 min-h-[680px] overflow-hidden bg-mist max-[680px]:min-h-[520px]">
              <ProgressiveImage
                className="absolute inset-0 size-full object-cover object-center"
                src={image("about", "founder.image", media.founder)}
                alt={text("about", "founder.imageAlt", "Lic. Fidel Correa Rodríguez, fundador de Imagen del Puerto")}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(23,21,27,.92))] px-8 pt-28 pb-8 text-white">
                <strong className="block font-display text-2xl font-medium tracking-[-.04em]">
                  {text("about", "founder.name", "Lic. Fidel Correa Rodríguez")}
                </strong>
                <span className="mt-1 block text-[10px] uppercase tracking-[.15em] text-lavender">
                  {text("about", "founder.role", "Licenciado en Radiología")}
                </span>
              </figcaption>
            </figure>
            <div>
              <Eyebrow>{text("about", "founder.eyebrow", "Una historia de cuidado y compromiso")}</Eyebrow>
              <h2 className="my-[24px_30px] font-display text-[clamp(36px,4.5vw,60px)] font-medium leading-[.98] tracking-[-.065em] text-charcoal [&_i]:not-italic [&_i]:text-rx-blue">
                {founderTitle} <i>{founderAccent}</i>
              </h2>
              <div className="max-w-[590px] space-y-5 leading-[1.8] text-steel">
                <p>
                  {text("about", "founder.paragraph1", "Todo comenzó con un deseo simple: ayudar a quienes enfrentan la dificultad de trasladarse a un centro médico. Adultos mayores, familias y pacientes que necesitan atención confiable inspiraron una forma más cercana de cuidar.")}
                </p>
                <p>
                  {text("about", "founder.paragraph2", "Así nació Imagen del Puerto: llevamos rayos X, electrocardiogramas, poligrafía respiratoria y equipo médico hasta el hogar para que recibir atención de calidad sea un alivio, no un sacrificio.")}
                </p>
              </div>
              <blockquote className="my-9 border-l-2 border-lavender pl-6 font-display text-2xl font-medium tracking-[-.04em] text-charcoal">
                {text("about", "founder.quote", "“Tu salud y comodidad, nuestra prioridad.”")}
              </blockquote>
            </div>
          </div>
        </section>

        <section className="bg-mist py-16">
          <div className={`${CONTAINER} grid grid-cols-3 gap-5 max-[680px]:grid-cols-1`}>
            {stats.map(([value, suffix, label]) => (
              <article className="border-t-2 border-rx-blue bg-white px-8 py-9" key={label}>
                <AnimatedStat
                  value={Number(value)}
                  suffix={String(suffix)}
                  label={label}
                  className="border-l-0 pb-0 pl-0 max-[680px]:pl-0 [&_strong]:text-[52px]"
                />
              </article>
            ))}
          </div>
        </section>


        <section className={`${SECTION_PAD} bg-[#f5f5f8]`}>
          <div className={CONTAINER}>
            <SectionHeader
              eyebrow={text("about", "commitments.eyebrow", "Nuestro compromiso")}
              title={<>{commitmentTitle}<br /><i>{commitmentAccent}</i></>}
              body={text("about", "commitments.body", "Coordinamos cada servicio con cercanía y mantenemos informado al paciente en cada paso.")}
            />
            <div className="mt-16 grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
              {commitments.map(({ icon: Icon, label, title, body }) => (
                <article className="border border-[rgb(66_62_73_/_12%)] bg-white p-8" key={label}>
                  <Icon className="mb-7 text-rx-blue" size={29} strokeWidth={1.5} />
                  <span className="text-[9px] font-semibold uppercase tracking-[.15em] text-rx-blue">{label}</span>
                  <h2 className="my-4 font-display text-[28px] font-medium leading-[1.05] tracking-[-.055em]">{title}</h2>
                  <p className="m-0 text-sm leading-[1.75] text-steel">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
