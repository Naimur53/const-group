import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { initializeAppAuthentication } from './../../Components/firebase/firebase.init'

const initialState = {
  loading: true,
  postInfo: null,
  postLoad: false,
  getLoad: true,
  getFromDB: null,
  admin: false,
  getAnnouncement: [],
  getHelp: [],
  getDiscussion: [],
  user: null,
  getMyPost: null,
  getMyLovedPost: null,
  profileToggle: false,
  groups: [],
  currentGroups: [],
  canAccess: false,
  gpInfo: {},
  isGpAdmin: false,
  notification: [],
};
initializeAppAuthentication();
export const saveUserToDb = createAsyncThunk(
  'saveUserToDb/user',
  async (info) => {
    const response = await axios.post(`https://warm-dusk-65209.herokuapp.com/user`, info);
    return response.data
  }
)
export const putUserToDb = createAsyncThunk(
  'data/putUserToDb',
  async (info) => {
    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/user`, info);
    return response.data
  }
)
export const userAdmin = createAsyncThunk(
  'userAdmin/user',
  async (info) => {

    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/user/makeAdmin`, info);
    return response.data
  }
)
export const isAdmin = createAsyncThunk(
  'isAdmin/user',
  async (info) => {

    const response = await axios.get(`https://warm-dusk-65209.herokuapp.com/user/${info.email}`);
    return response.data
  }
)

export const postIndb = createAsyncThunk(
  'postInfo/postIndb',
  async (info) => {
    const response = await axios.post('https://warm-dusk-65209.herokuapp.com/userPost', info)
    return response.data
  }
)
export const getFromDB = createAsyncThunk(
  'data/getFromDB',
  async (info) => {
    const response = await axios.get(`https://warm-dusk-65209.herokuapp.com/userPost?gpId=${info.gpId}&postIn=${info.postIn}&skip=${info.skip}`)
    return response.data
  }
)
export const updateLove = createAsyncThunk(
  'getFromDB/updateLove',
  async (info) => {

    if (info.type === 'put') {
      const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/userPost/love`, info)
      return response.data
    }
    else {
      const response = await axios.delete(`https://warm-dusk-65209.herokuapp.com/userPost/love`, { data: info })
      return response.data
    }

  }
)
export const sendComment = createAsyncThunk(
  'getFromDB/sendComment',
  async (info) => {

    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/userPost/comment`, info);
    return response.data
  }
)
export const deletePost = createAsyncThunk(
  'deletePost/postIndb',
  async (info) => {
    const response = await axios.delete(`https://warm-dusk-65209.herokuapp.com/userPost/${info._id}`, { data: info });

    return response.data;
  }
)
export const deleteComment = createAsyncThunk(
  'deleteComment/postIndb',
  async (info) => {

    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/userPost/deleteComment`, { data: info })

    return response.data;
  }
)
export const myPost = createAsyncThunk(
  'myPost/getMyPost',
  async (info) => {

    const response = await axios.get(`https://warm-dusk-65209.herokuapp.com/${info.email}/${info.type}`)
    return { info, data: response.data };
  }
)
export const createGroup = createAsyncThunk(
  'data/createGroup',
  async (info) => {
    const response = await axios.post(`https://warm-dusk-65209.herokuapp.com/createGroup`, info)
    return response.data;
  }
)
export const allGroup = createAsyncThunk(
  'data/allGroup',
  async (info) => {
    const response = await axios.get(`https://warm-dusk-65209.herokuapp.com/allGroup`, info)
    return response.data;
  }
)
export const getGroupInfo = createAsyncThunk(
  'data/getGroupInfo',
  async (info) => {
    const response = await axios.get(`https://warm-dusk-65209.herokuapp.com/group/${info._id}`)
    return response.data;
  }
)
export const addUserToGroup = createAsyncThunk(
  'data/addUserToGroup',
  async (info) => {
    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/addUserToGroup`, info);
    return response.data;
  }
)
export const removeUserFromGroup = createAsyncThunk(
  'data/removeUserFromGroup',
  async (info) => {
    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/removeUserFromGroup`, info);
    return response.data;
  }
)
export const makeGroupAdmin = createAsyncThunk(
  'data/makeGroupAdmin',
  async (info) => {
    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/makeGroupAdmin`, info);
    return response.data;
  }
)
export const removeAdminOfGroup = createAsyncThunk(
  'data/removeAdminOfGroup',
  async (info) => {
    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/removeAdminOfGroup`, info);
    return response.data;
  }
)
export const sendRequest = createAsyncThunk(
  'data/sendRequest',
  async (info) => {
    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/sendRequest`, info);
    return response.data;
  }
)
export const cancelRequest = createAsyncThunk(
  'data/cancelRequest',
  async (info) => {
    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/cancelRequest`, info);
    return response.data;
  }
)
export const acceptRequest = createAsyncThunk(
  'data/acceptRequest',
  async (info) => {
    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/acceptRequest`, info);
    return response.data;
  }
)
export const deleteGroup = createAsyncThunk(
  'data/deleteGroup',
  async (info) => {
    const response = await axios.delete(`https://warm-dusk-65209.herokuapp.com/deleteGroup/${info.gpId}`);
    return response.data;
  }
)
export const sendNotification = createAsyncThunk(
  'data/sendNotification',
  async (info) => {
    console.log(info);
    const response = await axios.post(`http://localhost:5000/notification`, info);
    return response.data;
  }
)
export const cancelNotification = createAsyncThunk(
  'data/cancelNotification',
  async (info) => {
    console.log(info);
    const response = await axios.delete(`http://localhost:5000/notification`, { data: info });
    return response.data;
  }
)
export const getNotification = createAsyncThunk(
  'data/getNotification',
  async (info) => {
    const response = await axios(`http://localhost:5000/notification/${info.email}`);
    return response.data;
  }
)


