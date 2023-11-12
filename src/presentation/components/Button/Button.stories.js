import { Button } from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    type: {
      options: ["three-rd", "two-nd", "one-st", "disable"],
      control: { type: "select" },
    },
    size: {
      options: ["normal", "small", "big"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    type: "three-rd",
    size: "normal",
    khung: true,
    className: {},
    text: "Create an account",
  },
};
