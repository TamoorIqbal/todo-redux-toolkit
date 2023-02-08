import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Add todo thunk
export const addTodo = createAsyncThunk("addTodo", async (item) => {
  try {
    if (!item) {
      alert("Please Enter todo");
    } else {
      let newTodo = {
        title: item,
        createdAt: new Date().toLocaleDateString(),
        status: "inQueue",
      };
      await addDoc(collection(db, "todos"), newTodo);
      // console.log(newTodo);
      return newTodo;
    }
  } catch (error) {
    console.log(error);
  }
});

// Get todo thunk
export const getTodo = createAsyncThunk("getTodo", async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "todos"));
    let todosList = [];
    querySnapshot.forEach((doc) => {
      todosList.push({
        title: doc.data().title,
        createdAt: doc.data().createdAt,
        id: doc.id,
        status: doc.data().status,
      });
    });

    return todosList;
  } catch (error) {
    console.log(error);
  }
});

// delete todo thunk
export const deleteTodo = createAsyncThunk("deleteTodo", async (item) => {
  try {
    await deleteDoc(doc(db, "todos", item.id));
    return item;
  } catch (error) {
    console.log(error);
  }
});
// update todo thunk
export const updateTodo = createAsyncThunk("updateTodo", async (item) => {
  try {
    console.log(item.title);
    await updateDoc(doc(db, "todos", item.id), {
      title: item.title,
      status: item.status,
    });
    return item;
  } catch (error) {
    console.log(error);
  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState: { todos: [], error: null },
  extraReducers: (builder) => {
    builder.addCase(addTodo.fulfilled, (state, action) => {
      let newState = {
        ...state,
        todos: [action.payload, ...state.todos],
      };
      return newState;
    });
    builder.addCase(getTodo.fulfilled, (state, action) => {
      let newState = {
        ...state,
        todos: action.payload,
      };
      return newState;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const todos = state.todos;
      const item = action.payload;
      let filteredTodos = todos.filter((todo) => item.id !== todo.id);
      let newState = {
        ...state,
        todos: filteredTodos,
      };
      return newState;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const todos = state.todos;
      const item = action.payload;
      let updatedItem = {
        title: item.title,
        createdAt: item.createdAt,
        status: item.status,
      };
      let updatedTodos = todos.map((todo) => {
        if (item.id == todo.id) {
          return updatedItem;
        } else {
          return todo;
        }
      });
      let newState = {
        ...state,
        todos: updatedTodos,
      };

      return newState;
    });
  },
});

export const {} = todoSlice.actions;
export default todoSlice.reducer;
