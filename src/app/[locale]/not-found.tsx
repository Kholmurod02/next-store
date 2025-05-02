import { setRequestLocale } from 'next-intl/server';

export default function NotFound({ params }: { params: { locale: string } }) {
  // Enable static rendering
  setRequestLocale(params.locale);
  
  return (
    <div>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}