import { useTranslations } from "next-intl";
export default function HomePage() {
  const t = useTranslations("HomePage")
  return (
   <>
   <h1>HomePage</h1>
   <p>{t('1')}</p>
   </>
  );
}
