import { useStore } from "zustand";
import { cn } from "@/lib/utils";
import type { Aluno } from "../aluno/type";
import { useGruposStore } from "./grupos.store";

interface AlunosTableProps {
	alunos: Aluno[];
	turmaId: string;
}

export function AlunosTable({ alunos, turmaId }: AlunosTableProps) {
	const { adicionarAluno, removerAluno, obterAlunos } =
		useStore(useGruposStore);
	const alunosNoGrupo = obterAlunos(turmaId);

	return (
		<div className="tw:w-full tw:overflow-x-auto">
			<table className="tw:w-full tw:border-collapse  tw:rounded-md">
				<thead>
					<tr className="tw:border-b! tw:border-neutral-200! ">
						<th className="tw:text-left tw:p-3 tw:font-semibold tw:text-sm">
							ID
						</th>
						<th className="tw:text-left tw:p-3 tw:font-semibold tw:text-sm">
							Nome
						</th>
						<th className="tw:text-left tw:p-3 tw:font-semibold tw:text-sm">
							Email
						</th>
						<th className="tw:text-left tw:p-3 tw:font-semibold tw:text-sm">
							Ação
						</th>
					</tr>
				</thead>
				<tbody>
					{alunos.length === 0 ? (
						<tr>
							<td
								colSpan={4}
								className="tw:text-center tw:p-6 tw:text-neutral-500"
							>
								Nenhum aluno encontrado nesta turma
							</td>
						</tr>
					) : (
						alunos.map((aluno) => (
							<tr
								key={aluno.id}
								className="tw:border-b! tw:border-neutral-100 hover:tw:bg-neutral-50"
							>
								<td className="tw:p-3 tw:text-sm">{aluno.id}</td>
								<td className="tw:p-3 tw:text-sm">{aluno.nome}</td>
								<td className="tw:p-3 tw:text-sm">{aluno.email}</td>
								<td className="tw:p-3">
									<button
										type="button"
										onClick={() => {
											if (alunosNoGrupo.includes(aluno.id.toString())) {
												removerAluno(turmaId, aluno.id.toString());
											} else {
												adicionarAluno(turmaId, aluno.id.toString());
											}
										}}
										className={cn(
											"tw:px-6 tw:py-2 tw:bg-blue-500 tw:text-white tw:rounded! tw:text-sm! tw:border-1! tw:border-blue-600! tw:hover:bg-blue-600 tw:transition-colors",
											{
												"tw:bg-red-500 tw:border-red-700! tw:hover:bg-red-600 tw:px-4":
													alunosNoGrupo.includes(aluno.id.toString()),
											},
										)}
									>
										{alunosNoGrupo.includes(aluno.id.toString())
											? "Remover"
											: "Incluir"}
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
