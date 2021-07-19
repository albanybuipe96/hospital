import styled from "styled-components";

export const Wrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;

  span {
    font-weight: ${(props) => props.bolded && "bold"};
    font-size: 1.3rem;
  }

  small {
  }
`;
