import { SVGProps } from "react";

const CustomIconUnsupported = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
    <path
      style={{
        fill: "#bb2124",
      }}
      fillRule="evenodd"
      d="M11.326 10.222a4 4 0 1 0-6.653-4.444 4 4 0 0 0 6.653 4.444zM8.65 10H7.4v1h1.25v-1zM7.4 9V5h1.25v4H7.4z"
      clipRule="evenodd"
    />
  </svg>
);

export default CustomIconUnsupported;
