import { createSlice } from '@reduxjs/toolkit';
import { users } from '../data/users'

export const loginSlice = createSlice({
  name: 'loginReducer',
  initialState: {
    userIsAuth: false,
    loginModal: false,
    postModal: false,
    userLogin: null,
    userRole: 'guest',
    loading: true,
    refreshedPost: true,
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    loginModalChange: state => {
      state.loginModal = !state.loginModal
    },
    createPostModal: state => {
      state.postModal = !state.postModal
    },
    userAuthStatus: (state, action) => {
      state.userIsAuth = action.payload
    },
    setUserLogin: (state, action) => {
      state.userLogin = action.payload
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload
    },
    disableLoading: state => {
      state.loading = false
    },
    getRefreshedPost: state => {
      state.refreshedPost = !state.refreshedPost
    }
  }
});

export const {
  loginModalChange,
  userAuthStatus,
  setUserLogin,
  setUserRole,
  disableLoading,
  createPostModal,
  getRefreshedPost
} = loginSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
export const initialAuth = id => dispatch => { 
  let data = users.filter(e => e.id === id)
  dispatch(setUserRole(data[0].role))
  dispatch(setUserLogin(data[0].login))
  dispatch(userAuthStatus(true))
  dispatch(disableLoading())
}

export const deletePost = id => dispatch => {
  fetch(`http://localhost:8080/posts/${id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      dispatch(getRefreshedPost())
    })
}

export const approvePost = (name, img, post_text, date, id) => dispatch => {
  let data = {
    name,
    approved: true,
    img,
    post_text,
    date,
  }
  fetch(`http://localhost:8080/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      dispatch(getRefreshedPost())
    })
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = state => state.loginReducer.value;

export const selectLoading = state => state.loginReducer.loading;
export const selectRefreshedPost = state => state.loginReducer.refreshedPost;
export const selectUserLogin = state => state.loginReducer.userLogin;
export const selectUserRole = state => state.loginReducer.userRole;
export const selectUserIsAuth = state => state.loginReducer.userIsAuth;
export const selectLoginModal = state => state.loginReducer.loginModal;
export const selectPostModal = state => state.loginReducer.postModal;

export default loginSlice.reducer;
