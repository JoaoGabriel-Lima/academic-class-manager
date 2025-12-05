"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { Turma } from "../turmas/type";
import { AlunosTable } from "./alunos-table";
import { ComboboxTurmas } from "./combobox";
import useAuthFetch from "@/hooks/useAuthFetch";

export default function GerenciarGrupos() {
	const [selectedTurma, setSelectedTurma] = useState<Turma | null>(null);
	const { authFetch } = useAuthFetch();

	const { data: turmasList = [] } = useQuery<Turma[]>({
		queryKey: ["turmas"],
		queryFn: async () => {
			const response = await authFetch(`http://localhost:8080/api/turmas`);
			const data = await response.json();
			return data;
		},
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
