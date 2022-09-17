import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const ConfirmModal = (props) => {
  const { modalOnOff } = props;
  const navigate = useNavigate();

  const clickSubmit = () => {
    navigate("/login");
  };

  return (
    <>
      <ModalWrap onClick={modalOnOff}>
        <ModalBody
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ConfirmWrap>
            <ConfirmTitle>
              로그인이 필요합니다.
              <br /> 로그인 페이지로 이동하시겠습니까?
            </ConfirmTitle>
            <ConfirmBox>
              <ConfirmItem borderRight={"1px solid #d9d9d9"} onClick={modalOnOff}>
                취소
              </ConfirmItem>
              <ConfirmItem borderLeft={"1px solid #d9d9d9"} onClick={clickSubmit}>
                확인
              </ConfirmItem>
            </ConfirmBox>
          </ConfirmWrap>
        </ModalBody>
      </ModalWrap>
    </>
  );
};
export default ConfirmModal;

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  padding: 0 15px;
  box-sizing: border-box;
`;
const ModalBody = styled.div`
  width: 100%;

  background-color: #fff;
  border-radius: 12px;
`;

const ConfirmWrap = styled.div`
  /* display: ${(props) => (!props.viewFlag ? "block" : "none")}; */
`;
const ConfirmTitle = styled.p`
  font-size: 18px;
  text-align: center;
  padding: 50px 0;
`;

const ConfirmBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  border-top: 1px solid #d9d9d9;
`;
const ConfirmItem = styled.div`
  width: 50%;
  border-right: 1px solid #d9d9d9;
  border-left: 1px solid #d9d9d9;
  font: 600 22px/30px "arial", "sans-serif";
  padding: 19px 0;
`;