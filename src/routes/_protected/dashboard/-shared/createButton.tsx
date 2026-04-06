import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

type CreateButtonProps = {
  handleClick: () => void;
};

export default function CreateButton({ handleClick }: CreateButtonProps) {
  return (
    <Button type="button" onClick={handleClick}>
      <span>+</span> Create
    </Button>
  );
}