export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state, action) => {
      state.user = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPostLoad: (state, action) => {
      state.postLoad = action.payload;
    },
    setGpInfo: (state, action) => {
      state.gpInfo = action.payload;
    },
    handleProfileToggle: (state, action) => {
      state.profileToggle = !state.profileToggle;
    },
    resetState: (state, action) => {
      state.getAnnouncement = [];
      state.getHelp = [];
      state.getDiscussion = [];
      state.isGpAdmin = false;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(userAdmin.fulfilled, (state, action) => {

      })
      .addCase(isAdmin.pending, (state, action) => {

        state.loading = true;
      })
      .addCase(isAdmin.fulfilled, (state, action) => {
        state.admin = action.payload.admin;
        state.loading = false;
      })
      .addCase(postIndb.pending, (state, action) => {
        // Add user to the state array 
        state.postLoad = true;
      })
      .addCase(postIndb.fulfilled, (state, action) => {
        // Add user to the state array

        state.postLoad = false;
        const pushData = action.payload?.postIn?.split('/')[2];
        console.log(pushData, action.payload);
        if (pushData === 'help') {
          state.getHelp = [action.payload, ...state.getHelp]
        }
        else if (pushData === 'announcement') {
          state.getAnnouncement = [action.payload, ...state.getAnnouncement]
        }
        else if (pushData === 'discussion') {
          state.getDiscussion = [action.payload, ...state.getDiscussion]
        }

      })
      .addCase(postIndb.rejected, (state, action) => {
        // Add user to the state array

        state.postLoad = false;
        state.postInfo = false
      })
      .addCase(getFromDB.pending, (state, action) => {
        // Add user to the state array

        state.getLoad = true;;
      })
      .addCase(getFromDB.fulfilled, (state, action) => {
        // Add user to the state array 
        state.getLoad = false;
        state.getFromDB = action.payload;
        const pushData = action.payload[0]?.postIn?.split('/')[2];
        if (pushData === 'help') {
          state.getHelp = [...state.getHelp, ...action.payload]
        }
        else if (pushData === 'announcement') {
          state.getAnnouncement = action.payload
        }
        else if (pushData === 'discussion') {
          state.getDiscussion = [...state.getDiscussion, ...action.payload]
        }
      })
      .addCase(getFromDB.rejected, (state, action) => {

        state.getLoad = false;
        state.getFromDB = false;
      })

      .addCase(updateLove.fulfilled, (state, action) => {
        // Add user to the state array 
      })
      .addCase(sendComment.pending, (state, action) => {
        state.postLoad = true;
      })
      .addCase(sendComment.fulfilled, (state, action) => {

        const pushData = action.payload?.postIn?.split('/')[2];
        if (pushData === 'help') {
          const thatPost = state.getHelp.filter(p => p._id === action.payload.postId)
          thatPost[0].comments.push(action.payload);
        }
        else if (pushData === 'announcement') {
          const thatPost = state.getAnnouncement.filter(p => p._id === action.payload.postId)
          thatPost[0].comments.push(action.payload);
        }
        else if (pushData === 'discussion') {
          const thatPost = state.getDiscussion.filter(p => p._id === action.payload.postId)
          thatPost[0].comments.push(action.payload);
        }
        state.postLoad = false;

      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const pushData = action.payload.postIn;



        if (pushData === '/help' && state.getHelp !== null) {
          state.getHelp = state.getHelp.filter(data => data._id !== action.payload._id)
        }
        else if (pushData === '/announcement' && state.getAnnouncement !== null) {
          state.getAnnouncement = state.getAnnouncement.filter(data => data._id !== action.payload._id)
        }
        else if (pushData === '/discussion' && state.getDiscussion !== null) {
          state.getDiscussion = state.getDiscussion.filter(data => data._id !== action.payload._id)
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {

      })
      .addCase(myPost.pending, (state, action) => {
        // Add user to the state array

        state.getLoad = true;
      })
      .addCase(myPost.fulfilled, (state, action) => {
        // Add user to the state array

        const type = action.payload?.info?.type;
        if (type === 'myPost') {
          state.getMyPost = action.payload?.data;
        }
        else if (type === 'loved') {
          state.getMyLovedPost = action.payload?.data;
        }
        state.getLoad = false;
      })
      .addCase(createGroup.fulfilled, (state, action) => {

      })
      .addCase(allGroup.fulfilled, (state, action) => {

        state.groups = action.payload;
      })
      .addCase(getGroupInfo.fulfilled, (state, action) => {

        state.gpInfo = action.payload;
        state.isGpAdmin = Boolean(state?.gpInfo?.admin.filter(sAdmin => sAdmin.email === state?.user?.email).length);
      })
      .addCase(addUserToGroup.pending, (state, action) => {
        state.postLoad = true;
        state.isGpAdmin = false;
      })
      .addCase(addUserToGroup.fulfilled, (state, action) => {
        state.postLoad = false;
        state.isGpAdmin = false;
        state.gpInfo.members.push(action.payload.user)
      })
      .addCase(addUserToGroup.rejected, (state, action) => {
        state.postLoad = false;
      })
      .addCase(makeGroupAdmin.pending, (state, action) => {
        state.postLoad = true;
      })
      .addCase(makeGroupAdmin.fulfilled, (state, action) => {
        state.postLoad = false;
        state.gpInfo.admin.push(action.payload.user)
      })
      .addCase(makeGroupAdmin.rejected, (state, action) => {
        state.postLoad = false;
      })
      .addCase(removeUserFromGroup.pending, (state, action) => {
        state.postLoad = true;
      })
      .addCase(removeUserFromGroup.fulfilled, (state, action) => {
        state.postLoad = false;
        state.gpInfo.members = state.gpInfo.members.filter(sUser => sUser.email !== action.payload?.user?.email)
      })
      .addCase(removeUserFromGroup.rejected, (state, action) => {
        state.postLoad = false;
      })
      .addCase(removeAdminOfGroup.pending, (state, action) => {
        state.postLoad = true;
      })
      .addCase(removeAdminOfGroup.fulfilled, (state, action) => {
        state.postLoad = false;
        state.gpInfo.admin = state.gpInfo.admin.filter(sUser => sUser.email !== action.payload?.user?.email)
      })
      .addCase(removeAdminOfGroup.rejected, (state, action) => {
        state.postLoad = false;
      })
      .addCase(sendRequest.pending, (state, action) => {
        state.postLoad = true;

      })
      .addCase(sendRequest.fulfilled, (state, action) => {
        state.postLoad = false;
        state.groups.filter(sGroup => sGroup._id === action.payload?.gpId)[0].memberRequest.push(action.payload.user)
      })
      .addCase(sendRequest.rejected, (state, action) => {
        state.postLoad = false;
      })
      .addCase(cancelRequest.pending, (state, action) => {
        state.postLoad = true;

      })
      .addCase(cancelRequest.fulfilled, (state, action) => {
        state.postLoad = false;
        if (action.payload.deleteRequest) {
          state.gpInfo.memberRequest = state.gpInfo.memberRequest?.filter(mem => mem.email !== action.payload.user.email)
        } else {
          state.groups.filter(sGroup => sGroup._id === action.payload?.gpId)[0].memberRequest = state.groups.filter(sGroup => sGroup._id === action.payload?.gpId)[0].memberRequest.filter(req => req.email !== action.payload.user.email)
        }
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.postLoad = false;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter(gp => gp._id !== action.payload._id);
        state.gpInfo = {};
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.notification = action.payload;
      })
  },
});

export const { login, logout, handleProfileToggle, resetState, setGpInfo, setLoading, processGpAdmin, setPostLoad } = dataSlice.actions;
export const selectData = (state) => state.data;


export default dataSlice.reducer;
