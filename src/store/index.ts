import { configureStore } from '@reduxjs/toolkit';
import { todoReducer } from './reducer';

export const store = configureStore({
  reducer: {
    todoList: todoReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// export type Appstore = typeof store;
// export type AppDispatch = typeof store.dispatch;