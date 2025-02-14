import { type TodoItem } from "@/app/page";

interface ListItemProps {
  todoItem: TodoItem;
  onClick: () => void;
}

const ListItem = ({ todoItem, onClick }: ListItemProps) => {
  return (
    <li
      className="flex items-center gap-5 cursor-pointer"
      style={{ textDecoration: todoItem.checked ? "line-through" : "" }}
      onClick={onClick}
    >
      <input
        className="w-5 h-5"
        type="checkbox"
        checked={todoItem.checked}
        readOnly
      />
      <p>{todoItem.task}</p>
    </li>
  );
};

export default ListItem;
