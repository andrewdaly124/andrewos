import { useCallback } from "react";
import {
  Button,
  Key,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";

import styles from "./Dropdown.module.scss";

export type ListItem = {
  label: string;
  key: string;
};

type DropdownProps = {
  options: ListItem[];
  onSelect: (key: string) => void;
};

export function Dropdown({ options, onSelect }: DropdownProps) {
  const onSelectWrapper = useCallback(
    (ariaKey: Key) => {
      // Why
      const ariaString = ariaKey.toString();

      if (!ariaString.includes("react-aria-")) {
        console.error("Weird aria key problem in dropdown");
        return;
      }

      // crazy
      const index = +ariaString.replace("react-aria-", "") - 1;
      if (index >= options.length || index < 0) {
        console.error("Dropdown options OOB, how did this happen?");
        return;
      }

      onSelect(options[index].key);
    },
    [onSelect, options]
  );

  return (
    <Select
      onSelectionChange={onSelectWrapper}
      aria-label={`Dropdown ${"testid"}`}
    >
      <Button className={styles.dropdown}>
        <SelectValue />
      </Button>
      <Popover>
        <ListBox className={styles.popover}>
          {options.map((option) => (
            <ListBoxItem className={styles.item} key={option.key}>
              {option.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
}
