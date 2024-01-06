import Logo from "../ui/Logo";

import { getDictionary } from "../dictionaries/getDictionary";
import { Languages } from "../types";

export default async function HomeLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: Languages;
  };
}>) {
  const dictionary = getDictionary(locale);

  return (
    <>
      <header>
        <Logo text={dictionary.common.logoCommon.text} />
      </header>

      <main className="flex min-h-screen flex-col items-center justify-between p-[20px] w-full">
        {children}
      </main>
    </>
  );
}
