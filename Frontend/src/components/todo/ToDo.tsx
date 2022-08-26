import { PropsWithChildren, useRef, useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import "./ToDo.css";
interface ToDoProps {
  completed?: boolean;
  onDelete?: () => void;
  onEdit?: (edited: string) => void;
  onCheck?: (checked: boolean) => void;
}

export const ToDo = (props: PropsWithChildren<ToDoProps>) => {
  const { completed, onDelete, onEdit, onCheck } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [editPopoverVisible, setEditPopoverVisible] = useState(false);
  const [confirmPopoverVisible, setConfirmPopoverVisible] = useState(false);

  const editPopover = (
    <Popover>
      <Popover.Header as="h3">Editar ToDo</Popover.Header>
      <Popover.Body className="edit-popover">
        <Form.Control
          type="text"
          defaultValue={
            typeof props.children === "string" ? props.children : ""
          }
          ref={inputRef}
        ></Form.Control>
        <Button
          onClick={() => {
            setEditPopoverVisible(false);
            onEdit && onEdit(inputRef.current!.value);
          }}
        >
          <i className="bi bi-save" />
        </Button>
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
        {props.children}
      </div>
      <div className="todo-button-container">
        <OverlayTrigger
          placement="top"
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
          placement="top"
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
