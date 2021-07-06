import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
// modules
import user from "./modules/user";

//export history
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: user,
  // post: Post,
  // image: Image,
  router: connectRouter(history),
});

//init middleware
const middlewares = [thunk.withExtraArgument({history: history})];

//middleware; use logger in dev.env
const env = process.env.NODE_ENV;
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

//redux devTools
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// export store
let store = (initialStore) => createStore(rootReducer, enhancer);
export default store();