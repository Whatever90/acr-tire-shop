// initial state
const initialState = {
  user: null,
  url: null,
  photos: null,
  test: "TEST!"
}
// action type 
const LOGIN = 'LOGIN';
const URLSEND = 'URLSEND';
const GETUSER = 'GETUSER';
const GETPHOTOS = 'GETPHOTOS';
const SAVEPHOTOS = "SAVEPHOTOS";

// action creators
export const login = (user) => {
  return {
    type: LOGIN,
    payload: user
  };
};

export const getUser = (user) => {
  return {
    type: LOGIN,
    payload: user
  };
};

export const urlsend = (url) => {
  return {
    type: URLSEND,
    payload: url
  };
};

export const savePhotos = (photos) => {
  // console.log(photos);
  initialState.photos = photos
  return {
    type: SAVEPHOTOS,
    payload: photos
  };
};
export const getPhotos = () => {
  console.log("dsadasd", initialState.photos)
  // return {
  //   type: GETPHOTOS,
  //   payload: this.photos
  // };
  return initialState.photos;
};

// reducer
const reducer = (state = initialState, action) => {
  // const { type, payload } = action
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };

    case GETUSER:
      return { ...state, user: action.payload };

    case URLSEND:
      return { ...state, url: action.payload };
// Storing photos here:
    case SAVEPHOTOS:
      return { ...state, photos: action.payload };

    case GETPHOTOS:
      return { ...state, photos: action.payload };

    default: return state;
  }
}

export default reducer;