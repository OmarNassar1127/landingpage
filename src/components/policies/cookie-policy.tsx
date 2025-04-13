'use client';

import React from 'react';
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export default function CookiePolicy() {
  const lastUpdated = "April 5, 2025";

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* Hide navbar since it would be redundant with the back button */}
      <main className="container mx-auto px-4 py-12 max-w-4xl bg-background dark:bg-background">
        <div className="flex justify-between items-center mb-8">
          <a href="/" className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80 text-secondary-foreground dark:text-secondary-foreground transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Back to Home
          </a>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-foreground dark:text-foreground">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

        <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground dark:prose-headings:text-foreground prose-p:text-foreground/90 dark:prose-p:text-foreground/90 prose-strong:text-foreground dark:prose-strong:text-foreground prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
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
          <ul className="prose-li:text-foreground/90 dark:prose-li:text-foreground/90">
            <li>
              <strong className="text-foreground dark:text-foreground">Essential cookies:</strong> These cookies are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website.
            </li>
            <li>
              <strong className="text-foreground dark:text-foreground">Analytical/performance cookies:</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.
            </li>
            <li>
              <strong className="text-foreground dark:text-foreground">Functionality cookies:</strong> These are used to recognize you when you return to our website. This enables us to personalize our content for you, greet you by name and remember your preferences (for example, your choice of language or region).
            </li>
            <li>
              <strong className="text-foreground dark:text-foreground">Targeting cookies:</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.
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
          <ul className="prose-li:text-foreground/90 dark:prose-li:text-foreground/90">
            <li>For the Chrome web browser, please visit this page from Google: <a href="https://support.google.com/accounts/answer/32050" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">https://support.google.com/accounts/answer/32050</a></li>
            <li>For the Internet Explorer web browser, please visit this page from Microsoft: <a href="http://support.microsoft.com/kb/278835" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">http://support.microsoft.com/kb/278835</a></li>
            <li>For the Firefox web browser, please visit this page from Mozilla: <a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored</a></li>
            <li>For the Safari web browser, please visit this page from Apple: <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a></li>
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
          <p className="dark:text-white">
            <strong className="text-foreground dark:text-foreground">Email:</strong> <a href="mailto:privacy@virelio.nl" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@virelio.nl</a><br />
            <strong className="text-foreground dark:text-foreground">Address:</strong> Amsterdam, The Netherlands
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
