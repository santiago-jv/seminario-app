/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

interface Props {
  type: "three-rd" | "two-nd" | "one-st" | "disable";
  size: "normal" | "small" | "big";
  khung: boolean;
  className: any;
  text: string;
}

export const Button = ({ type, size, khung, className, text = "Create an account" }: Props): JSX.Element => {
  return (
    <button className={`button ${type} ${size} khung-${khung} ${className}`}>
      <div className="frame">
        {["one-st", "three-rd", "two-nd"].includes(type) && <div className="create-an-account">{text}</div>}

        {type === "disable" && <>{text}</>}
      </div>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["three-rd", "two-nd", "one-st", "disable"]),
  size: PropTypes.oneOf(["normal", "small", "big"]),
  khung: PropTypes.bool,
  text: PropTypes.string,
};
