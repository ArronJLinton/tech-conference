import type { FC } from "react";

type CityMapProps = {
  variant: "grid" | "coast";
};

const gridLines = {
  vertical: [48, 110, 168, 240, 310, 390, 470, 548],
  horizontal: [36, 88, 146, 204, 262, 318],
} as const;

const CityMap: FC<CityMapProps> = ({ variant }) => {
  if (variant === "coast") {
    return (
      <svg viewBox="0 0 640 360" className="h-full w-full" aria-hidden="true">
        <rect width="640" height="360" fill="#0c121a" />
        <path
          d="M0 40 C 180 20, 260 80, 300 150 C 340 220, 420 250, 640 210 L 640 0 L 0 0 Z"
          fill="#101a28"
        />
        <path
          d="M0 210 C 140 180, 220 230, 310 200 C 410 166, 480 230, 640 190"
          fill="none"
          stroke="#2ee6ff"
          strokeOpacity="0.85"
          strokeWidth="2"
        />
        <path
          d="M80 360 C 120 240, 200 180, 280 150"
          fill="none"
          stroke="#7aa2ff"
          strokeOpacity="0.7"
        />
        <path
          d="M220 360 C 250 250, 340 190, 460 160"
          fill="none"
          stroke="#2ee6ff"
          strokeOpacity="0.45"
        />
        <path d="M40 300 H 260" stroke="#31475c" />
        <path d="M180 80 V 340" stroke="#31475c" />
        <path d="M360 40 V 330" stroke="#31475c" />
        <path d="M120 120 H 520" stroke="#31475c" />
        <path
          d="M430 90 C 470 140, 500 180, 560 240"
          fill="none"
          stroke="#d16bff"
          strokeOpacity="0.7"
        />
        <circle cx="300" cy="168" r="16" fill="#2ee6ff" fillOpacity="0.16" />
        <circle cx="300" cy="168" r="5" fill="#2ee6ff" />
        <circle cx="140" cy="250" r="3" fill="#9ecbff" />
        <circle cx="470" cy="150" r="3" fill="#a78bfa" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 640 360" className="h-full w-full" aria-hidden="true">
      <rect width="640" height="360" fill="#0c121a" />
      {gridLines.vertical.map((x) => (
        <path key={`v-${x}`} d={`M${x} 0 V360`} stroke="#24384a" />
      ))}
      {gridLines.horizontal.map((y) => (
        <path key={`h-${y}`} d={`M0 ${y} H640`} stroke="#24384a" />
      ))}
      <path d="M48 262 H310 V88 H548" fill="none" stroke="#2ee6ff" strokeWidth="2" />
      <path d="M168 318 H470 V146" fill="none" stroke="#7aa2ff" strokeOpacity="0.8" />
      <path d="M110 36 V204 H390" fill="none" stroke="#d16bff" strokeOpacity="0.65" />
      <rect x="240" y="88" width="70" height="58" fill="#ffffff" fillOpacity="0.03" />
      <rect x="310" y="146" width="80" height="58" fill="#ffffff" fillOpacity="0.03" />
      <circle cx="310" cy="88" r="16" fill="#2ee6ff" fillOpacity="0.16" />
      <circle cx="310" cy="88" r="5" fill="#2ee6ff" />
      <circle cx="168" cy="262" r="3" fill="#9ecbff" />
      <circle cx="470" cy="146" r="3" fill="#a78bfa" />
    </svg>
  );
};

export default CityMap;
