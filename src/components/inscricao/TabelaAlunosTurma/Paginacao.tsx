import { useInscricaoStore } from "../../../stores/inscricao.store";

export default function TabelaAlunosTurmaPaginacao({
	totalPages,
}: {
	totalPages: number;
}) {
	const { page, setPage } = useInscricaoStore();

	return (
		<div className="tw:flex tw:justify-between tw:items-center tw:mt-4">
			<button
				type="button"
				onClick={() => setPage(Math.max(1, page - 1))}
				disabled={page === 1}
				className="tw:px-3 tw:py-1 tw:border tw:border-gray-300! tw:bg-neutral-50! tw:rounded-md! tw:text-sm! tw:font-medium tw:text-gray-700! hover:tw:bg-gray-100! disabled:tw:opacity-50"
			>
				Anterior
			</button>
			<span className="tw:text-sm tw:text-gray-700">
				Página {page} de {totalPages}
			</span>
			<button
				type="button"
				onClick={() => setPage(Math.min(totalPages, page + 1))}
				disabled={page === totalPages}
				className="tw:px-3 tw:py-1 tw:border tw:border-gray-300! tw:rounded-md!  tw:bg-neutral-50! tw:text-sm! tw:font-medium tw:text-gray-700! hover:tw:bg-gray-100! disabled:tw:opacity-50"
			>
				Próxima
			</button>
		</div>
	);
}
