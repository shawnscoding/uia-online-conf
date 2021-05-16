import { combineReducers } from "redux";
// import auth from "./auth/reducer";
import conference from "./conference/reducer";
import opener from "./opener/openerReducer";
import loader from "./loader/loaderReducer";

const rootReducer = combineReducers({
  // auth,
  conference,
  opener,
  loader,
});

export default rootReducer;
