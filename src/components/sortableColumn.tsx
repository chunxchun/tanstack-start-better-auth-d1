import type { CSSProperties, ReactNode } from "react";
import { useDroppable } from "@dnd-kit/react";

const LOW_COLLISION_PRIORITY = 1;

const styles: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: 20,
  minWidth: 200,
  borderRadius: 10,
};

export function Column({ children, id }: { children: ReactNode; id: string }) {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: ["item"],
    collisionPriority: LOW_COLLISION_PRIORITY,
  });

  return (
    <div ref={ref} style={styles}>
      {children}
    </div>
  );
}
