type LogoProps = {
  size?: "xs" | "s" | "m" | "l" | "xl";
};

const Logo = ({ size = "s" }: LogoProps) => {
  return <span className={`text-${size} font-bold`}>BeeestRest</span>;
};

export default Logo;
