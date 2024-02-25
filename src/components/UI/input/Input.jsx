import React, { forwardRef } from 'react'
import styled from 'styled-components';

// type IInput = {
//   value: string;
//   setValue: React.Dispatch<React.SetStateAction<string>>;
//   type: string;
//   isHidden?: boolean;
//   name: string;
//   placeholder?: string;
//   style?: CSSProperties;
//   autoFocus?: boolean;
// } & React.RefAttributes<HTMLInputElement>;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 11px;
  border-radius: 6px;
  outline: none;
  border: none;
  -webkit-box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  -moz-box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  box-shadow: 0px 0px 10px 2px rgba(34, 60, 80, 1);
  color: #ffffff;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  background: transparent;
 `
const Input = forwardRef((props, ref) => {
  const { value, setValue, type, isHidden, name, placeholder, style = {}, autoFocus, ...datum } = props

  return (
    <>
      {!isHidden && <StyledInput
        ref={ref}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={()=>{setValue(event.target.value)}}
        style={{ ...style }}
        autoFocus={autoFocus}
        {...datum}
      />}
    </>
  )
})

export default Input

Input.displayName = 'Input';