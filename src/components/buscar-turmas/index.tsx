"use client";

import { useEffect, useState } from "react";

import type { Turma } from "../turmas/type";
import TableSection from "./pagination-table";
import TurmaSection from "./turma-section";

export default function BuscarTurmas() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredTurmas, setFilteredTurmas] = useState<Turma[]>([]);
	const [selectedTurma, setSelectedTurma] = useState<Turma | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (searchTerm.trim() === "") {
			setFilteredTurmas([]);
			setSelectedTurma(null);
			return;
		}

		const fetchTurmas = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`http://localhost:8080/api/turmas/buscar?search=${searchTerm}&page=1&size=100`,
				);
				const data = await response.json();
				setFilteredTurmas(data.itens);
			} catch (error) {
				console.error("Error fetching turmas:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTurmas();
	}, [searchTerm]);

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
