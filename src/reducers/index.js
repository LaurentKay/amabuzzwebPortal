// import redux
import { combineReducers } from 'redux';
// import core
import core from './core/coreReducer';
import { applicationReducer } from './core/applicationReducer';
/*
 * setup
 *
 * @const Main Reducers
 */
const Main = combineReducers({
  core,
  applicationReducer,
});

export default Main
