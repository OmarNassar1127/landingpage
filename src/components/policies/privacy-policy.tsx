'use client';

import React from 'react';
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl font-bold mb-6 text-foreground dark:text-foreground">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

        <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground dark:prose-headings:text-foreground prose-p:text-foreground/90 dark:prose-p:text-foreground/90 prose-strong:text-foreground dark:prose-strong:text-foreground prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
          <h2>Introduction</h2>
          <p>
            At Virelio, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>

          <h2>The Data We Collect About You</h2>
          <p>
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="prose-li:text-foreground/90 dark:prose-li:text-foreground/90">
            <li><strong className="text-foreground dark:text-foreground">Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong className="text-foreground dark:text-foreground">Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong className="text-foreground dark:text-foreground">Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong className="text-foreground dark:text-foreground">Usage Data</strong> includes information about how you use our website and services.</li>
          </ul>

          <h2>How We Use Your Personal Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="prose-li:text-foreground/90 dark:prose-li:text-foreground/90">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </p>

          <h2>Data Retention</h2>
          <p>
            We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
          </p>

          <h2>Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
          <ul className="prose-li:text-foreground/90 dark:prose-li:text-foreground/90">
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>

          <h2>Third-Party Links</h2>
          <p>
            This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
          </p>

          <h2>Changes to the Privacy Policy</h2>
          <p>
            We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date at the top of this privacy policy.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
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
