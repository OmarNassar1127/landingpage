import Link from 'next/link';

export default function TestTermsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Pages</h1>
      <ul className="list-disc pl-6">
        <li className="mb-2">
          <Link href="/privacy-policy" className="text-blue-500 underline">
            Privacy Policy
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/terms-of-service" className="text-blue-500 underline">
            Terms of Service
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/cookie-policy" className="text-blue-500 underline">
            Cookie Policy
          </Link>
        </li>
      </ul>
    </div>
  );
}