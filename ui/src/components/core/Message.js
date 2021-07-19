import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children, ...props }) => {
  return (
    <Alert variant={variant} {...props}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
