import { useReducer } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ActionTypes, ToDo } from "./MainCard.reducer";
import { ToDo as ToDoComponent } from "../todo/ToDo";
import { initialState, todoReducer } from "./MainCard.reducer";
import "./MainCard.css";

export const MainCard = () => {
  const [todosState, dispatch] = useReducer(todoReducer, initialState);

  const completeToDo = (todo: ToDo) => {
    dispatch({ type: ActionTypes.COMPLETE_TODO, payload: todo });
  };
  const unCompleteToDo = (todo: ToDo) => {
    dispatch({ type: ActionTypes.UNCOMPLETE_TODO, payload: todo });
  };

  const editToDo = (todo: ToDo, edited: string) => {
    console.log(edited);
  };

  const deleteToDo = (todo: ToDo) => {
    console.log(todo);
  };

  return (
    <div className="main-card">
      {/*-------- Header del card -------- */}
      <div className="header">
        <h1 className="text-center">TODO's</h1>
        <Form className="todo-add-form">
          <Form.Control type="text" placeholder="Añade un nuevo ToDo" />
          <Button>
            <i className="bi bi-plus-lg" />
          </Button>
        </Form>
      </div>
      {/*-------- TODOS outlet -------- */}
      <div className="todo-outlet">
        {todosState.todos.map((todo) => (
          <ToDoComponent
            key={todo.id}
            completed={todo.completed}
            onCheck={(check) =>
              check ? completeToDo(todo) : unCompleteToDo(todo)
            }
            onEdit={(edited) => editToDo(todo, edited)}
            onDelete={() => deleteToDo(todo)}
          >
            {todo.task}
          </ToDoComponent>
        ))}
      </div>
      {/*-------- Footer -------- */}
      <div className="footer">
        {`Tienes ${todosState.todosCount} tareas pendientes`}{" "}
        <Button variant="danger">Borrar Todo</Button>
      </div>
    </div>
  );
};
