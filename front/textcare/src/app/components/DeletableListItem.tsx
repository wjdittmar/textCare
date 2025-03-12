import { TrashIcon } from "./Icons";
import { IconButton } from "./IconButton";
interface DeletableListItemProps {
  item: string;
  handleDelete: (input: string) => void;
}

const styles: React.CSSProperties = {
  borderBottom: "1px solid #f0f0f0",
  minHeight: "35px",
  display: "flex",
  alignItems: "center",
  padding: "0px 14px 0px 8px",
  justifyContent: "space-between",
};

export const DeletableListItem = ({
  item,
  handleDelete,
}: DeletableListItemProps) => {
  return (
    <li style={styles}>
      <span>{item}</span>
      <IconButton
        onClick={() => handleDelete(item)}
        style={{ color: "#3f3f3f" }}
      >
        <TrashIcon />
      </IconButton>
    </li>
  );
};
