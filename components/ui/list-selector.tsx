"use client";

import { cx } from "class-variance-authority";
import React from "react";
import { Input } from "./input";

interface ListSelectorProps {
  children: React.ReactElement<ListSelectorItemProps>[];
  defaultValue?: string;

  isSearchable?: {
    placeholder: string;
    textAlign?: "left" | "center" | "right";
  };

  onSelect: (value: string) => void;
}

export default function ListSelector({
  children,
  defaultValue,
  isSearchable,
  onSelect,
}: ListSelectorProps) {
  const [selected, setSelected] = React.useState<string>(
    defaultValue || children[0].props.value
  );

  const [search, setSearch] = React.useState<string>("");

  const [filteredChildren, setFilteredChildren] =
    React.useState<React.ReactElement<ListSelectorItemProps>[]>(children);

  const listRef = React.useRef<HTMLUListElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setFilteredChildren(
      children.filter(
        (child) =>
          typeof child?.props?.children === "string" &&
          child?.props?.children?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, children]);

  React.useEffect(() => {
    if (search.length === 0) return;

    if (listRef?.current && filteredChildren.length > 0) {
      const firstChild = listRef.current.querySelector(
        `#${filteredChildren[0].props.value}`
      ) as HTMLElement;

      if (firstChild) {
        firstChild.scrollIntoView({ block: "start" });
      }
    }
  }, [filteredChildren, listRef, search]);

  return (
    <div className="relative">
      <ul
        className="min-w-[300px] max-h-[260px] flex flex-col overflow-clip overflow-y-auto rounded-[4px] bg-white border border-gray-200 focus-within:ring-2 focus-within:ring-accent-muted transition-all"
        ref={listRef}
      >
        {isSearchable && (
          <div className="h-20 sticky top-0 z-20" role="listitem">
            <Input
              type="text"
              variant={"ghost"}
              name="search-items"
              className={cx(
                "w-full rounded-none border-b",
                isSearchable.textAlign === "center" && "text-center",
                isSearchable.textAlign === "right" && "text-right"
              )}
              placeholder={isSearchable.placeholder}
              value={search}
              onInput={(text) => setSearch(text.currentTarget.value)}
              ref={inputRef}
              autoFocus
              autoComplete="off"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col relative overflow-y-auto">
          {children.map((child) => {
            return React.cloneElement(child, {
              onClick: () => {
                setSelected(child.props.value);
                onSelect(child.props.value);
                setSearch("");
              },
              id: child.props.value,
              selected: selected === child.props.value,
            });
          })}
        </div>
      </ul>
    </div>
  );
}

interface ListSelectorItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
  trailing?: React.ReactNode;
  selected?: boolean;
}

export const ListSelectorItem = ({
  value,
  children,
  trailing,
  selected,
  className,
  ...props
}: ListSelectorItemProps) => {
  return (
    <button
      role="listitem"
      aria-roledescription="listitem"
      className={cx(
        "px-2 py-0.5 flex items-center text-sm group/listitem",
        selected ? "bg-accent text-white" : "hover:bg-gray-100",
        className
      )}
      {...props}
    >
      <div className="flex-1 flex">{children}</div>
      {trailing && (
        <div
          className={cx(
            "flex items-center gap-2",
            selected ? "text-white" : "text-muted-foreground"
          )}
        >
          {trailing}
        </div>
      )}
    </button>
  );
};
