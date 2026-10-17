import { ArrowRight } from "lucide-react";

/** Strip on the service pages that points to the solution catalog. */
export default function CatalogLink() {
  return (
    <section className="border-t border-black/[0.07] bg-white py-10">
      <div className="container mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-[15px] text-zinc-600">Op zoek naar een agent voor één specifiek probleem?</p>
        <a href="/oplossingen/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          Bekijk alle oplossingen
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
