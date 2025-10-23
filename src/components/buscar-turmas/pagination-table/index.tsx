import { useState } from "react";
import type { Turma } from "../../turmas/type";

export default function TableSection({
	selectedTurma,
	searchTerm,
}: {
	selectedTurma: Turma | null;
	searchTerm: string;
}) {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 3;

	if (!selectedTurma || searchTerm.trim() === "") {
		return (
			<section className="tw:flex-1 tw:w-full tw:flex tw:flex-col tw:gap-1 tw:items-start">
				<span>Nome da Turma: ---</span>
				<div className="tw:w-full tw:flex tw:outline-1 tw:rounded tw:shadow tw:bg-neutral-50 tw:outline-neutral-200 tw:p-2 tw:justify-center tw:items-center ">
					<span className="tw:text-sm tw:text-center">
						Busque por código, nome do professor ou ano da Turma
					</span>
				</div>
			</section>
		);
	}

	const totalPages = Math.ceil(selectedTurma.alunos.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentAlunos = selectedTurma.alunos.slice(startIndex, endIndex);

	const handlePreviousPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	};

	const handleNextPage = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	};

	return (
		<section className="tw:flex-1 tw:w-full tw:flex tw:flex-col tw:gap-1 tw:items-start">
			<span>
				Nome da Turma:{" "}
				<span className="tw:font-semibold">
					{selectedTurma.disciplina.nome}
				</span>
			</span>
			<div className="tw:w-full tw:flex tw:flex-col tw:outline-1 tw:rounded tw:shadow tw:bg-neutral-50 tw:outline-neutral-200 tw:p-2">
				<table className="tw-w-full tw:border-collapse">
					<thead>
						<tr className="tw:border-b tw:border-neutral-300">
							<th className="tw:text-left tw:p-2">ID</th>
							<th className="tw:text-left tw:p-2">Nome</th>
							<th className="tw:text-left tw:p-2">Email</th>
						</tr>
					</thead>
					<tbody>
						{currentAlunos.length > 0 ? (
							currentAlunos.map((aluno) => (
								<tr
									key={aluno.id}
									className="tw:border-y! tw:border-neutral-200!"
								>
									<td className="tw:p-2">{aluno.id}</td>
									<td className="tw:p-2">{aluno.nome}</td>
									<td className="tw:p-2">{aluno.email}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={4} className="tw:p-2 tw:text-center tw:text-sm">
									Nenhum aluno encontrado
								</td>
							</tr>
						)}
					</tbody>
				</table>

				{selectedTurma.alunos.length > 0 && (
					<div className="tw:flex tw:justify-between tw:items-center tw:mt-4 tw:pt-2 tw:border-t tw:border-neutral-200">
						<span className="tw:text-sm">
							Página {currentPage} de {totalPages} (
							{selectedTurma.alunos.length} alunos)
						</span>
						<div className="tw:flex tw:gap-1.5">
							<button
								type="button"
								onClick={handlePreviousPage}
								disabled={currentPage === 1}
								className="btn btn-primary btn-sm tw:mr-2  disabled:tw:cursor-not-allowed"
							>
								Anterior
							</button>
							<button
								type="button"
								onClick={handleNextPage}
								disabled={currentPage === totalPages}
								className="btn btn-primary btn-sm  disabled:tw:cursor-not-allowed"
							>
								Próxima
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
