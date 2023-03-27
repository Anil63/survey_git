
import { combineReducers } from 'redux'
import {Users ,Lists ,Choice , Layouts ,ImgRecent ,PreViewReducer} from './Reducer'

const RootReducer = combineReducers({Users ,Lists ,Choice ,Layouts ,ImgRecent ,PreViewReducer})

export default RootReducer