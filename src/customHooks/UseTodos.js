import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, getTodo, deleteTodo, updateTodo } from "../store/todoSlice";
import "../components/todos/Todos.css";
import { toast } from "react-toastify";

function UseTodos() {
  const [todoInput, setTodoInput] = useState("");
  const [editInput, setEditInput] = useState({});
  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.todoSlice.todos);

  const addTodoHandler = () => {
    // console.log(todoInput);
    dispatch(addTodo(todoInput));
    setTodoInput("");
    toast.success("Add Todo");
  };
  const completeTodoHandler = (item) => {
    dispatch(updateTodo({ ...item, status: "completed" }));
    toast.success("Complete Todo");
  };
  const updateTodoHandler = (item) => {
    {
      item.status === "completed"
        ? toast.success("Already Completed")
        : setPopup(true);
      setEditInput(item);
    }
  };
  const deleteTodoHandler = (item) => {
    // console.log(todoInput);
    dispatch(deleteTodo(item));
    toast.success("Delete Todo");
  };

  useEffect(() => {
    dispatch(getTodo());
  }, []);

  return {
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
  };
}

export default UseTodos;
