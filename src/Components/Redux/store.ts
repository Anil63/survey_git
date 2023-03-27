import {createStore} from 'redux'
import RootReducer from './Reducer/CombainReducer'

 const store = createStore(RootReducer)

 export default store