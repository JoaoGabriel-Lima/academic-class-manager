import { useMemo } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import {
	useGetAlunosInscritos,
	useGetTodosAlunos,
} from "../../hooks/useInscricao";
import { useInscricaoStore } from "../../stores/inscricao.store";

interface AlunoComboBoxProps {
	register: UseFormRegisterReturn;
	error?: string;
}

export function AlunoComboBox({ register, error }: AlunoComboBoxProps) {
	const { selectedTurmaId } = useInscricaoStore();
	const { data: todosAlunos } = useGetTodosAlunos();
	const { data: alunosInscritos } = useGetAlunosInscritos(selectedTurmaId);

	const alunosDisponiveis = useMemo(() => {
		if (!todosAlunos) return [];
		if (!alunosInscritos) return todosAlunos;
		const inscritosIds = new Set(alunosInscritos.map((a) => a.id));
		return todosAlunos.filter((a) => !inscritosIds.has(a.id));
	}, [todosAlunos, alunosInscritos]);

	return (
		<div className="tw:mb-4">
			<label
				htmlFor="aluno"
				className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-1"
			>
				Aluno
			</label>
			<select
				id="aluno"
				className="tw:block tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm tw:focus:border-blue-600 tw:focus:ring-blue-600 tw:sm:text-sm tw:p-2 tw:border disabled:tw:bg-gray-100 disabled:tw:text-gray-400"
				disabled={!selectedTurmaId}
				{...register}
			>
				<option value="">Selecione um aluno</option>
				{alunosDisponiveis.map((aluno) => (
					<option key={aluno.id} value={aluno.id}>
						{aluno.nome}
					</option>
				))}
			</select>
			{error && <p className="tw:mt-1 tw:text-sm tw:text-red-600">{error}</p>}
		</div>
	);
}
