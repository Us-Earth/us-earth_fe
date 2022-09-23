import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { instance } from "../../api/axios";

const cookies = new Cookies();
const API_URL = process.env.REACT_APP_API_URL;

/* ----------------------------- 전체 그룹 모임 정보 출력 ----------------------------- */
export const __getCommunity = createAsyncThunk("usearth/__getCommunity", async (payload, thunkAPI) => {
  try {
    console.log('__getCommunity=>', payload);
    if (payload.page === '0' || payload.page === 0) {
      thunkAPI.dispatch(clearVal());
    }
    const data = await axios.get(`${API_URL}/community?page=${payload.page}&size=10`);
    console.log('전체커뮤니티=>', data);

    /* ---------------------------- 해당 페이지에 값이 있는지 확인 --------------------------- */
    if (data.data.content.length > 0) {
      thunkAPI.dispatch(hasMoreFn(true));
    } else {
      thunkAPI.dispatch(hasMoreFn(false));
    }

    return thunkAPI.fulfillWithValue({ data: data.data });
  } catch (error) {
    window.alert("전체 커뮤니티 정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

/* -------------------------------- 커뮤니티 상세보기 ------------------------------- */
export const __getCommunityDetail = createAsyncThunk("usearth/__getCommunityDetail", async (payload, thunkAPI) => {
  try {
    console.log('__getCommunityDetail=>', payload);
    const authorization_token = cookies.get("mycookie");
    const data = await axios.get(`${API_URL}/community/${payload.communityId}`, {
      headers: {
        Authorization: authorization_token
      },
    });
    console.log('상세커뮤니티=>', data);

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("커뮤니티 상세 정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

/* --------------------------- 커뮤니티 참여하기 버튼 눌렀을 때 --------------------------- */
export const __updateCommunityJoin = createAsyncThunk("usearth/__updateCommunityJoin", async (payload, thunkAPI) => {
  try {
    console.log('__updateCommunityJoin=>', payload);
    const authorization_token = cookies.get("mycookie");
    const data = await axios.patch(`${API_URL}/join/${payload.communityId}`, payload, {
      headers: {
        Authorization: authorization_token
      },
    });

    // thunkAPI.dispatch(__getCommunityDetail({ communityId: payload.communityId }))
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.log(error);
    // window.alert(error.response.data.msg);
    // thunkAPI.rejectWithValue(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

/* ------------------------------ 인증 게시글 목록 출력 ------------------------------ */
export const __getCommunityCertify = createAsyncThunk("usearth/__getCommunityCertify", async (payload, thunkAPI) => {
  try {
    console.log('__getCommunityCertify=>', payload);
    if (payload.page === '0' || payload.page === 0) {
      thunkAPI.dispatch(certifyReset());
    }
    const data = await axios.get(`${API_URL}/community/${payload.communityId}/proof?page=${payload.page}&size=3`);
    console.log('인증게시글=>', data);

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("인증 정보를 불러올 수 없습니다.");
    console.log(error);
    console.log(error.response.data.errorMessage);
    return;
  }
});

/* -------------------------------- 활발 그룹 출력 -------------------------------- */
export const __getPopularGroupItemList = createAsyncThunk("usearth/__getPopularGroupItemList", async (payload, thunkAPI) => {
  try {
    const data = await instance.get('/community/active');
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("활발 그룹 정보를 불러올 수 없습니다.");
    return thunkAPI.rejectWithValue(error.response.data.errorMessage);
  }
});

/* ------------------------------- 마감임박 그룹 출력 ------------------------------- */
export const __getNewGroupItemList = createAsyncThunk("usearth/__getNewGroupItemList", async (payload, thunkAPI) => {
  try {
    const data = await instance.get('/community/nearDone');
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    window.alert("마감임박 그룹 정보를 불러올 수 없습니다.");
    return thunkAPI.rejectWithValue(error.response.data.errorMessage);
  }
});

const initialState = {
  community: [],
  communityDetail: [],
  certify: [],
  popularGroupList: [],
  newGroupList: [],
  isLoading: false,
  error: [],
  statusCode: 0,
  hasMore: true,/* 무한스크롤 값이 더 있는지 확인 */
}

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    clearVal: (state) => { state.community = [] },
    certifyReset: (state) => { state.certify = [] },
    errorReset: (state) => { state.error = []; },
    hasMoreFn: (state, action) => { state.hasMore = action.payload; },
    ingVal: (state, action) => { console.log(action); console.log(action); console.log(action); console.log(action); console.log(action); /* state.community = []  */ }
  },
  extraReducers: {
    [__getCommunity.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getCommunity.fulfilled]: (state, action) => {
      console.log('action=>', action);
      console.log('action=>', action.payload.data.content);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.community = [...state.community, ...action.payload.data.content];
    },
    [__getCommunity.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__getCommunityDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [__getCommunityDetail.fulfilled]: (state, action) => {
      console.log('action=>', action);
      console.log('action=>', action.payload);
      state.isLoading = false;
      state.communityDetail = action.payload;
    },
    [__getCommunityDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getCommunityCertify.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getCommunityCertify.fulfilled]: (state, action) => {
      console.log('action=>', action);
      console.log('action=>', ...action.payload);
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.certify = [...state.certify, ...action.payload];
    },
    [__getCommunityCertify.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__getPopularGroupItemList.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getPopularGroupItemList.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.popularGroupList = action.payload;
    },
    [__getPopularGroupItemList.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
    [__getNewGroupItemList.pending]: (state) => {
      state.isLoading = true;
    },
    [__getNewGroupItemList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.newGroupList = action.payload;
    },
    [__getNewGroupItemList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__updateCommunityJoin.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateCommunityJoin.fulfilled]: (state, action) => {
      console.log('action===>', action);
      state.isLoading = false;
      state.statusCode = action.payload.status;
    },
    [__updateCommunityJoin.rejected]: (state, action) => {
      console.log("ERROR=>", action);
      state.isLoading = false;
      state.error = action.payload;
      state.statusCode = Number(action.payload.errorCode);

    }






  },
});

export const { clearVal, ingVal, certifyReset, errorReset, hasMoreFn } = communitySlice.actions;
export default communitySlice.reducer;