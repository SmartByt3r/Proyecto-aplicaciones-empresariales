import { Reducer } from "react";

export interface ToDo {
  id: number;
  task: string;
  completed: boolean;
}

interface State {
  todos: ToDo[];
  todosCount: number;
}

export const initialState: State = {
  todos: [],
  todosCount: 0,
};

export enum ActionTypes {
  ADD_TODO = "ADD_TODO",
  COMPLETE_TODO = "COMPLETE_TODO",
  UNCOMPLETE_TODO = "UNCOMPLETE_TODO",
  DELETE_TODO = "DELETE_TODO",
  EDIT_TODO = "EDIT_TODO",
}

interface Action {
  type: ActionTypes;
  payload: ToDo;
}

export const todoReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case ActionTypes.ADD_TODO:
      return {
        todos: [...state.todos, action.payload],
        todosCount: state.todosCount + 1,
      };

    case ActionTypes.COMPLETE_TODO: {
      const todos = [...state.todos];
      const todo = todos.find((t) => t.id === action.payload.id) as ToDo;
      const todoCompleted = { ...todo, completed: true };
      todos[todos.indexOf(todo)] = todoCompleted;
      return {
        todos,
        todosCount: state.todosCount - 1,
      };
    }
    case ActionTypes.UNCOMPLETE_TODO: {
      const todos = [...state.todos];
      const todo = todos.find((t) => t.id === action.payload.id) as ToDo;
      const todoCompleted = { ...todo, completed: false };
      todos[todos.indexOf(todo)] = todoCompleted;
      return {
        todos,
        todosCount: state.todosCount + 1,
      };
    }
  }
};
