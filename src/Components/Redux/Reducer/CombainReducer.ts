
import { combineReducers } from 'redux'
import {Users ,Lists ,Choice , Layouts ,ImgRecent ,PreViewReducer ,AddListItem} from './Reducer'

const RootReducer = combineReducers({Users ,Lists ,Choice ,Layouts ,ImgRecent ,PreViewReducer ,AddListItem})

export default RootReducer