export default function SectionHeading({ label, title, description, centered = true, light = false }) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} mb-12 lg:mb-16`}>
      {label && (
        <span className={`inline-block text-xs font-body font-semibold tracking-widest uppercase mb-3 ${
          light ? "text-accent" : "text-accent"
        }`}>
          {label}
        </span>
      )}
      <h2 className={`font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4 ${
        light ? "text-primary-foreground" : "text-foreground"
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`text-base lg:text-lg leading-relaxed ${
          light ? "text-primary-foreground/80" : "text-muted-foreground"
        }`}>
          {description}
        </p>
      )}
    </div>
  );
}