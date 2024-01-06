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
      <header className=" pt-[10px] px-[15px]">
        <Logo text={dictionary.common.logoCommon.text} />
      </header>

      <main className="min-h-screen px-[15px] py-[20px] w-full max-w-[1280px]">
        {children}
      </main>
    </>
  );
}
