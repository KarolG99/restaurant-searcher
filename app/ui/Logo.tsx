type LogoProps = {
  text: string;
};

const Logo = ({ text }: LogoProps) => {
  return <span>{text}</span>;
};

export default Logo;
