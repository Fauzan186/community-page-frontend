import { combineReducers } from 'redux';
import commentsReducer from '../features/comments/commentsSlice';

const rootReducer = combineReducers({
  comments: commentsReducer,
});

export default rootReducer;
