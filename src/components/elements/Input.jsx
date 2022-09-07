import styled from "styled-components";

const Input = (props) => {
  const { maxLength, pattern, title, size, id, type, value, name, onChange, placeholder, margin } = props;
  return (
    <InputWrap>
      <StInput
        maxLength={maxLength}
        pattern={pattern}
        title={title}
        id={id}
        type={type}
        value={value}
        name={name}
        size={size}
        onChange={onChange}
        placeholder={placeholder}
        margin={margin}
      />
    </InputWrap>
  );
};

export default Input;

const InputWrap = styled.div``;

const StInput = styled.input`
  width: 100%;
  height: ${(props) => props.height};
  word-wrap: break-word;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid rgb(238, 238, 238);
  margin: ${(props) => props.margin};
  justify-content: center;
  align-items: center;
  display: flex;
  height: 46px;
  padding: 12px;
  font-size: ${(props) => props.size};
  outline: none;
  :hover {
  }
`;
