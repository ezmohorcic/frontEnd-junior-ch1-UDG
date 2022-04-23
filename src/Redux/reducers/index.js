import { combineReducers } from "redux";
import  { LAST_PAGE, LOADING, NEXT_PAGE, RESET_FILTER, RESET_OPTIONS, RESET_ORDER, RESET_PAGE, SET_FILTER, SET_HEADERS, SET_ITEMS, SET_ORDER, SET_PAGE } from "../Consts.js";

function dummy(state={},action)
{
    if(action.type==="DUMMY"){return action.payload;}
    else return state
}

function page(state=0,action)
{
    if(action.type===NEXT_PAGE) return state+1;
    else if(action.type===LAST_PAGE) return state-1;
    else if(action.type===SET_PAGE) return action.payload;
    else if(action.type===RESET_PAGE) return 1;
    else return state;
}

function options(state={filter:"",order:{}},action)
{
    if(action.type===SET_FILTER) return {...state,filter:action.payload};
    else if(action.type===RESET_FILTER) return {...state,filter:""};
    else if(action.type===SET_ORDER) return {...state,order:{...state.order,[action.payload.key]:action.payload.value}};
    else if(action.type===RESET_ORDER) return {...state,order:{} };
    else if(action.type===RESET_OPTIONS) return {filter:"",order:{}};
    else return state;
}

function items(state={items:[],status:LOADING},action)
{
    if(action.type===SET_ITEMS) return action.payload;
    else if(action.type===LAST_PAGE) return state-1;
    else if(action.type===SET_PAGE) return action.payload;
    else if(action.type===RESET_PAGE) return 1;
    else return state;
}

function headers(state=[],action)
{
    if(action.type===SET_HEADERS) return action.payload;
    else return state;
}

const rootReducer=combineReducers(
{
    dummy,
    page,
    options,
    items,
    headers

});
    
export default rootReducer;