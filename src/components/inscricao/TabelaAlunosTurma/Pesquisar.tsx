import { useInscricaoStore } from "../../../stores/inscricao.store";

export default function PesquisarAlunosTurma() {
	const { search, setSearch, setPage } = useInscricaoStore();
	return (
		<div className="tw:mb-4">
			<input
				type="text"
				placeholder="Pesquisar aluno..."
				className="tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm tw:text-sm! tw:pl-3 tw:focus:border-blue-600 tw:focus:ring-blue-600 tw:sm:text-sm tw:p-2 tw:border"
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
					setPage(1);
				}}
			/>
		</div>
	);
}
