import MovedPage, { movedMetadata } from "@/components/oplossingen/moved-page";

const TO = "/en/solutions/kennisbank-assistent/";

export const metadata = movedMetadata("Knowledge base assistant", "/en/solutions/eigen-bedrijfs-ai/", TO, "en_US");

export default function Page() {
  return <MovedPage to={TO} text="This page is now part of the knowledge base assistant" />;
}
