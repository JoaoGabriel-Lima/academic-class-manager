import type { UseFormRegisterReturn } from "react-hook-form";
import { useGetTurmasPorDisciplina } from "../../hooks/useInscricao";
import { useInscricaoStore } from "../../stores/inscricao.store";

interface TurmaComboBoxProps {
	register: UseFormRegisterReturn;
	error?: string;
}

export function TurmaComboBox({ register, error }: TurmaComboBoxProps) {
	const { selectedDisciplinaId, setSelectedTurmaId } = useInscricaoStore();
	const { data: turmas } = useGetTurmasPorDisciplina(selectedDisciplinaId);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value ? Number(e.target.value) : null;
		setSelectedTurmaId(value);
		register.onChange(e);
	};

	return (
		<div className="tw:mb-2">
			<label
				htmlFor="turma"
				className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-1"
			>
				Turma
			</label>
			<select
				id="turma"
				className="tw:block tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm tw:focus:border-blue-600 tw:focus:ring-blue-600 tw:sm:text-sm tw:p-2 tw:border disabled:tw:bg-gray-100 disabled:tw:text-gray-400"
				disabled={!selectedDisciplinaId}
				{...register}
				onChange={handleChange}
			>
				<option value="">Selecione uma turma</option>
				{turmas?.map((turma) => (
					<option key={turma.id} value={turma.id}>
						(TURMA {turma.id}) {turma.ano} - {turma.periodo}
					</option>
				))}
			</select>
			{error && <p className="tw:mt-1 tw:text-sm tw:text-red-600">{error}</p>}
		</div>
	);
}
