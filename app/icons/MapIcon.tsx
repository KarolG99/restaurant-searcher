import { SvgProps } from "./types";

const MapIcon = ({ width, height, fill }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height ?? "16"}
      width={width ?? "18"}
      viewBox="0 0 576 512"
    >
      <path fill={fill} d="M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z" />
    </svg>
  );
};

export default MapIcon;
