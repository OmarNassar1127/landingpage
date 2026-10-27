import type { Solution } from "./types";

// The service pages exist in Dutch only, so English pages point to the English home page.
const HOME = { name: "Custom AI agents by Virelio", href: "/en/" };

export const solutionsEn: Solution[] = [
  {
    slug: "klantenservice-agent",
    headline: "Customer service that never sleeps.",
    name: "Customer service agent",
    title: "Customer service agent: 24/7 answers by email, chat and WhatsApp",
    description:
      "An AI agent that answers customer questions 24/7 by email, chat and WhatsApp, and hands the conversation to your team when needed. From €1,000 one-off.",
    keywords: "customer service agent, AI customer service, automate customer questions, WhatsApp AI agent, AI support chat, 24/7 customer service",
    pain: "“Every morning the inbox is full of questions we have answered a hundred times.”",
    teaser: "Answers customer questions day and night, and passes the hard ones to your team.",
    intro:
      "The customer service agent answers the questions that keep coming back, including at night and at weekends. When a conversation gets difficult, it passes it to a colleague with the context attached.",
    steps: [
      { title: "Learns your answers", text: "We feed the agent your FAQ, your terms and a batch of real questions from your inbox." },
      { title: "Answers on its own", text: "Known questions get an answer straight away, in your tone, by email, chat or WhatsApp." },
      { title: "Hands over", text: "Not sure, or an angry customer? The conversation goes to your team with a short summary." },
    ],
    gets: [
      "Starts on the channel where most questions arrive",
      "Answers based on your own FAQ and policies",
      "Handover to a colleague, with a summary",
      "Connects to your helpdesk or mailbox, such as Zendesk or Gmail",
      "An overview of the questions asked most often",
    ],
    related: ["inbox-agent", "kennisbank-assistent", "ai-receptionist"],
    service: HOME,
  },
  {
    slug: "ai-op-je-eigen-data",
    headline: "Just ask your database.",
    name: "AI on your own data",
    title: "AI on your own data: ask your database questions in plain language",
    description:
      "A read-only AI agent on your database or spreadsheets. Ask questions in plain language and get your weekly report automatically. From €1,000 one-off.",
    keywords: "AI on your own data, ask database questions, AI reporting, automate weekly report, AI spreadsheet analysis, natural language data questions",
    pain: "“Every time I need a number, I have to ask someone to run an export.”",
    teaser: "Ask your database or spreadsheets questions and get your weekly report.",
    intro:
      "This agent reads your database or spreadsheets but cannot change anything. You ask a question in plain language and get the answer with its source, so you can see where the number comes from.",
    steps: [
      { title: "Read-only access", text: "We connect the agent to your database, Google Sheets or Excel with a read-only account. It cannot write." },
      { title: "Just ask", text: "‘Which customers ordered less this quarter than last year?’ The agent looks it up and shows how it got there." },
      { title: "Weekly report, done", text: "Your key figures are collected every week and sent as an overview to your email or Slack." },
    ],
    gets: [
      "Read-only connection to your database or spreadsheets",
      "Answers with the query or source attached",
      "A weekly report with your key figures",
      "Clear rules on which tables it can and cannot see",
      "Ask questions in Slack, Teams or email",
    ],
    related: ["eigen-bedrijfs-ai", "kennisbank-assistent", "factuurverwerking"],
    service: HOME,
  },
  {
    slug: "offerte-agent",
    headline: "From request to quote, without the late night.",
    name: "Quote agent",
    title: "Quote agent: from enquiry to a ready quote in your own format",
    description:
      "An AI agent that turns an enquiry from email, a form or call notes into a ready quote in your own format. You check it and send it. From €1,000 one-off.",
    keywords: "quote agent, automate quotes, AI quote generator, proposal automation, enquiry to quote, faster quotes",
    pain: "“A quote takes me a whole evening, and by then the customer has signed with someone else.”",
    teaser: "Turns an enquiry from email, a form or a call into a quote in your format.",
    intro:
      "The quote agent reads the enquiry, prices it from your own price list and prepares a draft in your template. You read it and press send.",
    steps: [
      { title: "Reads the enquiry", text: "An email, a web form or your notes after a call: the agent works out what the customer wants." },
      { title: "Uses your prices", text: "It works from your price list, discount rules and standard texts. If something is missing, it lists it as a question for you." },
      { title: "Draft for review", text: "The quote is ready in your own Word, PDF or quoting template. Nothing goes out without your approval." },
    ],
    gets: [
      "Quotes in your own branding and template",
      "Prices from your own price list, no guesswork",
      "A list of open questions when the enquiry is incomplete",
      "Connects to your mailbox or web form",
      "You approve; the agent never sends on its own",
    ],
    related: ["sales-opvolging", "inbox-agent", "contract-check"],
    service: HOME,
  },
  {
    slug: "factuurverwerking",
    headline: "Receipts in, bookings ready.",
    name: "Invoice processing",
    title: "AI invoice processing: purchase invoices and receipts ready to book",
    description:
      "An AI agent that reads purchase invoices and receipts and prepares the entry in your accounting software, such as Exact Online or Xero. From €1,000 one-off.",
    keywords: "AI invoice processing, automate purchase invoices, receipt processing, Exact Online automation, accounts payable AI, bookkeeping automation",
    pain: "“At the end of every month I am stuck with a pile of receipts and an inbox full of PDFs.”",
    teaser: "Reads purchase invoices and receipts and prepares the entry in your software.",
    intro:
      "The agent reads every purchase invoice and receipt, picks out supplier, amount and VAT, and prepares the entry in your accounting software. You or your accountant approve it.",
    steps: [
      { title: "One place for everything", text: "Invoices arrive at a fixed email address or a shared folder. Receipts you photograph with your phone." },
      { title: "Read and code", text: "The agent extracts supplier, invoice number, amounts and VAT, and suggests a ledger account based on earlier entries." },
      { title: "Ready for approval", text: "The entry waits as a draft in your software. If an invoice looks like a duplicate or the VAT rate is off, you get a flag." },
    ],
    gets: [
      "Reads PDF invoices and photos of receipts",
      "Suggested ledger account and VAT code",
      "Duplicate invoice check",
      "Connects to your accounting software, such as Exact Online or Xero",
      "Nothing is booked without approval",
    ],
    related: ["inbox-agent", "ai-op-je-eigen-data", "contract-check"],
    service: HOME,
  },
  {
    slug: "inbox-agent",
    headline: "A shared inbox that sorts itself.",
    name: "Inbox agent",
    title: "Inbox agent: a shared inbox that sorts itself",
    description:
      "An AI agent that sorts and labels your shared inbox and drafts replies. Your team reviews and sends. From €1,000 one-off, maintenance from €99 a month.",
    keywords: "inbox agent, shared inbox automation, AI email sorting, AI draft replies, info mailbox automation, Outlook AI, Gmail AI",
    pain: "“In the info@ inbox nobody knows any more who is picking up what.”",
    teaser: "Sorts and labels your shared inbox and drafts the replies.",
    intro:
      "The inbox agent reads every incoming email, labels it, assigns it to the right colleague and writes a draft reply. Your team only has to review.",
    steps: [
      { title: "Reads along", text: "The agent works inside your shared inbox in Gmail or Outlook. Your way of working stays the same." },
      { title: "Sorts and assigns", text: "Enquiry, complaint, invoice or spam: every email gets a label and lands with the right person." },
      { title: "Writes the draft", text: "Emails that need a reply get a draft in your team’s tone. Your team does the sending." },
    ],
    gets: [
      "Labels and rules that fit how your team works",
      "Draft replies in your own tone",
      "Assignment to the right colleague",
      "Works in Gmail or Outlook, no new system",
      "A daily list of emails that are being left",
    ],
    related: ["klantenservice-agent", "offerte-agent", "factuurverwerking"],
    service: HOME,
  },
  {
    slug: "sales-opvolging",
    headline: "Every lead followed up on time.",
    name: "Sales follow-up",
    title: "AI sales follow-up: every lead on time, a clean CRM",
    description:
      "An AI agent that follows up every lead on time, prepares follow-ups and updates your CRM after each contact. From €1,000 one-off, maintenance from €99 a month.",
    keywords: "AI sales follow-up, lead follow-up, CRM automation, automate follow-ups, HubSpot AI, Pipedrive automation, sales agent",
    pain: "“Leads go cold because nobody calls back in time, and the CRM is always behind.”",
    teaser: "Follows up every lead on time and keeps your CRM up to date.",
    intro:
      "The sales agent tracks who needs a follow-up and when, prepares a personal message and updates your CRM after every conversation. Your salespeople spend their time talking, not on admin.",
    steps: [
      { title: "Every lead captured", text: "New enquiries from your site, email or forms go straight into the CRM with the right details." },
      { title: "Follow up on time", text: "No reply after a quote? The agent prepares a follow-up at the right moment, or sends it if you allow that." },
      { title: "CRM updated", text: "After an email or call the agent summarises the contact and sets the next step in the CRM." },
    ],
    gets: [
      "Connects to your CRM, such as HubSpot, Pipedrive or Salesforce",
      "Follow-ups in your own tone, at the right moment",
      "A summary of every contact",
      "A weekly list of leads that need attention",
      "You decide what it may send on its own",
    ],
    related: ["offerte-agent", "inbox-agent", "ai-op-je-eigen-data"],
    service: HOME,
  },
  {
    slug: "kennisbank-assistent",
    headline: "The right answer, with its source.",
    name: "Knowledge base assistant (RAG)",
    title: "Knowledge base assistant (RAG): answers from your own documents, with sources",
    description:
      "An AI assistant that answers your team’s questions from your own documents, always with a source. For SharePoint, Google Drive and Notion. From €1,000 one-off.",
    keywords: "knowledge base assistant, AI knowledge base, search internal documents, RAG, SharePoint AI, Notion AI search, answers with sources",
    pain: "“New colleagues ask everything three times, because nobody can find the right document.”",
    teaser: "Your team asks questions and gets answers from your own documents, with sources.",
    intro:
      "The knowledge base assistant (RAG) searches your handbooks, procedures and internal documents. Your team asks a question and gets a short answer with a link to the source.",
    steps: [
      { title: "Connect the documents", text: "We connect the assistant to SharePoint, Google Drive, Notion or a folder of PDFs. Confidential material stays out." },
      { title: "Ask where you work", text: "Your team asks questions in Slack or Teams. No new tool to learn." },
      { title: "Answer with source", text: "Every answer points to the document and the passage. If it is not written down anywhere, it says so." },
    ],
    gets: [
      "Answers with sources",
      "Connection to your document source",
      "Works in Slack, Teams or a simple web page",
      "Permissions per folder: not everyone sees everything",
      "A list of questions that no document answers yet",
    ],
    related: ["eigen-bedrijfs-ai", "ai-op-je-eigen-data", "contract-check"],
    service: HOME,
  },
  {
    slug: "recruitment-screening",
    headline: "Every CV read. You decide.",
    name: "Recruitment screening",
    title: "AI recruitment screening: CVs pre-screened, interviews scheduled",
    description:
      "An AI agent that checks CVs against your vacancy, makes a reasoned shortlist and schedules interviews. You make the decision. From €1,000 one-off.",
    keywords: "AI recruitment screening, CV screening, pre-screen candidates, AI hiring, schedule interviews, recruitment automation",
    pain: "“Every vacancy brings in a stack of CVs and I don’t have time to read them all properly.”",
    teaser: "Checks CVs against your vacancy and schedules interviews with the people you pick.",
    intro:
      "The agent checks every CV against the requirements of your vacancy and notes per candidate what fits and what is missing. The decision stays with you. The people you invite pick a slot from your calendar straight away.",
    steps: [
      { title: "Your criteria", text: "We turn your vacancy into clear requirements and nice-to-haves. You decide what weighs most." },
      { title: "Shortlist with reasons", text: "Every CV gets a short explanation per criterion. No black box: you see why." },
      { title: "Interview booked", text: "Candidates you invite choose a time from your calendar. Rejections are ready as drafts." },
    ],
    gets: [
      "A shortlist with reasons per candidate",
      "Connects to your mailbox or ATS",
      "Interviews scheduled through your calendar",
      "Draft emails for invitations and rejections",
      "Retention periods that follow your privacy policy",
    ],
    related: ["planning-agent", "inbox-agent", "kennisbank-assistent"],
    service: HOME,
  },
  {
    slug: "contract-check",
    headline: "Know what you sign.",
    name: "Contract check",
    title: "AI contract check: risky and missing clauses flagged for review",
    description:
      "An AI agent that reads contracts and flags risky or missing clauses, so you or your lawyer can review where it matters. From €1,000 one-off.",
    keywords: "AI contract check, AI contract review, check contracts, clause review, legal document AI, contract analysis",
    pain: "“I sign contracts I have not really read all the way through.”",
    teaser: "Reads contracts and flags risky or missing clauses.",
    intro:
      "The contract check reads every contract against your own checklist. It flags what deviates, such as broad liability or a silent renewal, and reports what is missing. It is a first read, not legal advice.",
    steps: [
      { title: "Your checklist", text: "Together we write down what you look for: liability, notice period, penalties, payment terms." },
      { title: "Read and flag", text: "Forward or upload a contract. For each deviation the agent shows the passage and the reason." },
      { title: "Focused review", text: "You get a short overview to take to your lawyer, or to decide yourself what to send back." },
    ],
    gets: [
      "A checklist built for your contracts",
      "Flagged passages with an explanation",
      "A list of missing clauses",
      "Works with PDF and Word",
      "Your contracts stay in the EU",
    ],
    related: ["offerte-agent", "kennisbank-assistent", "factuurverwerking"],
    service: HOME,
  },
  {
    slug: "productteksten",
    headline: "A good text for every product, in every language.",
    name: "Product descriptions",
    title: "AI product descriptions: written and translated in your tone of voice",
    description:
      "An AI agent that writes and translates product descriptions for your webshop in your own tone of voice, straight from your product data. From €1,000 one-off.",
    keywords: "AI product descriptions, write product descriptions, webshop copy, translate product descriptions, Shopify AI, WooCommerce copy",
    pain: "“Hundreds of our products are online with a bare description, and translating never happens.”",
    teaser: "Writes and translates webshop product descriptions in your tone of voice.",
    intro:
      "The agent writes product descriptions from your product data and a few examples you like. Then it translates them into the languages of your webshop, in the same tone.",
    steps: [
      { title: "Capture your tone", text: "We start with a handful of descriptions you are proud of. From those the agent learns your style, wording and length." },
      { title: "Write from your data", text: "It takes the specifications from your feed or export. It invents nothing that is not in the data." },
      { title: "Translate and publish", text: "The descriptions are translated and prepared for your webshop. You approve each batch." },
    ],
    gets: [
      "Product descriptions in your own tone of voice",
      "Translations into the languages you need",
      "Only facts from your product data",
      "Batches for approval before anything goes live",
      "Connects to Shopify, WooCommerce or a CSV export",
    ],
    related: ["klantenservice-agent", "kennisbank-assistent", "inbox-agent"],
    service: HOME,
  },
  {
    slug: "planning-agent",
    headline: "The schedule sorted, even after a sick call.",
    name: "Planning agent",
    title: "Planning agent: schedules, rosters and routes from your own rules",
    description:
      "An AI agent that books appointments, builds rosters and plans routes from your rules, and handles changes straight away. From €1,000 one-off.",
    keywords: "planning agent, roster automation, AI scheduling, AI route planning, appointment scheduling, staff planning automation",
    pain: "“I lose hours on the roster every week, and one sick call throws everything out.”",
    teaser: "Builds rosters and plans appointments and routes from your own rules.",
    intro:
      "The planning agent knows your rules: who can do what, who is available when, how far an engineer drives. It proposes the roster or route and adjusts it when something changes.",
    steps: [
      { title: "Rules written down", text: "We list your planning rules: availability, contract hours, skills, travel times." },
      { title: "Proposal in your calendar", text: "The agent builds a roster, appointment plan or route and puts it in your calendar or planning tool." },
      { title: "Changes handled", text: "A sick call or a rush job? It reshuffles the plan and shows what changes before you approve." },
    ],
    gets: [
      "Planning based on your own rules",
      "Connects to Google Calendar, Outlook or your planning tool",
      "A proposal for every change; you approve",
      "Routes with travel time between appointments",
      "An overview of clashes and gaps in the plan",
    ],
    related: ["recruitment-screening", "ai-receptionist", "sales-opvolging"],
    service: HOME,
  },
  {
    slug: "eigen-bedrijfs-ai",
    headline: "Your own company AI. Everyone sees only what they may see.",
    name: "Your own company AI",
    title: "Your own company AI: an AI assistant on your own server, with access per role",
    description:
      "Your office’s own AI assistant, on your own server. Everyone sees only what they may see, BSN and IBAN numbers are masked and every question is logged. From €1,000 one-off.",
    keywords: "own AI assistant, company AI, self-hosted AI assistant, secure AI for accountants, AI for bookkeeping firms, AI for payroll, business ChatGPT alternative, GDPR AI assistant",
    pain: "“My people paste client files into ChatGPT, and I don’t know what happens to that data.”",
    teaser: "An AI assistant on your own server that knows, per person, what it may show.",
    intro:
      "Your team asks questions to one assistant, on your own server and about your own documents. Every question passes the same checks: who is asking, may they see this, and does the answer hold a BSN or IBAN they may not see. Made for offices that hold client data, such as accountants, bookkeeping firms and payroll offices.",
    steps: [
      { title: "On your own server", text: "We install the assistant on your own server and connect your documents. Everyone signs in with their work account." },
      { title: "Access per role", text: "You decide who sees what: salaries for HR only, board notes for the director only. What someone may not see stays out of their answer." },
      { title: "Every question checked", text: "Attempts to trick the assistant are stopped, BSN and IBAN numbers are masked, and every question goes into the log." },
    ],
    gets: [
      "The assistant on your own server",
      "Sign-in with your Microsoft or Google work account",
      "Access per role, on documents and on actions",
      "BSN, IBAN and salaries masked for those who may not see them",
      "A log of every question and every check",
      "A set of attack tests that runs again on every change",
    ],
    related: ["kennisbank-assistent", "ai-op-je-eigen-data", "contract-check"],
    service: HOME,
  },
];

export const receptionistEn = {
  name: "AI receptionist",
  teaser: "Answers the phone and books appointments, even when you have no time.",
  href: "/voiceassistant/",
};
