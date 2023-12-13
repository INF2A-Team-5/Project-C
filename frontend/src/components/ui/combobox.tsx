import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { API_BASE_URL, getBaseQueryRequest } from "@/lib/api"
import { Machine } from "@/services/Machine"

async function fetchMachines(){
  let machines = await fetch(
    API_BASE_URL + "/api/machines",
    getBaseQueryRequest(),
  )
    .then((data) => data.json());

    const machineNames: {
      value: string;
      label: string;
    }[] = [];

    machines.forEach((element: { name: string }) => {
      machineNames.push({value: element.name, label: element.name});
    });

    return machineNames;
}

const machines: {
  value: string;
  label: string;
}[] = await fetchMachines();

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [selectedMachine, setSelectedMachine] = React.useState<{
    value: string;
    label: string;
  } | null>(null);

  const handleMachineSelect = (machine: { value: string; label: string }) => {
    setValue(machine ? machine.value : "");
    setSelectedMachine(machine);
    setOpen(false);
    
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedMachine ? selectedMachine.label : "Select Machine..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select Machine..." />
          <CommandEmpty>No machine found.</CommandEmpty>
          <CommandGroup>
            {machines.map((machine) => (
              <CommandItem
                key={machine.value}
                value={machine.value}
                onSelect={() => handleMachineSelect(machine)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedMachine && selectedMachine.value === machine.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {machine.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
