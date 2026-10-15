import { useCms } from "@/cms/CmsProvider";

export default function LoadingScreen() {
  const { text } = useCms();
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      role="status"
      aria-live="polite"
      aria-label={text("global", "loading.label", "Cargando página")}
    >
      <div className="relative size-[60px]" aria-hidden="true">
        <span className="absolute inset-0 animate-loader-clockwise rounded-full border-4 border-rx-blue border-b-0 border-l-transparent motion-reduce:animate-none" />
        <span className="absolute top-2.5 left-2.5 size-10 animate-loader-counterclockwise rounded-full border-4 border-lavender border-t-transparent border-r-0 motion-reduce:animate-none" />
      </div>
    </div>
  );
}
