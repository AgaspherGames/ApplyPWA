import React from "react";
import "./LoginBackground.css";

interface LoginBackgroundProps {}

const LoginBackground: React.FC<LoginBackgroundProps> = () => {
  return (
    <svg
      className="absolute inset-0 object-cover h-full w-full -z-10"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="none"
      viewBox="0 0 540 960"
    >
      <g mask='url("#SvgjsMask1954")' fill="none">
        <rect
          width="540"
          height="960"
          x="0"
          y="0"
          fill='url("#SvgjsLinearGradient1955")'
        ></rect>
        <path
          d="M212.88 218.46 a121.18 121.18 0 1 0 242.36 0 a121.18 121.18 0 1 0 -242.36 0z"
          fill="rgba(120, 113, 108, 0.36)"
          className="triangle-float2"
        ></path>
        <path
          d="M261.95 545.33 a103.81 103.81 0 1 0 207.62 0 a103.81 103.81 0 1 0 -207.62 0z"
          fill="rgba(120, 113, 108, 0.36)"
          className="triangle-float2"
        ></path>
        <path
          d="M-44.86 40.44 a157.25 157.25 0 1 0 314.5 0 a157.25 157.25 0 1 0 -314.5 0z"
          fill="rgba(120, 113, 108, 0.36)"
          className="triangle-float1"
        ></path>
        <path
          d="M120.588,805.088C137.492,805.159,153.284,797.049,162.296,782.747C171.973,767.39,175.844,747.723,166.566,732.122C157.446,716.786,138.378,711.246,120.588,712.617C105.066,713.813,93.339,724.96,85.438,738.374C77.382,752.05,72.087,768.357,79.485,782.399C87.304,797.239,103.814,805.017,120.588,805.088"
          fill="rgba(120, 113, 108, 0.36)"
          className="triangle-float3"
        ></path>
        <path
          d="M112.323,599.497C165.735,599.518,229.298,604.791,256.123,558.604C283.003,512.322,246.985,459.632,220.598,413.068C193.633,365.485,167.015,304.652,112.323,304.849C57.772,305.045,32.265,366.372,5.389,413.843C-20.877,460.236,-57.89,512.293,-31.281,558.491C-4.651,604.725,58.968,599.476,112.323,599.497"
          fill="rgba(120, 113, 108, 0.36)"
          className="triangle-float1"
        ></path>
      </g>
      <defs>
        <mask id="SvgjsMask1954">
          <rect width="540" height="960" fill="#ffffff"></rect>
        </mask>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
          id="SvgjsLinearGradient1955"
        >
          <stop stop-color="rgba(12, 10, 9, 1)" offset="0"></stop>
          <stop stop-color="rgba(28, 25, 23, 1)" offset="1"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LoginBackground;
