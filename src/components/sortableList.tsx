import { useState, type ComponentProps } from "react";
import { DragDropProvider } from "@dnd-kit/react";

import { Column } from "./sortableColumn";
import { Item } from "./sortableItem";

type ItemsByColumn = Record<string, string[]>;
type DragOverEvent = Parameters<
  NonNullable<ComponentProps<typeof DragDropProvider>["onDragOver"]>
>[0];

const initialItems: ItemsByColumn = {
  column1: ["Item 1", "Item 2", "Item 3"],
  column2: ["Item 4", "Item 5", "Item 6"],
};

function reorderItems(
  items: ItemsByColumn,
  event: DragOverEvent,
): ItemsByColumn {
  const { source, target, canceled } = event.operation;

  if (!source || !target || canceled) {
    return items;
  }

  let sourceColumn: string | undefined;
  let sourceIndex = -1;

  for (const [column, columnItems] of Object.entries(items)) {
    const index = columnItems.indexOf(String(source.id));

    if (index !== -1) {
      sourceColumn = column;
      sourceIndex = index;
      break;
    }
  }

  if (!sourceColumn || sourceIndex === -1) {
    return items;
  }

  let targetColumn: string | undefined;
  let targetIndex = -1;

  if (target.id in items) {
    targetColumn = String(target.id);
    targetIndex = items[targetColumn].length;
  } else {
    for (const [column, columnItems] of Object.entries(items)) {
      const index = columnItems.indexOf(String(target.id));

      if (index !== -1) {
        targetColumn = column;
        targetIndex = index;
        break;
      }
    }
  }

  if (!targetColumn || targetIndex === -1) {
    return items;
  }

  if (sourceColumn === targetColumn && sourceIndex === targetIndex) {
    return items;
  }

  const sourceItems = [...items[sourceColumn]];
  const [movedItem] = sourceItems.splice(sourceIndex, 1);

  if (!movedItem) {
    return items;
  }

  if (sourceColumn === targetColumn) {
    const nextItems = [...sourceItems];
    const insertionIndex = Math.min(targetIndex, nextItems.length);

    nextItems.splice(insertionIndex, 0, movedItem);

    return {
      ...items,
      [sourceColumn]: nextItems,
    };
  }

  const targetItems = [...items[targetColumn]];
  const insertionIndex = Math.min(targetIndex, targetItems.length);

  targetItems.splice(insertionIndex, 0, movedItem);

  return {
    ...items,
    [sourceColumn]: sourceItems,
    [targetColumn]: targetItems,
  };
}

export function SortableList() {
  const [items, setItems] = useState(initialItems);

  return (
    <DragDropProvider
      onDragOver={(e) => {
        setItems((currentItems) => reorderItems(currentItems, e));
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 20,
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 10,
        }}
      >
        {Object.entries(items).map(([column, items]) => (
          <Column key={column} id={column}>
            {items.map((id, idx) => (
              <Item key={id} id={id} column={column} index={idx} />
            ))}
          </Column>
        ))}
      </div>
    </DragDropProvider>
  );
}
