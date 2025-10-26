"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { Turma } from "../turmas/type";
import TableSection from "./pagination-table";
import TurmaSection from "./turma-section";

export default function BuscarTurmas() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTurma, setSelectedTurma] = useState<Turma | null>(null);

	const { data: filteredTurmas = [], isLoading } = useQuery<Turma[]>({
		queryKey: ["turmas-buscar", searchTerm],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:8080/api/turmas/buscar?search=${searchTerm}&page=1&size=100`,
			);
			const data = await response.json();
			return data.itens;
		},
		enabled: searchTerm.trim() !== "",
	});

	return (
		<div className="tw:w-full  tw:p-3 tw:outline-1 tw:gap-3 tw:flex tw:flex-col tw:outline-neutral-300 tw:rounded-md tw:shadow-sm">
			<div className="tw:w-full tw:flex tw:items-center tw:gap-2">
				<span className="tw:text-sm">Pesquisa:</span>
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="tw:flex-1 tw:px-2 tw:placeholder:text-sm tw:border tw:border-neutral-300 tw:rounded-md tw:p-1"
					placeholder="Pesquise por código da Turma"
				/>
			</div>
			<div className="tw:w-full tw:bg-white tw:max-lg:flex-col tw:py-5 tw:px-5 tw:rounded-md tw:outline-1 tw:outline-neutral-200 tw:flex tw:justify-between tw:gap-5">
				<TurmaSection
					searchTerm={searchTerm}
					filteredTurmas={filteredTurmas}
					setSelectedTurma={setSelectedTurma}
					selectedTurma={selectedTurma}
					isLoading={isLoading}
				/>
				<TableSection selectedTurma={selectedTurma} searchTerm={searchTerm} />
			</div>
		</div>
	);
}
