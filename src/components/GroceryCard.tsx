import React, { FormEvent } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import Modal from "./Modal";
import { ACTIONS, List, useReducer } from "../hooks/useReducer";

const GroceryCard = () => {
  const [state, dispatch] = useReducer();
  const [btn, setBtn] = React.useState(true);
  const [editIndex, setEditIndex] = React.useState(0);
  const [typeOfAction, setTypeOfAction] = React.useState("");

  const inputRef = React.useRef<HTMLInputElement>(null!);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (inputRef.current.value.trim() === "") {
      dispatch({ type: ACTIONS.NO_VALUE });
    } else if (typeOfAction === ACTIONS.EDIT_ITEM) {
      dispatch({
        type: ACTIONS.EDIT_ITEM,
        payload: { index: editIndex, value: inputRef.current.value },
      });
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        item: inputRef.current.value,
      };
      dispatch({ type: ACTIONS.ADD_ITEM, payload: newItem });
    }

    inputRef.current.value = "";
    setTypeOfAction("");
    setBtn(true);
  };

  const handleClick = (action: string, id: string) => {
    if (action === "edit") {
      setBtn(false);
      inputRef.current.focus();

      let foundItem = state.list.find((item: List) => item.id === id);
      let findIndex = -1;
      if (foundItem) {
        findIndex = state.list.indexOf(foundItem);
      }

      setEditIndex(findIndex);

      inputRef.current.value = state.list[findIndex].item;

      setTypeOfAction(ACTIONS.EDIT_ITEM);
    } else {
      dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id });
    }
  };

  React.useEffect(() => {
    let count = setTimeout(() => {
      dispatch({ type: ACTIONS.HIDE_MODAL });
    }, 1500);
    return () => clearTimeout(count);
  }, [state.showModal]);

  return (
    <main>
      {state.showModal && (
        <Modal message={state.modalContent} valid={state.valid} />
      )}
      <h1>Grocery Bud</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="eggs, milk...." ref={inputRef} />
        <button type="submit">{btn ? "Submit" : "Edit"}</button>
      </form>
      {state.list.map((item: List) => {
        return (
          <div key={item.id}>
            <p>{item.item}</p>
            <div>
              <BiEdit onClick={() => handleClick("edit", item.id)} />

              <BiTrash onClick={() => handleClick("remove", item.id)} />
            </div>
          </div>
        );
      })}
      {state.list.length !== 0 && (
        <button
          className="clean"
          onClick={() => dispatch({ type: ACTIONS.EMPTY_LIST })}
        >
          Clear Items
        </button>
      )}
    </main>
  );
};

export default GroceryCard;
