import { DELETE_ITEM, EDIT_ITEM, LAST_PAGE, NEW_ITEM, NEXT_PAGE, RESET_FILTER, RESET_INDEX_OF_EDIT, RESET_OPTIONS, RESET_ORDER, RESET_PAGE, SET_FILTER, SET_HEADERS, SET_INDEX_OF_EDIT, SET_ITEMS, SET_ORDER, SET_PAGE } from "../consts";


/* PAGE */
export function action_Next_page()
{
    return {type:NEXT_PAGE}
}
export function action_Last_page()
{
    return {type:LAST_PAGE}
}
export function action_Set_page(payload)
{
    return {type:SET_PAGE,payload}
}
export function action_Reset_page()
{
    return {type:RESET_PAGE}
}
/* PAGE */

/* OPTIONS */

export function action_Set_filter(payload)
{
    return {type:SET_FILTER,payload}
}
export function action_Reset_filter()
{
    return {type:RESET_FILTER}
}
export function action_Set_order(payload)
{
    return {type:SET_ORDER,payload}
}
export function action_Reset_order()
{
    return {type:RESET_ORDER}
}
export function action_Reset_Options()
{
    return {type:RESET_OPTIONS}
}

/* OPTIONS */

/* ITEMS */

export function action_Set_items(payload)
{
    return {type:SET_ITEMS,payload}
}
export function action_New_item(payload)
{
    return {type:NEW_ITEM,payload}
}
export function action_Edit_item(payload)
{
    return {type:EDIT_ITEM,payload}
}
export function action_Delete_item(payload)
{
    return {type:DELETE_ITEM,payload}
}


export function action_Set_index_edit(payload)
{
    return {type:SET_INDEX_OF_EDIT,payload}
}
export function action_Reset_index_edit()
{
    return {type:RESET_INDEX_OF_EDIT}
}
export function action_Set_headers(payload)
{
    console.log(payload)
    return {type:SET_HEADERS,payload}
}
/* ITEMS */