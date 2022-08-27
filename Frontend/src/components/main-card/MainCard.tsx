import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ToDo as ToDoComponent } from "../todo/ToDo";
import "./MainCard.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/login";
import { getAllTodos, ToDo } from "../../services/to-dos";

export const MainCard = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [todosCount, setTodosCount] = useState(0);
  const navigation = useNavigate();

  useEffect(() => {
    getAllTodos().then((todos) => {
      setTodos(todos);
      setTodosCount(todos.length);
    });
  }, []);

  const completeToDo = (todo: ToDo) => {};
  const unCompleteToDo = (todo: ToDo) => {};

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
        {todos.map((todo) => (
          <ToDoComponent
            key={todo.ID}
            completed={todo.status !== "TO-DO"}
            onCheck={(check) =>
              check ? completeToDo(todo) : unCompleteToDo(todo)
            }
            onEdit={(edited) => editToDo(todo, edited)}
            onDelete={() => deleteToDo(todo)}
            description={todo.description}
            title={todo.title}
          ></ToDoComponent>
        ))}
      </div>
      {/*-------- Footer -------- */}
      <div className="footer">
        {`Tienes ${todosCount} tareas pendientes`}
        <Button
          variant="danger"
          onClick={() => {
            logout();
            navigation("/login");
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};
