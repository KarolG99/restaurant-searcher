import Logo from "../ui/Logo";

import Footer from "../ui/Footer";

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
  return (
    <>
      <header className=" pt-[10px] px-[15px] w-full max-w-[1280px] text-center">
        <Logo />
      </header>

      <main className="min-h-screen px-[15px] py-[20px] w-full max-w-[1280px]">
        {children}
      </main>

      <Footer locale={locale} />
    </>
  );
}
