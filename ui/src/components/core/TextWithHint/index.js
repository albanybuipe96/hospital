import React from "react";
import * as S from "./styles";
const TextWithHint = ({ text, hint, bolded }) => {
  return (
    <S.Wrapper>
      <span>{text}</span>
      <small>{hint}</small>
    </S.Wrapper>
  );
};

export default TextWithHint;
