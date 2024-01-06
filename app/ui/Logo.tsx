type LogoProps = {
  text: string;
};

const Logo = ({ text }: LogoProps) => {
  return <span className=" text-s font-bold">{text}</span>;
};

export default Logo;
