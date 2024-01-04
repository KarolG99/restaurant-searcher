import { getDictionary } from "../dictionaries/getDictionary";
import { ParamsType } from "../types";
import Logo from "../ui/Logo";

export default async function Home({ params: { locale } }: ParamsType) {
  const dictionary = await getDictionary(locale);

  return (
    <>
      <header>
        <Logo text={dictionary.common.logo} />
      </header>
      
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    </>
  );
}
