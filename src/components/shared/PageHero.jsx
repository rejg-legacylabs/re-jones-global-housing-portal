export default function PageHero({ title, description, children }) {
  return (
    <section className="bg-primary text-primary-foreground py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
            {title}
          </h1>
          {description && (
            <p className="text-lg lg:text-xl text-primary-foreground/80 leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}