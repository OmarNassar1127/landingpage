'use client';

import React from 'react';
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export default function TermsOfService() {
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
        <h1 className="text-4xl font-bold mb-6 text-foreground dark:text-foreground">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

        <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground dark:prose-headings:text-foreground prose-p:text-foreground/90 dark:prose-p:text-foreground/90 prose-strong:text-foreground dark:prose-strong:text-foreground prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Virelio ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service") govern your use of our website located at virelio.nl ("Service") operated by Virelio.
          </p>
          <p>
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
          </p>

          <h2>2. Communications</h2>
          <p>
            By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.
          </p>

          <h2>3. Content</h2>
          <p>
            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
          </p>
          <p>
            By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
          </p>

          <h2>4. Accounts</h2>
          <p>
            When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Virelio and its licensors. The Service is protected by copyright, trademark, and other laws of both the Netherlands and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Virelio.
          </p>

          <h2>6. Links To Other Web Sites</h2>
          <p>
            Our Service may contain links to third party web sites or services that are not owned or controlled by Virelio.
          </p>
          <p>
            Virelio has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.
          </p>

          <h2>7. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>

          <h2>8. Limitation Of Liability</h2>
          <p>
            In no event shall Virelio, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>

          <h2>10. Changes to These Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <p className="dark:text-white">
            <strong className="text-foreground dark:text-foreground">Email:</strong> <a href="mailto:legal@virelio.nl" className="text-blue-600 dark:text-blue-400 hover:underline">legal@virelio.nl</a><br />
            <strong className="text-foreground dark:text-foreground">Address:</strong> Amsterdam, The Netherlands
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
