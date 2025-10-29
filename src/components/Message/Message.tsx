import type { FC } from "react";
import styles from "./Message.module.css";
import type { MessageProps } from "./Message.types";

const Message: FC<MessageProps> = ({ message }) => {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
};

export default Message;
