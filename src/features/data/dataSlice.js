import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: true,
  postInfo: null,
  postLoad: false,
  getLoad: true,
  getFromDB: null,
  admin: false,
  getAnnouncement: null,
  getHelp: null,
  user: null,
  getMyPost: null,
  getMyLovedPost: null,
  profileToggle: false,
  groups: [],
  currentGroups: [],
  canAccess: false,
  gpInfo: {},
};

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
    const response = await axios.put(`http://localhost:5000/user`, info);
    return response.data
  }
)
export const userAdmin = createAsyncThunk(
  'userAdmin/user',
  async (info) => {
    console.log('getting');
    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/user/makeAdmin`, info);
    return response.data
  }
)
export const isAdmin = createAsyncThunk(
  'isAdmin/user',
  async (info) => {
    console.log('getting');
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
    console.log('getting');
    const response = await axios.get(`http://localhost:5000/userPost?gpId=${info.gpId}&postIn=${info.postIn}`)
    return response.data
  }
)
export const updateLove = createAsyncThunk(
  'getFromDB/updateLove',
  async (info) => {
    console.log('update', info);
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
    console.log('getting');
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
    console.log(info, 'info');
    const response = await axios.put(`https://warm-dusk-65209.herokuapp.com/userPost/deleteComment`, { data: info })

    return response.data;
  }
)
export const myPost = createAsyncThunk(
  'myPost/getMyPost',
  async (info) => {
    console.log(info, 'info');
    const response = await axios.get(`https://warm-dusk-65209.herokuapp.com/${info.email}/${info.type}`)
    return { info, data: response.data };
  }
)
export const createGroup = createAsyncThunk(
  'data/createGroup',
  async (info) => {
    const response = await axios.post(`http://localhost:5000/createGroup`, info)
    return response.data;
  }
)
export const allGroup = createAsyncThunk(
  'data/allGroup',
  async (info) => {
    const response = await axios.get(`http://localhost:5000/allGroup`, info)
    return response.data;
  }
)
export const getGroupInfo = createAsyncThunk(
  'data/getGroupInfo',
  async (info) => {
    const response = await axios.get(`http://localhost:5000/group/${info._id}`)
    return response.data;
  }
)
export const addUserToGroup = createAsyncThunk(
  'data/addUserToGroup',
  async (info) => {
    const response = await axios.put(`http://localhost:5000/addUserToGroup/`, info);
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
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(userAdmin.fulfilled, (state, action) => {
        console.log('hmmm');
      })
      .addCase(postIndb.pending, (state, action) => {
        // Add user to the state array
        console.log('pending');
        state.postLoad = true;
      })
      .addCase(isAdmin.pending, (state, action) => {

        state.loading = true;
      })
      .addCase(isAdmin.fulfilled, (state, action) => {
        state.admin = action.payload.admin;
        state.loading = false;
      })
      .addCase(postIndb.fulfilled, (state, action) => {
        // Add user to the state array
        console.log('done');
        state.postLoad = false;
        state.postInfo = action.payload;

      })
      .addCase(postIndb.rejected, (state, action) => {
        // Add user to the state array
        console.log('reject');
        state.postLoad = false;
        state.postInfo = false
      })
      .addCase(getFromDB.pending, (state, action) => {
        // Add user to the state array
        console.log('got the data');
        state.getLoad = true;;
      })
      .addCase(getFromDB.fulfilled, (state, action) => {
        // Add user to the state array 
        state.getLoad = false;
        state.getFromDB = action.payload;
        const pushData = action.payload[0]?.postIn?.split('/')[2];
        if (pushData === 'help') {
          state.getHelp = action.payload
        }
        else if (pushData === 'announcement') {
          state.getAnnouncement = action.payload
        }
        else if (pushData === 'discussion') {
          state.getDiscussion = action.payload
        }
      })
      .addCase(getFromDB.rejected, (state, action) => {
        // Add user to the state array
        console.log('reject getting the data');
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
        // Add user to the state array
        console.log('comment the data', action.payload);
        console.log('comment the data', state.getFromDB);
        const pushData = action.payload?.postIn;
        console.log(pushData);
        if (pushData === '/help') {
          const thatPost = state.getHelp.filter(p => p._id === action.payload.postId)
          thatPost[0].comments.push(action.payload);
        }
        else if (pushData === '/announcement') {
          const thatPost = state.getAnnouncement.filter(p => p._id === action.payload.postId)
          thatPost[0].comments.push(action.payload);
        }
        else if (pushData === '/discussion') {
          const thatPost = state.getDiscussion.filter(p => p._id === action.payload.postId)
          thatPost[0].comments.push(action.payload);
        }
        state.postLoad = false;

      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const pushData = action.payload.postIn;
        console.log(pushData);
        console.log('deleteDone', action.payload);

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
        console.log('pending');
        state.getLoad = true;
      })
      .addCase(myPost.fulfilled, (state, action) => {
        // Add user to the state array
        console.log(action.payload);
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
        console.log(action.payload);
      })
      .addCase(allGroup.fulfilled, (state, action) => {
        console.log(action.payload);
        state.groups = action.payload;
      })
      .addCase(getGroupInfo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.gpInfo = action.payload;
      })
      .addCase(addUserToGroup.pending, (state, action) => {
        state.postLoad = true;
      })
      .addCase(addUserToGroup.fulfilled, (state, action) => {
        state.postLoad = false;
        state.gpInfo.members.push(action.payload.user)
      })
      .addCase(addUserToGroup.rejected, (state, action) => {
        state.postLoad = false;
      })
  },
});

export const { login, logout, handleProfileToggle, resetState, setGpInfo, setLoading } = dataSlice.actions;
export const selectData = (state) => state.data;


export default dataSlice.reducer;
