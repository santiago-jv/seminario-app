/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  className: any;
}

export const Back1 = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`back-1 ${className}`}
      fill="none"
      height="24"
      viewBox="0 0 15 24"
      width="15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        d="M4.73796 12.0051L13.7163 3.02634C13.9635 2.77971 14.0995 2.44995 14.0995 2.09834C14.0995 1.74654 13.9635 1.41698 13.7163 1.16995L12.9296 0.38361C12.6827 0.136195 12.3528 0 12.0012 0C11.6496 0 11.32 0.136195 11.073 0.38361L0.382834 11.0736C0.134834 11.3214 -0.000970382 11.6525 5.22757e-06 12.0045C-0.000970382 12.358 0.134639 12.6888 0.382834 12.9368L11.063 23.6164C11.3101 23.8638 11.6396 24 11.9914 24C12.343 24 12.6726 23.8638 12.9198 23.6164L13.7063 22.83C14.2182 22.3182 14.2182 21.4851 13.7063 20.9735L4.73796 12.0051Z"
        fill="white"
      />
    </svg>
  );
};
