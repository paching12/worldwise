export const BUTTON_TYPES = {
  PRIMARY: "primary",
  BACK: "back",
  POSITION: "position",
} as const;

export type ButtonTypeValues = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];

export type ButtonProps = {
  children: React.ReactElement;
  onClick: () => void;
  type: ButtonTypeValues;
};
