import { useFormik } from "formik";
import { PropsWithChildren, useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import "./ToDo.css";
interface ToDoProps {
  completed?: boolean;
  title: string;
  description: string;
  onDelete?: () => void;
  onEdit?: (title: string, description: string) => void;
  onCheck?: (checked: boolean) => void;
}

export const ToDo = (props: PropsWithChildren<ToDoProps>) => {
  const { completed, onDelete, onEdit, onCheck, description, title } = props;
  const [editPopoverVisible, setEditPopoverVisible] = useState(false);
  const [confirmPopoverVisible, setConfirmPopoverVisible] = useState(false);
  const form = useFormik({
    initialValues: {
      title: title,
      description: description,
    },
    onSubmit: (values) => {
      setEditPopoverVisible(false);
      onEdit && onEdit(values.title, values.description);
    },
  });

  const editPopover = (
    <Popover>
      <Popover.Header as="h3">Editar ToDo</Popover.Header>
      <Popover.Body>
        <Form onSubmit={form.handleSubmit} className="edit-popover">
          <Form.Control
            id="title"
            type="text"
            value={form.values.title}
            onChange={form.handleChange}
            placeholder="Titulo"
            onFocus={() => setEditPopoverVisible(true)}
          />
          <Form.Control
            id="description"
            type="text"
            value={form.values.description}
            onChange={form.handleChange}
            placeholder="Descripcion"
            onFocus={() => setEditPopoverVisible(true)}
          />
          <Button type="submit">
            <i className="bi bi-save" />
          </Button>
        </Form>
      </Popover.Body>
    </Popover>
  );

  const confirmDeletePopover = (
    <Popover>
      <Popover.Header as="h3">¿Esta seguro?</Popover.Header>
      <Popover.Body className="confirm-popover">
        <Button
          variant="success"
          onClick={() => {
            onDelete && onDelete();
            setConfirmPopoverVisible(false);
          }}
        >
          <i className="bi bi-check-lg" />
        </Button>
        <Button
          variant="danger"
          onClick={() => setConfirmPopoverVisible(false)}
        >
          <i className="bi bi-x-lg" />
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="to-do">
      <Form.Check
        type="checkbox"
        onChange={(e) => onCheck && onCheck(e.target.checked)}
      />

      <div
        className={completed ? "todo-content to-do-checked" : "todo-content"}
      >
        <h6>{title}</h6>
        {description}
      </div>

      <div className="todo-button-container">
        <OverlayTrigger
          placement="left"
          overlay={editPopover}
          show={editPopoverVisible}
        >
          <Button
            variant="outline-primary"
            onClick={() => setEditPopoverVisible((visible) => !visible)}
            onBlur={() => setEditPopoverVisible(false)}
          >
            <i className="bi bi-pencil" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="right"
          overlay={confirmDeletePopover}
          show={confirmPopoverVisible}
        >
          <Button
            variant="outline-danger"
            onClick={() => setConfirmPopoverVisible((visible) => !visible)}
            onBlur={() => setConfirmPopoverVisible(false)}
          >
            <i className="bi bi-trash" />
          </Button>
        </OverlayTrigger>
      </div>
    </div>
  );
};
