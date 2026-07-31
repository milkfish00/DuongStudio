import ScrollToTop from "./ScrollToTop";

const SITE_IMAGE_ALT = "Uyen Dao Studio";

export type IndustrialProjectDetailData = {
  _id: string;
  title: string;
  slug: string;
  year?: number;
  skills?: string[];
  additionalInformation?: {
    title?: string;
    description?: string;
  } | null;
  coverImage?: string | null;
  boards?: (string | null)[];
};

const hasImageSrc = (value: string | null | undefined): value is string =>
  typeof value === "string" && value.trim().length > 0;

const sharpen = (url: string, width: number) => {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}w=${width}&q=100&auto=format`;
};

export default function IndustrialProjectDetail({
  project,
}: {
  project: IndustrialProjectDetailData;
}) {
  const titleLines = project.title.split(/\s+/).filter(Boolean);
  const description = project.additionalInformation?.description?.trim() || "";
  const infoTitle = project.additionalInformation?.title?.trim() || "";
  const skills = project.skills?.filter(Boolean) ?? [];
  const skillsText = skills.join(" / ");
  const metaLine = project.year?.toString() || "";

  const images = [project.coverImage, ...(project.boards ?? [])].filter(
    hasImageSrc,
  );

  return (
    <main className="min-h-screen w-full bg-cream text-red selection:bg-red selection:text-cream">
      <ScrollToTop />
      {/* Header */}
      <section className="border-b border-red/10 px-6 pt-40 pb-16 sm:px-10 lg:px-16 lg:pb-20">
        <h1 className="text-[clamp(2.75rem,8vw,7rem)] font-bold uppercase leading-[0.92] tracking-[-0.05em] text-red">
          {titleLines.map((word, index) => (
            <div key={`${word}-${index}`} className="hero-line">
              <span className="block">{word}</span>
            </div>
          ))}
        </h1>

        {metaLine ? (
          <p className="hero-meta mt-6 text-[clamp(0.8rem,1.05vw,0.95rem)] tracking-[0.01em] text-red/70">
            {metaLine}
          </p>
        ) : null}

        {skillsText ? (
          <p className="hero-meta mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-red/40">
            {skillsText}
          </p>
        ) : null}

        {description || infoTitle ? (
          <div className="hero-desc mt-12 max-w-2xl">
            {infoTitle ? (
              <p className="mb-3 text-[0.6rem] uppercase tracking-[0.22em] text-red/40">
                {infoTitle}
              </p>
            ) : null}
            {description ? (
              <p className="text-[clamp(0.85rem,1.05vw,0.95rem)] leading-[1.75] text-red/60">
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
      </section>

      {/* Vertical scroll of board images */}
      {images.length > 0 ? (
        <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div className="flex flex-col items-center gap-12 sm:gap-16">
            {images.map((src, index) => (
              <div
                key={`${src}-${index}`}
                data-reveal="up"
                data-reveal-delay={String(Math.min(index, 4) * 0.05)}
                className="w-210 max-w-full">
                <img
                  src={sharpen(src, 1680)}
                  alt={project.title || SITE_IMAGE_ALT}
                  className="block h-auto w-full rounded-sm bg-red/5"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
