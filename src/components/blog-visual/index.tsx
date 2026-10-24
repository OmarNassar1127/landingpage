import { CheckCircle2, FileSpreadsheet, MessagesSquare, PenLine, Plug, ShieldCheck } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";
import GuidePage from "./guide-page";
import { ProductExamples, ProductHero } from "./product-visuals";
import { ChatExamples, ChatHero, Handover } from "./chat-visuals";

function Productteksten({ post }: { post: BlogPost }) {
  return (
    <GuidePage
      post={post}
      eyebrow="Productteksten"
      headline="Productteksten laten schrijven, in jouw stijl"
      sub="Uit je eigen productgegevens. Jij keurt goed voordat iets online gaat."
      hero={<ProductHero />}
      examplesTitle="Drie echte webshops"
      examplesNote="Niets verzonnen: alles stond al in de productgegevens."
      examples={<ProductExamples />}
      steps={[
        { icon: FileSpreadsheet, text: "Jij stuurt een export van je producten" },
        { icon: PenLine, text: "Wij schrijven de teksten in jouw stijl" },
        { icon: CheckCircle2, text: "Jij keurt goed, dan gaan ze online" },
      ]}
      free={{ title: "De eerste tien gratis", text: "Stuur tien producten. Bevalt het niet, dan kost het je niets." }}
      solution={{ name: "Productteksten met AI", href: "/oplossingen/productteksten/" }}
    />
  );
}

function Klantvragen({ post }: { post: BlogPost }) {
  return (
    <GuidePage
      post={post}
      eyebrow="Klantvragen"
      headline="Klantvragen automatisch beantwoorden, met jouw regels"
      sub="Dag en nacht antwoord op bezorging en retour. Lastige vragen gaan naar jou."
      hero={<ChatHero />}
      examplesTitle="De vragen die elke webshop krijgt"
      examplesNote="Voorbeeld met een verzonnen webshop en klanten."
      examples={<ChatExamples />}
      extra={<Handover />}
      steps={[
        { icon: MessagesSquare, text: "Jij stuurt je vragen, regels en klantmails" },
        { icon: Plug, text: "Wij koppelen je mail, chat of WhatsApp" },
        { icon: ShieldCheck, text: "Jij keurt eerst elk antwoord goed" },
      ]}
      free={{ title: "De eerste tien gratis", text: "Stuur tien echte klantmails. Je ziet welke antwoorden de assistent zou sturen." }}
      solution={{ name: "De klantenservice-assistent", href: "/oplossingen/klantenservice-agent/" }}
    />
  );
}

/** Blog slugs that render as a visual page instead of the HTML article template. */
export const VISUAL_GUIDES: Record<string, (p: { post: BlogPost }) => JSX.Element> = {
  "productteksten-laten-schrijven": Productteksten,
  "klantvragen-automatisch-beantwoorden": Klantvragen,
};
