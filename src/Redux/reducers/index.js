import { combineReducers } from "redux";
import  { DELETE_ITEM, EDIT_ITEM, LAST_PAGE, LOADING, NEW_ITEM, NEXT_PAGE, RESET_FILTER, RESET_INDEX_OF_EDIT, RESET_OPTIONS, RESET_ORDER, RESET_PAGE, SET_FILTER, SET_HEADERS, SET_INDEX_OF_EDIT, SET_ITEMS, SET_ORDER, SET_PAGE } from "../consts.js";

const editItemReduce = (payload) =>
{
    return  (item,index) => index === payload.index ? {...item,...payload.changed} : {...item}
}
const deleteItemReduce = (payload) =>
{
    return element => element.Hauptartikelnr !== payload;
}

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
    const editItem = editItemReduce(action.payload);
    const deleteItem = deleteItemReduce(action.payload)

    if(action.type===SET_ITEMS) return action.payload;
    else if(action.type===NEW_ITEM) return [...state, action.payload];
    else if(action.type===EDIT_ITEM) return state.map(editItem);
    else if(action.type===DELETE_ITEM) return state.filter(deleteItem);
    else return state;
}

function headers(state=[],action)
{
    if(action.type===SET_HEADERS) return action.payload;
    else return state;
}

function indexOfEdit(state=-1,action)
{
    if(action.type === SET_INDEX_OF_EDIT) return action.payload;
    else if(action.type === RESET_INDEX_OF_EDIT) return -1;
    else return state;
}

const rootReducer=combineReducers(
{
    dummy,
    page,
    options,
    items,
    headers,
    indexOfEdit,

});
    
export default rootReducer;