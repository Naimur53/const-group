import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: true,
  postInfo: null,
  postLoad: false,
  getLoad: true,
  getFromDB: null,
  getAnnouncement: null,
  getHelp: null,
  getDiscussion: null,
  user: null,
  getMyPost: null,
  getMyLovedPost: null,
  profileToggle: false,
};

export const postIndb = createAsyncThunk(
  'postInfo/postIndb',
  async (info) => {
    const response = await axios.post('http://localhost:5000/userPost', info)
    return response.data
  }
)
export const getFromDB = createAsyncThunk(
  'getFromDb/getFromDB',
  async (info) => {
    console.log('getting');
    const response = await axios.get(`http://localhost:5000/userPost/${info}`)
    return response.data
  }
)
export const updateLove = createAsyncThunk(
  'getFromDB/updateLove',
  async (info) => {
    console.log('update', info);
    if (info.type === 'put') {
      const response = await axios.put(`http://localhost:5000/userPost/love`, info)
      return response.data
    }
    else {
      const response = await axios.delete(`http://localhost:5000/userPost/love`, { data: info })
      return response.data
    }

  }
)
export const sendComment = createAsyncThunk(
  'getFromDB/sendComment',
  async (info) => {
    console.log('getting');
    const response = await axios.put(`http://localhost:5000/userPost/comment`, info);
    return response.data
  }
)
export const deletePost = createAsyncThunk(
  'deletePost/postIndb',
  async (info) => {
    const response = await axios.delete(`http://localhost:5000/userPost/${info._id}`, { data: info })

    return response.data;
  }
)
export const deleteComment = createAsyncThunk(
  'deleteComment/postIndb',
  async (info) => {
    console.log(info, 'info');
    const response = await axios.put(`http://localhost:5000/userPost/deleteComment`, { data: info })

    return response.data;
  }
)
export const myPost = createAsyncThunk(
  'myPost/getMyPost',
  async (info) => {
    console.log(info, 'info');
    const response = await axios.get(`http://localhost:5000/${info.email}/${info.type}`)
    return { info, data: response.data };
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
    handleProfileToggle: (state, action) => {
      state.profileToggle = !state.profileToggle;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(postIndb.pending, (state, action) => {
        // Add user to the state array
        console.log('pending');
        state.postLoad = true;
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
        console.log('got the data');
        state.getLoad = false;
        state.getFromDB = action.payload;
        const pushData = action.payload[0]?.postIn;
        if (pushData === '/help') {
          state.getHelp = action.payload
        }
        else if (pushData === '/announcement') {
          state.getAnnouncement = action.payload
        }
        else if (pushData === '/discussion') {
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
        console.log('love the data');
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

        console.log(current(state.getFromDB));
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const pushData = action.payload.postIn;
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
        console.log(action.payload, 'comment deletitdfdf');
        const data = action.payload.data;
        console.log(data);
        const pushData = data.postIn;
        if (pushData === '/help') {
          state.getHelp = state.getHelp.filter(data => data._id !== action.payload._id)
          const index = state.getHelp.findIndex(sData => sData._id === data.postId)
          console.log(index);
          state.getHelp[index].comments = state.getHelp[index].comments.filter(sData => sData.time != data.time)
        }
        else if (pushData === '/announcement') {
          state.getAnnouncement = state.getAnnouncement.filter(data => data._id !== action.payload._id)
          const index = state.getAnnouncement.findIndex(sData => sData._id === data.postId)
          console.log(index);
          state.getAnnouncement[index].comments = state.getHelp[index].comments.filter(sData => sData.time != data.time)
        }
        else if (pushData === '/discussion') {
          state.getDiscussion = state.getDiscussion.filter(data => data._id !== action.payload._id)
          const index = state.getDiscussion.findIndex(sData => sData._id === data.postId)
          console.log(index);
          state.getDiscussion[index].comments = state.getHelp[index].comments.filter(sData => sData.time != data.time)
        }
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
  },
});

export const { login, logout, handleProfileToggle, setLoading } = dataSlice.actions;
export const selectData = (state) => state.data;


export default dataSlice.reducer;
