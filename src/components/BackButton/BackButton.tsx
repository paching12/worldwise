import React from "react";
import { Button, BUTTON_TYPES } from "../Button";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      type={BUTTON_TYPES.PRIMARY}
      onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        navigate(-1);
      }}
    >
      <strong>&larr; Back</strong>
    </Button>
  );
};

export default BackButton;
