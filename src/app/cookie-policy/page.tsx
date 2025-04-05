import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = generateMetadata({
  title: "Cookie Policy",
  description: "Learn about how Virelio uses cookies and similar technologies on our website.",
  keywords: "cookie policy, cookies, tracking technologies, website cookies, Virelio",
  pathname: "/cookie-policy",
});

export default function CookiePolicyPage() {
  const lastUpdated = "April 5, 2025";

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

        <div className="prose dark:prose-invert max-w-none">
          <h2>What Are Cookies</h2>
          <p>
            Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
          </p>
          <p>
            Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.
          </p>

          <h2>How Virelio Uses Cookies</h2>
          <p>
            When you use and access the Service, we may place a number of cookie files in your web browser. We use cookies for the following purposes:
          </p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> These cookies are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website.
            </li>
            <li>
              <strong>Analytical/performance cookies:</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.
            </li>
            <li>
              <strong>Functionality cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you, greet you by name and remember your preferences (for example, your choice of language or region).
            </li>
            <li>
              <strong>Targeting cookies:</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.
            </li>
          </ul>

          <h2>Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
          </p>

          <h2>What Are Your Choices Regarding Cookies</h2>
          <p>
            If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
          </p>
          <ul>
            <li>For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noopener noreferrer">https://support.google.com/accounts/answer/32050</a></li>
            <li>For the Internet Explorer web browser, please visit this page from Microsoft: <a href="http://support.microsoft.com/kb/278835" target="_blank" rel="noopener noreferrer">http://support.microsoft.com/kb/278835</a></li>
            <li>For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></li>
            <li>For the Safari web browser, please visit this page from Apple: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a></li>
          </ul>

          <h2>Cookie Policy Updates</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date at the top.
          </p>
          <p>
            You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us:
          </p>
          <p>
            <strong>Email:</strong> privacy@virelio.nl<br />
            <strong>Address:</strong> Amsterdam, The Netherlands
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
