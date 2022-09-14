import styled, { css } from "styled-components";

const Button = ({ imgUrl, on, font, outline, border, margin, height, width, btntype, type, onClick, children, disabled }) => {
  return (
    <StButton
      font={font}
      outline={outline}
      border={border}
      margin={margin}
      height={height}
      width={width}
      type={type}
      onClick={onClick}
      btntype={btntype}
      disabled={disabled}
      on={on}
      imgUrl={imgUrl}
    >
      {children}
    </StButton>
  );
};

export default Button;

const StButton = styled.button`
  cursor: pointer;
  ${(props) => {
    return (
      props.btntype === "onOff" &&
      css`
        background-color: transparent;
        border: transparent;
        color: #222222;
        padding: 25px 0;
        width: 100%;
        border-bottom: ${(props) => (props.on === "on" ? "6px solid #8ecf70" : "none")};
        font-size: 20px;
        font-weight: 600;
        :hover {
          border: ${({ border }) => `${border}`};
        }
      `
    );
  }}
`;