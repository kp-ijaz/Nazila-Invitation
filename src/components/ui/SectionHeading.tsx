import OrnamentalDivider from "@/components/ui/OrnamentalDivider";

export default function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-8 flex items-center gap-4 sm:mb-10">
      <h2 className="font-display text-3xl font-medium tracking-[0.06em] text-ink sm:text-4xl">{title}</h2>
      <OrnamentalDivider className="!my-0" />
    </div>
  );
}
