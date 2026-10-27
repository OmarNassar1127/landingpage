import MovedPage, { movedMetadata } from "@/components/oplossingen/moved-page";

const TO = "/oplossingen/kennisbank-assistent/";

export const metadata = movedMetadata("Kennisbank-assistent", "/oplossingen/eigen-bedrijfs-ai/", TO, "nl_NL");

export default function Page() {
  return <MovedPage to={TO} text="Deze pagina staat nu bij de kennisbank-assistent" />;
}
