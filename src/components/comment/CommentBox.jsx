import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar } from "swiper";
import CommentModal from "./CommentModal";
import { flexColumn, flexRow, flexBetween, FlexRow, Text } from "../../styles/Flex";
import Comment from "./Comment";
import useInput from "../../hooks/useInput";
import CommentInput from "./CommentInput";

const CommentBox = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onClickDelete = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      // dispatch(__deleteDetail(param.id));
      // navigate("/");
    } else {
      return;
    }
  };

  const onClickEdit = () => {
    // navigate(`/edit/${param.id}`);
  };

  return (
    <>
      <ModalButton onClick={openModal}>아이콘</ModalButton>
      <CommentModal open={modalOpen} close={closeModal}>
        <ButtonInModalWrap>
          <StHeader>댓글 갯수</StHeader>
          <Comment />
          <CommentInput />
        </ButtonInModalWrap>
      </CommentModal>
    </>
  );
};
export default CommentBox;

const ModalButton = styled.div`
  background-color: transparent;
  border: none;
`;

const ButtonInModalWrap = styled.div`
  ${flexColumn};
`;

const StHeader = styled.header`
  box-sizing: border-box;
  text-align: left;
  width: 100%;
  padding: 20px 0 10px 20px;
  font-weight: 800;
`;