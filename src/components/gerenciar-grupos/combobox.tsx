"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Turma } from "../turmas/type";

export function ComboboxTurmas({
	turmas,
	setSelectedTurma,
}: {
	turmas: Turma[];
	setSelectedTurma: React.Dispatch<React.SetStateAction<Turma | null>>;
}) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	const mappedTurmas = turmas.map((turma) => ({
		label: `Turma ${turma.id}`,
		value: turma.id.toString(),
	}));

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="tw:w-[200px] tw:justify-between"
				>
					{value
						? mappedTurmas.find((turma) => turma.value === value)?.label
						: "Selecione uma Turma"}
					<ChevronsUpDown className="tw:opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="tw:w-[200px] tw:p-0">
				<Command>
					<CommandInput placeholder="Buscar turma..." className="tw:h-9" />
					<CommandList>
						<CommandEmpty>Nenhuma Turma Encontrada.</CommandEmpty>
						<CommandGroup>
							{mappedTurmas.map((turma) => (
								<CommandItem
									key={turma.value}
									value={turma.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? "" : currentValue);
										const selected = turmas.find(
											(t) => t.id.toString() === currentValue,
										);
										setSelectedTurma(selected || null);
										setOpen(false);
									}}
								>
									{turma.label}
									<Check
										className={cn(
											"tw:ml-auto",
											value === turma.value ? "tw:opacity-100" : "tw:opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
