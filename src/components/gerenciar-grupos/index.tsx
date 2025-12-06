"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useApi from "@/hooks/useApi";
import type { Turma } from "../turmas/type";
import { AlunosTable } from "./alunos-table";
import { ComboboxTurmas } from "./combobox";

export default function GerenciarGrupos() {
	const [selectedTurma, setSelectedTurma] = useState<Turma | null>(null);
	const { recuperarTodos } = useApi<Turma>("/api/turmas");

	const { data: turmasList = [] } = useQuery<Turma[]>({
		queryKey: ["turmas"],
		queryFn: recuperarTodos,
	});

	return (
		<div className="tw:w-full  tw:p-3 tw:outline-1 tw:gap-3 tw:flex tw:flex-col tw:outline-neutral-300 tw:rounded-md tw:shadow-sm">
			<div className="tw:w-full tw:flex tw:items-center tw:gap-2">
				<span className="tw:text-sm">Turma:</span>
				<ComboboxTurmas
					turmas={turmasList}
					setSelectedTurma={setSelectedTurma}
				/>
			</div>
			<div className="tw:w-full tw:bg-white tw:items-center tw:max-lg:flex-col tw:py-5 tw:px-5 tw:rounded-md tw:outline-1 tw:outline-neutral-200 tw:flex tw:justify-between tw:gap-5">
				{selectedTurma ? (
					<AlunosTable
						alunos={selectedTurma.alunos}
						turmaId={selectedTurma.id.toString()}
					/>
				) : (
					<p className="tw:text-neutral-500 tw:mb-0! tw:text-center tw:w-full">
						Selecione uma turma para visualizar os alunos
					</p>
				)}
			</div>
		</div>
	);
}
