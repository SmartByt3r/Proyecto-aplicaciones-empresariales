import { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ToDo as ToDoComponent } from "../todo/ToDo";
import "./MainCard.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/login";
import {
  createTodo,
  getAllTodos,
  ToDo,
  updateTodo,
  deleteTodo,
} from "../../services/to-dos";
import { useFormik } from "formik";
import useSound from "use-sound";
import { AuthContext } from "../../context/auth.context";

export const MainCard = () => {
  const [play] = useSound(require("../../sounds/coin.mp3"));
  const { token, setToken } = useContext(AuthContext);
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [todosCount, setTodosCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();
  const form = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: async (values) => {
      await createTodo(
        {
          ...values,
          status: "TO-DO",
        },
        token
      );
      const newTodos = await getAllTodos(token);
      setTodos(newTodos);
      setTodosCount(todos.filter((t) => t.status === "TO-DO").length);
      form.resetForm();
    },
  });

  useEffect(() => {
    getAllTodos(token)
      .then((todos) => {
        setTodos(todos);
        setTodosCount(todos.length);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const completeToDo = async (todo: ToDo) => {
    play();
    await updateTodo(todo.ID, { status: "DONE" }, token);
    const todos = await getAllTodos(token);
    setTodos(todos);
    setTodosCount(todos.filter((t) => t.status === "TO-DO").length);
  };
  const unCompleteToDo = async (todo: ToDo) => {
    await updateTodo(todo.ID, { status: "TO-DO" }, token);
    const todos = await getAllTodos(token);
    setTodos(todos);
    setTodosCount(todos.filter((t) => t.status === "TO-DO").length);
  };

  const editToDo = async (todo: ToDo, title: string, description: string) => {
    await updateTodo(todo.ID, { title, description }, token);
    const todos = await getAllTodos(token);
    setTodos(todos);
  };

  const deleteToDoHandler = async (todo: ToDo) => {
    await deleteTodo(todo.ID, token);
    const newTodos = await getAllTodos(token);
    console.log(newTodos);
    setTodos(newTodos);
    setTodosCount(newTodos.filter((t) => t.status === "TO-DO").length);
  };

  return (
    <div className="main-card">
      {/*-------- Header del card -------- */}
      <div className="header">
        <h1 className="text-center">TODO's</h1>
        <Form className="todo-add-form" onSubmit={form.handleSubmit}>
          <Form.Control
            id="title"
            type="text"
            placeholder="Titulo"
            onChange={form.handleChange}
            value={form.values.title}
            required
          />
          <Form.Control
            id="description"
            type="text"
            placeholder="Descripcion"
            onChange={form.handleChange}
            value={form.values.description}
            required
          />
          <Button type="submit">
            <i className="bi bi-plus-lg" />
          </Button>
        </Form>
      </div>
      {/*-------- TODOS outlet -------- */}
      <div className="todo-outlet">
        {!loading ? (
          todos.map((todo) => (
            <ToDoComponent
              key={todo.ID}
              completed={todo.status !== "TO-DO"}
              onCheck={(check) =>
                check ? completeToDo(todo) : unCompleteToDo(todo)
              }
              onEdit={(title, description) =>
                editToDo(todo, title, description)
              }
              onDelete={() => deleteToDoHandler(todo)}
              description={todo.description}
              title={todo.title}
            />
          ))
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </div>
      {/*-------- Footer -------- */}
      <div className="footer">
        {`Tienes ${todosCount} tareas pendientes`}
        <Button
          variant="danger"
          onClick={() => {
            logout();
            setToken("");
            navigation("/login");
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};
