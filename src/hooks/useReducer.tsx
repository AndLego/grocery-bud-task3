import React from "react";

export interface List {
  id: string;
  item: string;
}

interface State {
  list: List[];
  showModal: boolean;
  valid: boolean;
  modalContent: string;
}

export const initialState: State = {
  list: [],
  showModal: false,
  valid: true,
  modalContent: "",
};

export enum ACTIONS {
  ADD_ITEM = "ADD_ITEM",
  EDIT_ITEM = "EDIT_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  NO_VALUE = "NO_VALUE",
  HIDE_MODAL = "HIDE_MODAL",
  EMPTY_LIST = "EMPTY_LIST",
}

type ActionsTypes =
  | { type: ACTIONS.ADD_ITEM; payload: List }
  | { type: ACTIONS.EDIT_ITEM; payload: { index: number; value: string } }
  | { type: ACTIONS.EMPTY_LIST }
  | { type: ACTIONS.HIDE_MODAL }
  | { type: ACTIONS.NO_VALUE }
  | { type: ACTIONS.REMOVE_ITEM; payload: string };

const reducer = (state: State, action: ActionsTypes) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      const newItem = [...state.list, action.payload];
      return {
        ...state,
        list: newItem,
        showModal: true,
        valid: true,
        modalContent: "item added to the list",
      };
    case ACTIONS.NO_VALUE:
      return {
        ...state,
        showModal: true,
        valid: false,
        modalContent: "please enter value",
      };
    case ACTIONS.HIDE_MODAL:
      return {
        ...state,
        showModal: false,
      };
    case ACTIONS.EDIT_ITEM:
      let itemIndex = action.payload.index;
      let newValue = action.payload.value;
      let editItem = state.list[itemIndex];

      editItem = { ...editItem, item: newValue };

      return {
        ...state,
        list: [
          ...state.list.slice(0, itemIndex),
          editItem,
          ...state.list.slice(itemIndex + 1),
        ],
        showModal: true,
        valid: true,
        modalContent: "value changed",
      };
    case ACTIONS.REMOVE_ITEM:
      const newList = state.list.filter((item) => item.id !== action.payload);
      return {
        ...state,
        list: newList,
        showModal: true,
        valid: false,
        modalContent: "item removed",
      };
    case ACTIONS.EMPTY_LIST:
      return {
        ...state,
        list: [],
        showModal: true,
        valid: false,
        modalContent: "empty list",
      };
    default:
      return state;
  }
};

export const useReducer = () => {
  const result = React.useReducer(reducer, initialState);

  return result;
};
