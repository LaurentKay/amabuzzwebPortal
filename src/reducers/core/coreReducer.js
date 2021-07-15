// import initialState
import State from './initialState';
// initialState
const initialState = State;
// update core
export default function coreReducer (state = initialState, action) {
  switch (action.type) {
    // LOADER
    case 'LOADER': {
      // return state
      return {
        ...state,
        loader: action.data
      }
    }
    // NOTIFICATION
    case 'NOTIFICATION': {
      // return state
      return {
        ...state,
        notification: action.data
      };
    }
    default:
      return state
  }
}
