import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LeftArrow } from "../../assets/LeftArrow.svg";
import { useNavigate } from "react-router-dom";

const InfoTop = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderWrap>
        <div onClick={() => { navigate(-1) }}><LeftArrow /></div>
        <div>정보제공</div>
        <div></div>
      </HeaderWrap>
    </>
  )

}
export default InfoTop;

const HeaderWrap = styled.div`
  position:fixed;
  top:0;
  left:0;

  width:100vw;
  height:48px;
  display:flex;
  justify-content:space-between;
  padding:10px;
  border-bottom:1px solid rgba(0,0,0,0.14);
  box-sizing:border-box;
  z-index:1;
`;