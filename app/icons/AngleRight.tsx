import { SvgProps } from "./types";

const AngleRight = ({ width, height, fill }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height ?? "16"}
      width={width ?? "10"}
      viewBox="0 0 320 512"
    >
      <path
        fill={fill}
        d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
      />
    </svg>
  );
};

export default AngleRight;
