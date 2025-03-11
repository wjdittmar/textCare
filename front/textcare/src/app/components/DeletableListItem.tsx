interface DeletableListItemProps {
  item: string;
}

const styles: React.CSSProperties = {
  borderBottom: "1px solid #f0f0f0",
  minHeight: "35px",
  display: "flex",
  alignItems: "center",
  padding: "0px 8px",
};

export const DeletableListItem = ({ item }: DeletableListItemProps) => {
  return (
    <li style={styles}>
      <span>{item}</span>
    </li>
  );
};
