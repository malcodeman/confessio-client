import { combineReducers } from "redux";

import posts from "../../features/posts/reducers/postsReducers";
import users from "../../features/users/reducers/usersReducers";
import settings from "../../features/settings/reducers/settingsReducers";

const rootReducer = combineReducers({
  posts,
  users,
  settings
});

export default rootReducer;
