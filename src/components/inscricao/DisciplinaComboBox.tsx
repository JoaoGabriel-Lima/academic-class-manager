import { useGetDisciplinas } from "../../hooks/useInscricao";
import { useInscricaoStore } from "../../stores/inscricao.store";

export function DisciplinaComboBox() {
	const { data: disciplinas, isLoading } = useGetDisciplinas();
	const { selectedDisciplinaId, setSelectedDisciplinaId } = useInscricaoStore();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value ? Number(e.target.value) : null;
		setSelectedDisciplinaId(value);
	};

	if (isLoading) return <div>Carregando disciplinas...</div>;

	return (
		<div className="tw:mb-2">
			<label
				htmlFor="disciplina"
				className="tw:block tw:text-sm tw:font-medium tw:text-gray-700 tw:mb-1"
			>
				Disciplina
			</label>
			<select
				id="disciplina"
				className="tw:block tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm tw:focus:border-blue-600 tw:focus:ring-blue-600 tw:sm:text-sm tw:p-2 tw:border"
				value={selectedDisciplinaId || ""}
				onChange={handleChange}
			>
				<option value="">Selecione uma disciplina</option>
				{disciplinas?.map((disciplina) => (
					<option key={disciplina.id} value={disciplina.id}>
						{disciplina.nome}
					</option>
				))}
			</select>
		</div>
	);
}
