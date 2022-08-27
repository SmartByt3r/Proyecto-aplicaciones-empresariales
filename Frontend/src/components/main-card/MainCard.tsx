import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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

export const MainCard = () => {
  const [play] = useSound(require("../../sounds/coin.mp3"));
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [todosCount, setTodosCount] = useState(0);
  const navigation = useNavigate();
  const form = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: async (values) => {
      await createTodo({
        ...values,
        status: "TO-DO",
      });
      const newTodos = await getAllTodos();
      setTodos(newTodos);
      setTodosCount(newTodos.length);
      form.resetForm();
    },
  });

  useEffect(() => {
    getAllTodos().then((todos) => {
      setTodos(todos);
      setTodosCount(todos.length);
    });
  }, []);

  const completeToDo = async (todo: ToDo) => {
    play();
    await updateTodo(todo.ID, { status: "DONE" });
    const todos = await getAllTodos();
    setTodos(todos);
  };
  const unCompleteToDo = async (todo: ToDo) => {
    await updateTodo(todo.ID, { status: "TO-DO" });
    const todos = await getAllTodos();
    setTodos(todos);
  };

  const editToDo = async (todo: ToDo, title: string, description: string) => {
    await updateTodo(todo.ID, { title, description });
    const todos = await getAllTodos();
    setTodos(todos);
  };

  const deleteToDoHandler = async (todo: ToDo) => {
    await deleteTodo(todo.ID);
    const newTodos = await getAllTodos();
    console.log(newTodos);
    setTodos(newTodos);
    setTodosCount(newTodos.length);
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
        {todos.map((todo) => (
          <ToDoComponent
            key={todo.ID}
            completed={todo.status !== "TO-DO"}
            onCheck={(check) =>
              check ? completeToDo(todo) : unCompleteToDo(todo)
            }
            onEdit={(title, description) => editToDo(todo, title, description)}
            onDelete={() => deleteToDoHandler(todo)}
            description={todo.description}
            title={todo.title}
          />
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
