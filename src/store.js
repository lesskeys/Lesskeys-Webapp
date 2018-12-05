import { createStore, combineReducers } from 'redux'
import userReducer from './reducers/user-reducer'
import userListReducer from './reducers/user-list-reducer'

const reducers = combineReducers({
  userReducer: userReducer,
  userListReducer: userListReducer,
})

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store