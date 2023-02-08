import UseTodos from "../../customHooks/UseTodos";

function Todos() {
  const {
    todoInput,
    setTodoInput,
    editInput,
    setEditInput,
    popup,
    setPopup,
    addTodoHandler,
    completeTodoHandler,
    updateTodoHandler,
    deleteTodoHandler,
    dispatch,
    updateTodo,
    todos,
    toast,
  } = UseTodos();
  return (
    <>
      <div className="todo">
        <div className="header">
          <h1>ToDo List</h1>
          <input
            type="text"
            className="todo-input"
            placeholder="Type a task"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button className="add-btn" onClick={addTodoHandler}>
            Add
          </button>
        </div>

        <div className="todo-list">
          <h3>List of tasks</h3>
          <p className="alert-info">The list is empty</p>

          <ul>
            {todos.map((item, index) => {
              return (
                <li
                  key={index}
                  className={item.status === "completed" ? "completed" : ""}
                >
                  {item.title}
                  <div>{item.createdAt}</div>
                  <div className="tools">
                    <button
                      className="complete"
                      onClick={() => completeTodoHandler(item)}
                    >
                      Complete
                    </button>
                    <button
                      className="edit"
                      onClick={() => updateTodoHandler(item)}
                    >
                      EDIT
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteTodoHandler(item)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {popup ? (
        <div className="popup">
          <h3>Edit task:</h3>
          <div className="popup-body">
            <p className="popup-info"></p>
            <input
              type="text"
              className="popup-input"
              placeholder="Edit your task"
              onChange={(e) =>
                setEditInput({ ...editInput, title: e.target.value })
              }
              value={editInput.title}
            />
            <button
              className="popup-btn accept"
              onClick={() => {
                dispatch(updateTodo(editInput));
                toast.success("Update Todo");
                setPopup(false);
              }}
            >
              Submit
            </button>
            <button
              className="popup-btn cancel"
              onClick={() => {
                setPopup(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Todos;
