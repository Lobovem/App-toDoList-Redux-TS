import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';
import { ITask } from '../types';

const initialState = {
  todoListState: JSON.parse(localStorage.getItem('tasks') || '') || [],
  inputState: '',
};

export const todoReducer = createSlice({
  name: 'todoList',
  initialState: initialState,
  reducers: {
    add_todo: (state, action) => {
      state.todoListState = [
        ...state.todoListState,
        {
          id: Math.random(),
          task: action.payload,
          complete: false,
          isEditing: false,
        },
      ];
    },

    handle_check: (state, action) => {
      state.todoListState = state.todoListState.map((todo:ITask) => (todo.id === action.payload.id ? { ...todo, complete: !todo.complete } : { ...todo }));
    },

    input_change: (state, action) => {
      state.inputState = action.payload;
    },

    set_change_edit_mode: (state, action) => {
      state.todoListState = state.todoListState.map((todo:ITask) => (todo.id === action.payload.id ? { ...todo, isEditing: !todo.isEditing } : { ...todo }));
    },
    edit_todo: (state, action) => {
      state.todoListState = state.todoListState.map((todo:ITask) => {
        if (todo.id === action.payload.myTask.id) {
          todo.task = action.payload.todoTitle;
        }
        return todo;
      });
    },

    delete_todo: (state, action) => {
      state.todoListState = state.todoListState.filter((todo:ITask) => todo.id !== action.payload.id);
    },
    delete_all_complete_todo: (state) => {
      state.todoListState = state.todoListState.filter((todo:ITask) => todo.complete !== true);
    },
  },
});

export const userInputSelector = (state:RootState) => state.todoList.inputState;
export const todoListSelector = (state:RootState) => state.todoList.todoListState;

export const { add_todo, handle_check, input_change, set_change_edit_mode, edit_todo, delete_todo, delete_all_complete_todo } = todoReducer.actions;
export default todoReducer.reducer;


