import { useMemo } from "react";
import { useGetAlunosInscritos } from "../../hooks/useInscricao";
import { useInscricaoStore } from "../../stores/inscricao.store";
import TabelaAlunosTurmaPaginacao from "./TabelaAlunosTurma/Paginacao";
import PesquisarAlunosTurma from "./TabelaAlunosTurma/Pesquisar";

const ITEMS_PER_PAGE = 5;

export function TabelaAlunosTurma() {
	const { selectedTurmaId, search, page } = useInscricaoStore();
	const { data: alunos } = useGetAlunosInscritos(selectedTurmaId);

	const filteredAlunos = useMemo(() => {
		if (!alunos) return [];
		const sorted = [...alunos].sort((a, b) => b.id - a.id);

		if (!search) return sorted;

		const lowerSearch = search.toLowerCase();
		return sorted.filter(
			(aluno) =>
				aluno.nome.toLowerCase().includes(lowerSearch) ||
				aluno.email.toLowerCase().includes(lowerSearch),
		);
	}, [alunos, search]);

	const totalPages = Math.ceil(filteredAlunos.length / ITEMS_PER_PAGE);
	const paginatedAlunos = filteredAlunos.slice(
		(page - 1) * ITEMS_PER_PAGE,
		page * ITEMS_PER_PAGE,
	);

	if (!selectedTurmaId) {
		return (
			<div className="tw:text-gray-500 tw:text-center tw:py-8">
				Selecione uma turma para ver os alunos inscritos.
			</div>
		);
	}

	return (
		<div className="tw:bg-white tw:p-6 tw:rounded-lg tw:shadow-sm tw:border tw:border-gray-200">
			<PesquisarAlunosTurma />

			<div className="tw:overflow-x-auto">
				<table className="tw:min-w-full tw:divide-y tw:divide-gray-200">
					<thead className="tw:bg-gray-50">
						<tr>
							<th className="tw:px-6 tw:py-3 tw:text-left tw:text-xs tw:font-medium tw:text-gray-500 tw:uppercase tw:tracking-wider">
								ID
							</th>
							<th className="tw:px-6 tw:py-3 tw:text-left tw:text-xs tw:font-medium tw:text-gray-500 tw:uppercase tw:tracking-wider">
								Nome
							</th>
							<th className="tw:px-6 tw:py-3 tw:text-left tw:text-xs tw:font-medium tw:text-gray-500 tw:uppercase tw:tracking-wider">
								Email
							</th>
						</tr>
					</thead>
					<tbody className="tw:bg-white tw:divide-y tw:divide-gray-200">
						{paginatedAlunos.length > 0 ? (
							paginatedAlunos.map((aluno) => (
								<tr key={aluno.id}>
									<td className="tw:px-6 tw:py-4 tw:whitespace-nowrap tw:text-sm tw:text-gray-500">
										{aluno.id}
									</td>
									<td className="tw:px-6 tw:py-4 tw:whitespace-nowrap tw:text-sm tw:font-medium tw:text-gray-900">
										{aluno.nome}
									</td>
									<td className="tw:px-6 tw:py-4 tw:whitespace-nowrap tw:text-sm tw:text-gray-500">
										{aluno.email}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={3}
									className="tw:px-6 tw:py-4 tw:text-center tw:text-sm tw:text-gray-500"
								>
									Nenhum aluno encontrado.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{totalPages > 1 && <TabelaAlunosTurmaPaginacao totalPages={totalPages} />}
		</div>
	);
}
