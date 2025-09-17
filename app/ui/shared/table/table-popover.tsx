"use client";

import { PlusCircle } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type TablePopoverProps = {
  options: { value: string; label: string }[];
  selected: string;
  onSelect: (val: string) => void;
  label: string;
  placeholder?: string;
};

export function TablePopover({ options, selected, onSelect, label }: TablePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <PlusCircle />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map(opt => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => onSelect(opt.value === selected ? "" : opt.value)}
                >
                  <div className="flex items-center space-x-3 py-1">
                    <Checkbox id={opt.value} checked={selected === opt.value} />
                    <label htmlFor={opt.value}>{opt.label}</label>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
