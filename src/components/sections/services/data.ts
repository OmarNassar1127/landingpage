import type { LucideIcon } from "lucide-react";
import {
  Headphones, TrendingUp, Settings, BookOpen, Eye, Scale, Radar, Tags, UserMinus, Globe, Bot, UserPlus, Phone,
  MessageSquare, Target, Send, FileText, PenTool, Package, Receipt, Users, ClipboardList, Database, Shield,
  FileBarChart, Microscope, ScanLine, Wallet, Fingerprint, CircleDollarSign,
} from "lucide-react";

export interface Agent {
  name: string;
  icon: LucideIcon;
  headline: string;
  description: string;
  integrations: string[];
  results: { value: string; label: string }[];
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  agentCount: string;
  icon: LucideIcon;
  gradient: string;
  agents: Agent[];
}

/** Category colour. Used only for small dots and thin bars. */
export const CATEGORY_COLOR: Record<string, string> = {
  klantenservice: "#3b82f6",
  sales: "#10b981",
  operations: "#f59e0b",
  kennisbank: "#8b5cf6",
  "finance-legal": "#06b6d4",
  "data-insights": "#f43f5e",
};

export const getCategories = (language: string): Category[] => {
  const isNL = language === "nl";
  const cats = [
    {
      id: "data-insights",
      title: isNL ? "Data & Inzichten" : "Data & Insights",
      subtitle: isNL ? "Zie wat je concurrenten niet zien" : "See what your competitors can't",
      agentCount: "4 agents",
      icon: Eye,
      gradient: "from-rose-500 to-pink-400",
      agents: [
        {
          name: isNL ? "Concurrentie Monitor" : "Competitor Monitor",
          icon: Radar,
          headline: isNL ? "Weet wat je concurrent doet voordat zij het weten" : "Know what your competitor does before they do",
          description: isNL
            ? "Volgt dagelijks prijzen, productlanceringen, vacatures en reviews van je concurrenten. Stuurt een alert als er iets verandert dat impact heeft op jouw markt."
            : "Tracks daily prices, product launches, job postings and reviews from your competitors. Sends an alert when something changes that impacts your market.",
          integrations: ["Web scraping", "Google Alerts", "Slack", "Notion"],
          results: isNL
            ? [{ value: "24/7", label: "Monitoring" }, { value: "15+", label: "Bronnen" }, { value: "<1u", label: "Alert-tijd" }]
            : [{ value: "24/7", label: "Monitoring" }, { value: "15+", label: "Sources" }, { value: "<1h", label: "Alert time" }],
        },
        {
          name: isNL ? "Prijs Optimalisatie Agent" : "Price Optimization Agent",
          icon: Tags,
          headline: isNL ? "De perfecte prijs, berekend door AI" : "The perfect price, calculated by AI",
          description: isNL
            ? "Analyseert marktdata, seizoenspatronen en klantgedrag om je prijzen dynamisch aan te passen. Maximaliseert marge zonder klanten te verliezen."
            : "Analyzes market data, seasonal patterns and customer behavior to dynamically adjust your prices. Maximizes margin without losing customers.",
          integrations: ["Shopify", "WooCommerce", "Google Analytics", "Stripe"],
          results: isNL
            ? [{ value: "+18%", label: "Marge" }, { value: "Real-time", label: "Aanpassing" }, { value: "AI", label: "Voorspelling" }]
            : [{ value: "+18%", label: "Margin" }, { value: "Real-time", label: "Adjustment" }, { value: "AI", label: "Prediction" }],
        },
        {
          name: isNL ? "Churn Voorspeller" : "Churn Predictor",
          icon: UserMinus,
          headline: isNL ? "Red klanten voordat ze vertrekken" : "Save customers before they leave",
          description: isNL
            ? "Detecteert signalen van afhakende klanten: minder logins, onbeantwoorde mails, dalend gebruik. Triggert automatisch een persoonlijk retentie-aanbod."
            : "Detects signals of churning customers: fewer logins, unanswered emails, declining usage. Automatically triggers a personalized retention offer.",
          integrations: ["HubSpot", "Mixpanel", "Intercom", "Stripe"],
          results: isNL
            ? [{ value: "-35%", label: "Churn" }, { value: "14d", label: "Voorspelling" }, { value: "Auto", label: "Retentie" }]
            : [{ value: "-35%", label: "Churn" }, { value: "14d", label: "Prediction" }, { value: "Auto", label: "Retention" }],
        },
        {
          name: isNL ? "Social Listening Agent" : "Social Listening Agent",
          icon: Globe,
          headline: isNL ? "Weet wat mensen overal over je merk zeggen" : "Know what people say about your brand, everywhere",
          description: isNL
            ? "Monitort vermeldingen van je merk op Reddit, LinkedIn, X, reviews en forums. Classificeert sentiment en stuurt een dagelijkse digest met de highlights."
            : "Monitors mentions of your brand on Reddit, LinkedIn, X, reviews and forums. Classifies sentiment and sends a daily digest with highlights.",
          integrations: ["Reddit API", "LinkedIn", "X API", "Google Alerts"],
          results: isNL
            ? [{ value: "500+", label: "Bronnen" }, { value: "Real-time", label: "Alerts" }, { value: "AI", label: "Sentiment" }]
            : [{ value: "500+", label: "Sources" }, { value: "Real-time", label: "Alerts" }, { value: "AI", label: "Sentiment" }],
        },
      ],
    },
    {
      id: "klantenservice",
      title: isNL ? "Klantenservice" : "Customer Service",
      subtitle: isNL
        ? "Je klanten helpen terwijl jij slaapt"
        : "Help your customers while you sleep",
      agentCount: "4 agents",
      icon: Headphones,
      gradient: "from-blue-500 to-cyan-400",
      agents: [
        {
          name: isNL ? "Klantenservice Agent" : "Customer Service Agent",
          icon: Bot,
          headline: isNL ? "Beantwoordt 80% van tickets zelfstandig" : "Handles 80% of tickets independently",
          description: isNL
            ? "Analyseert binnenkomende tickets, beantwoordt veelgestelde vragen direct en escaleert complexe cases naar het juiste teamlid."
            : "Analyzes incoming tickets, answers FAQs instantly and escalates complex cases to the right team member.",
          integrations: ["Zendesk", "Intercom", "WhatsApp", "Slack"],
          results: isNL
            ? [{ value: "80%", label: "Minder handmatig" }, { value: "24/7", label: "Beschikbaar" }, { value: "<30s", label: "Reactietijd" }]
            : [{ value: "80%", label: "Less manual" }, { value: "24/7", label: "Available" }, { value: "<30s", label: "Response" }],
        },
        {
          name: isNL ? "Onboarding Agent" : "Onboarding Agent",
          icon: UserPlus,
          headline: isNL ? "Nieuwe klanten productief in uren" : "New customers productive in hours",
          description: isNL
            ? "Stuurt gepersonaliseerde welkomstflows, beantwoordt setup-vragen en zorgt dat nieuwe klanten snel productief zijn."
            : "Sends personalized welcome flows, answers setup questions and ensures new customers become productive quickly.",
          integrations: ["HubSpot", "Intercom", "Calendly", "Notion"],
          results: isNL
            ? [{ value: "50%", label: "Snellere setup" }, { value: "-40%", label: "Churn" }, { value: "100%", label: "Consistent" }]
            : [{ value: "50%", label: "Faster setup" }, { value: "-40%", label: "Churn" }, { value: "100%", label: "Consistent" }],
        },
        {
          name: "WhatsApp/Chat Agent",
          icon: MessageSquare,
          headline: isNL ? "Elk kanaal, elke taal, altijd beschikbaar" : "Every channel, every language, always on",
          description: isNL
            ? "Beantwoordt klantvragen via WhatsApp, webchat en social media. Begrijpt context en plant afspraken."
            : "Answers questions via WhatsApp, webchat and social media. Understands context and books appointments.",
          integrations: ["WhatsApp API", "Twilio", "Zendesk"],
          results: isNL
            ? [{ value: "24/7", label: "Alle kanalen" }, { value: "5+", label: "Talen" }, { value: "<10s", label: "Reactietijd" }]
            : [{ value: "24/7", label: "All channels" }, { value: "5+", label: "Languages" }, { value: "<10s", label: "Response" }],
        },
        {
          name: isNL ? "Telefoon Agent" : "Call Agent",
          icon: Phone,
          headline: isNL ? "Neemt op binnen 2 beltonen, 24/7" : "Answers within 2 rings, 24/7",
          description: isNL
            ? "Een AI-agent die inkomende telefoongesprekken afhandelt in natuurlijk Nederlands. Beantwoordt veelgestelde vragen, plant afspraken in je agenda en escaleert naar een medewerker wanneer nodig."
            : "An AI agent that handles incoming phone calls in natural language. Answers FAQs, schedules appointments in your calendar and escalates to a human when needed.",
          integrations: ["Twilio Voice", "Google Calendar", "Slack", "CRM"],
          results: isNL
            ? [{ value: "24/7", label: "Bereikbaar" }, { value: "<2s", label: "Opneemtijd" }, { value: "AVG", label: "Data in de EU" }]
            : [{ value: "24/7", label: "Available" }, { value: "<2s", label: "Pickup time" }, { value: "GDPR", label: "Data in the EU" }],
        },
      ],
    },
    {
      id: "sales",
      title: "Sales & Marketing",
      subtitle: isNL ? "Meer leads, minder handwerk" : "More leads, less manual work",
      agentCount: "4 agents",
      icon: TrendingUp,
      gradient: "from-emerald-500 to-green-400",
      agents: [
        {
          name: isNL ? "Lead Kwalificatie Agent" : "Lead Qualifying Agent",
          icon: Target,
          headline: isNL ? "Warme leads direct bij sales" : "Warm leads to sales instantly",
          description: isNL
            ? "Analyseert inkomende leads, kwalificeert automatisch en plant meetings met warme leads. Koude leads krijgen een nurture-flow."
            : "Analyzes incoming leads, auto-qualifies and schedules meetings with warm leads. Cold leads get a nurture flow.",
          integrations: ["HubSpot", "Salesforce", "LinkedIn", "Calendly"],
          results: isNL
            ? [{ value: "+30%", label: "Conversie" }, { value: "0", label: "Leads gemist" }, { value: "Auto", label: "Follow-up" }]
            : [{ value: "+30%", label: "Conversion" }, { value: "0", label: "Leads missed" }, { value: "Auto", label: "Follow-up" }],
        },
        {
          name: isNL ? "Outbound Agent" : "Outbound Agent",
          icon: Send,
          headline: isNL ? "150+ gepersonaliseerde contacten per week" : "150+ personalized contacts per week",
          description: isNL
            ? "Vindt ideale prospects, schrijft gepersonaliseerde berichten en verstuurt via e-mail of LinkedIn."
            : "Finds ideal prospects, writes personalized messages and sends via email or LinkedIn.",
          integrations: ["Apollo.io", "LinkedIn API", "Gmail", "HubSpot"],
          results: isNL
            ? [{ value: "150+", label: "Contacten/wk" }, { value: "42%", label: "Open rate" }, { value: "Auto", label: "A/B testing" }]
            : [{ value: "150+", label: "Contacts/wk" }, { value: "42%", label: "Open rate" }, { value: "Auto", label: "A/B testing" }],
        },
        {
          name: isNL ? "Offerte Agent" : "Quote Agent",
          icon: FileText,
          headline: isNL ? "Van call naar offerte in minuten" : "From call to quote in minutes",
          description: isNL
            ? "Luistert mee met sales calls, haalt wensen eruit en genereert een professionele offerte."
            : "Listens in on sales calls, extracts requirements and generates a professional quote.",
          integrations: ["Google Docs", "HubSpot", "PandaDoc"],
          results: isNL
            ? [{ value: "80%", label: "Sneller" }, { value: "-90%", label: "Fouten" }, { value: "100%", label: "Consistent" }]
            : [{ value: "80%", label: "Faster" }, { value: "-90%", label: "Errors" }, { value: "100%", label: "Consistent" }],
        },
        {
          name: isNL ? "Content Agent" : "Content Agent",
          icon: PenTool,
          headline: isNL ? "Social posts, blogs en e-mails op autopilot" : "Social posts, blogs and emails on autopilot",
          description: isNL
            ? "Schrijft content in jouw tone-of-voice op basis van je merk en doelgroep. Plant posts, A/B-test onderwerpregels en rapporteert wat werkt."
            : "Writes content in your tone of voice based on your brand and audience. Schedules posts, A/B-tests subject lines and reports what works.",
          integrations: ["LinkedIn API", "Mailchimp", "Buffer", "Google Docs"],
          results: isNL
            ? [{ value: "25+", label: "Posts/week" }, { value: "+180%", label: "Engagement" }, { value: "Auto", label: "Planning" }]
            : [{ value: "25+", label: "Posts/week" }, { value: "+180%", label: "Engagement" }, { value: "Auto", label: "Scheduling" }],
        },
      ],
    },
    {
      id: "operations",
      title: "Operations",
      subtitle: isNL ? "Processen die zichzelf draaien" : "Processes that run themselves",
      agentCount: "4 agents",
      icon: Settings,
      gradient: "from-amber-500 to-orange-400",
      agents: [
        {
          name: isNL ? "Order Processing Agent" : "Order Processing Agent",
          icon: Package,
          headline: isNL ? "Bestelling tot verzending, zero handmatig" : "Order to shipment, zero manual",
          description: isNL
            ? "Verwerkt orders automatisch, checkt voorraad in real-time en stuurt tracking-info naar klanten."
            : "Processes orders automatically, checks stock in real-time and sends tracking info to customers.",
          integrations: ["Shopify", "Exact Online", "Picqer", "Sendcloud"],
          results: isNL
            ? [{ value: "0", label: "Handmatig" }, { value: "Real-time", label: "Voorraad" }, { value: "Auto", label: "Tracking" }]
            : [{ value: "0", label: "Manual" }, { value: "Real-time", label: "Stock" }, { value: "Auto", label: "Tracking" }],
        },
        {
          name: isNL ? "Facturatie Agent" : "Invoicing Agent",
          icon: Receipt,
          headline: isNL ? "Nooit meer achter betalingen aanbellen" : "Never chase payments again",
          description: isNL
            ? "Genereert facturen automatisch, stuurt herinneringen en matcht betalingen met je boekhouding."
            : "Generates invoices automatically, sends reminders and matches payments with your bookkeeping.",
          integrations: ["Exact Online", "Mollie", "Moneybird"],
          results: isNL
            ? [{ value: "Auto", label: "Herinneringen" }, { value: "99%", label: "Match-rate" }, { value: "-95%", label: "Fouten" }]
            : [{ value: "Auto", label: "Reminders" }, { value: "99%", label: "Match rate" }, { value: "-95%", label: "Errors" }],
        },
        {
          name: isNL ? "HR Onboarding Agent" : "HR Onboarding Agent",
          icon: Users,
          headline: isNL ? "Nieuwe medewerker productief in dagen" : "New employee productive in days",
          description: isNL
            ? "Stuurt nieuwe medewerkers door alle stappen: documenten, accounts en introductiegesprekken."
            : "Guides new employees through all steps: documents, accounts and intro meetings.",
          integrations: ["Personio", "Notion", "Slack", "Google Workspace"],
          results: isNL
            ? [{ value: "90%", label: "Sneller" }, { value: "0", label: "Vergeten" }, { value: "100%", label: "Consistent" }]
            : [{ value: "90%", label: "Faster" }, { value: "0", label: "Forgotten" }, { value: "100%", label: "Consistent" }],
        },
        {
          name: isNL ? "Meeting Agent" : "Meeting Agent",
          icon: ClipboardList,
          headline: isNL ? "Notulen klaar voordat de call afloopt" : "Minutes ready before the call ends",
          description: isNL
            ? "Luistert mee met meetings, genereert automatisch notulen, actiepunten en follow-up taken. Stuurt alles naar Slack en je projectmanagement-tool."
            : "Listens in on meetings, automatically generates minutes, action items and follow-up tasks. Sends everything to Slack and your project management tool.",
          integrations: ["Google Meet", "Zoom", "Slack", "Linear"],
          results: isNL
            ? [{ value: "Auto", label: "Notulen" }, { value: "5u/wk", label: "Bespaard" }, { value: "100%", label: "Actiepunten" }]
            : [{ value: "Auto", label: "Minutes" }, { value: "5h/wk", label: "Saved" }, { value: "100%", label: "Action items" }],
        },
      ],
    },
    {
      id: "kennisbank",
      title: isNL ? "Kennisbank & Intelligence" : "Knowledge & Intelligence",
      subtitle: isNL ? "Al je kennis, altijd vindbaar" : "All your knowledge, always findable",
      agentCount: "4 agents",
      icon: BookOpen,
      gradient: "from-violet-500 to-purple-400",
      agents: [
        {
          name: isNL ? "Kennisbank Agent" : "Knowledge Base Agent",
          icon: Database,
          headline: isNL ? "Stel een vraag, krijg antwoord met bronnen" : "Ask a question, get answers with sources",
          description: isNL
            ? "Maakt al je documenten doorzoekbaar met AI. Vragen in natuurlijke taal, antwoord met bronvermelding."
            : "Makes all your documents searchable with AI. Questions in natural language, answers with source references.",
          integrations: ["SharePoint", "Notion", "Confluence", "Google Drive"],
          results: isNL
            ? [{ value: "10K+", label: "Documenten" }, { value: "<5s", label: "Antwoord" }, { value: "100%", label: "Met bron" }]
            : [{ value: "10K+", label: "Documents" }, { value: "<5s", label: "Answer" }, { value: "100%", label: "With source" }],
        },
        {
          name: isNL ? "Compliance Agent" : "Compliance Agent",
          icon: Shield,
          headline: isNL ? "Altijd compliant, zonder handmatige checks" : "Always compliant, no manual checks",
          description: isNL
            ? "Scant documenten automatisch tegen regelgeving. Signaleert risico's en houdt een audit trail bij."
            : "Scans documents against regulations automatically. Flags risks and maintains an audit trail.",
          integrations: ["SharePoint", "Power Automate", "Custom APIs"],
          results: isNL
            ? [{ value: "Auto", label: "Scanning" }, { value: "100%", label: "Audit trail" }, { value: "0", label: "Gemist" }]
            : [{ value: "Auto", label: "Scanning" }, { value: "100%", label: "Audit trail" }, { value: "0", label: "Missed" }],
        },
        {
          name: isNL ? "Rapportage Agent" : "Reporting Agent",
          icon: FileBarChart,
          headline: isNL ? "Rapporten die zichzelf schrijven" : "Reports that write themselves",
          description: isNL
            ? "Haalt data uit al je systemen, genereert rapporten en stuurt ze automatisch naar de juiste mensen."
            : "Pulls data from all your systems, generates reports and sends them to the right people automatically.",
          integrations: ["Power BI", "Google Sheets", "Slack", "BigQuery"],
          results: isNL
            ? [{ value: "Auto", label: "Delivery" }, { value: "Multi", label: "Databronnen" }, { value: "Wekelijks", label: "Updates" }]
            : [{ value: "Auto", label: "Delivery" }, { value: "Multi", label: "Sources" }, { value: "Weekly", label: "Updates" }],
        },
        {
          name: isNL ? "Research Agent" : "Research Agent",
          icon: Microscope,
          headline: isNL ? "Marktonderzoek in minuten, niet weken" : "Market research in minutes, not weeks",
          description: isNL
            ? "Doorzoekt het web, analyseert publicaties en vat trends samen in een rapport met bronvermelding. Van vraag tot compleet onderzoek in één klik."
            : "Searches the web, analyzes publications and summarizes trends into a report with citations. From question to complete research in one click.",
          integrations: ["Web search", "Google Scholar", "Notion", "Google Docs"],
          results: isNL
            ? [{ value: "<10m", label: "Per rapport" }, { value: "50+", label: "Bronnen" }, { value: "AI", label: "Samenvatting" }]
            : [{ value: "<10m", label: "Per report" }, { value: "50+", label: "Sources" }, { value: "AI", label: "Summary" }],
        },
      ],
    },
    {
      id: "finance-legal",
      title: isNL ? "Finance & Juridisch" : "Finance & Legal",
      subtitle: isNL ? "Minder risico, meer controle" : "Less risk, more control",
      agentCount: "4 agents",
      icon: Scale,
      gradient: "from-cyan-500 to-teal-400",
      agents: [
        {
          name: isNL ? "Contract Review Agent" : "Contract Review Agent",
          icon: ScanLine,
          headline: isNL ? "Contracten gescand in seconden, niet uren" : "Contracts scanned in seconds, not hours",
          description: isNL
            ? "Upload een contract en de AI markeert risicoclausules, ontbrekende voorwaarden en afwijkingen van je standaard. Bespaart juridische uren en voorkomt verrassingen."
            : "Upload a contract and the AI flags risk clauses, missing terms and deviations from your standard. Saves legal hours and prevents surprises.",
          integrations: ["Google Drive", "DocuSign", "Notion", "Slack"],
          results: isNL
            ? [{ value: "<60s", label: "Scan-tijd" }, { value: "99%", label: "Nauwkeurig" }, { value: "-80%", label: "Juridische uren" }]
            : [{ value: "<60s", label: "Scan time" }, { value: "99%", label: "Accurate" }, { value: "-80%", label: "Legal hours" }],
        },
        {
          name: isNL ? "Uitgaven Bewaker" : "Expense Guardian",
          icon: Wallet,
          headline: isNL ? "Elke euro verantwoord, automatisch" : "Every euro accounted for, automatically",
          description: isNL
            ? "Categoriseert uitgaven automatisch, signaleert dubbele facturen, herkent afwijkingen van budgetten en stuurt wekelijkse spend-reports naar het management."
            : "Automatically categorizes expenses, flags duplicate invoices, detects budget deviations and sends weekly spend reports to management.",
          integrations: ["Exact Online", "Moneybird", "Stripe", "Slack"],
          results: isNL
            ? [{ value: "Auto", label: "Categorisatie" }, { value: "0", label: "Dubbele facturen" }, { value: "Wekelijks", label: "Rapportage" }]
            : [{ value: "Auto", label: "Categorization" }, { value: "0", label: "Duplicate invoices" }, { value: "Weekly", label: "Reporting" }],
        },
        {
          name: isNL ? "Fraude Detectie Agent" : "Fraud Detection Agent",
          icon: Fingerprint,
          headline: isNL ? "Verdachte transacties geblokkeerd voordat het escaleert" : "Suspicious transactions blocked before they escalate",
          description: isNL
            ? "Monitort transactiepatronen in real-time, herkent anomalieën en blokkeert verdachte activiteit. Stuurt een alert naar je team met context en aanbevolen actie."
            : "Monitors transaction patterns in real-time, detects anomalies and blocks suspicious activity. Sends an alert to your team with context and recommended action.",
          integrations: ["Stripe", "Mollie", "Adyen", "Custom APIs"],
          results: isNL
            ? [{ value: "Real-time", label: "Detectie" }, { value: "<5s", label: "Blokkering" }, { value: "0", label: "False negatives" }]
            : [{ value: "Real-time", label: "Detection" }, { value: "<5s", label: "Blocking" }, { value: "0", label: "False negatives" }],
        },
        {
          name: isNL ? "Cash Flow Agent" : "Cash Flow Agent",
          icon: CircleDollarSign,
          headline: isNL ? "Voorspelt je cashflow 90 dagen vooruit" : "Predicts your cash flow 90 days ahead",
          description: isNL
            ? "Analyseert inkomsten, uitgaven, openstaande facturen en seizoenspatronen om je cashflow te voorspellen. Waarschuwt bij dreigend tekort zodat je op tijd kunt handelen."
            : "Analyzes revenue, expenses, outstanding invoices and seasonal patterns to predict your cash flow. Warns of potential shortfalls so you can act in time.",
          integrations: ["Exact Online", "Moneybird", "Stripe", "Google Sheets"],
          results: isNL
            ? [{ value: "90d", label: "Voorspelling" }, { value: "94%", label: "Nauwkeurig" }, { value: "Auto", label: "Alerts" }]
            : [{ value: "90d", label: "Forecast" }, { value: "94%", label: "Accurate" }, { value: "Auto", label: "Alerts" }],
        },
      ],
    },
  ];
  // Order: klantenservice, sales, operations, kennisbank, finance-legal, data-insights
  return [cats[1], cats[2], cats[3], cats[4], cats[5], cats[0]];
};
