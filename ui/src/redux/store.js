import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as user from "./reducers/user";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  userLogin: user.login,
  userRegister: user.register,
  userList: user.list,
  userDelete: user.deleteSingle,
  userDetails: user.userDetailsReducer,
  userUpdate: user.userUpdateReducer,
});

const middleware = [thunk];

const userInfoFromStorage = sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
