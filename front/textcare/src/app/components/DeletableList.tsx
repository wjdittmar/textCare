import React from "react";
import { DeletableListItem } from "./DeletableListItem";

interface DeletableListProps {
  itemList: string[];
}

const styles: React.CSSProperties = {
  listStyleType: "none",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};
export const DeletableList = ({ itemList }: DeletableListProps) => {
  if (itemList.length === 0) {
    return null;
  }
  return (
    <ul style={styles}>
      {itemList.map((item) => (
        <DeletableListItem key={item} item={item} />
      ))}
    </ul>
  );
};
