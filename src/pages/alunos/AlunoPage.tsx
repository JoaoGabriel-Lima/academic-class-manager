import { PiArrowLeft } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { useGetAluno } from "../../hooks/useAlunos";

export default function AlunoPage() {
	const { id } = useParams<{ id: string }>();
	const { data: aluno, isLoading } = useGetAluno(Number(id));

	if (isLoading) {
		return <div className="tw:p-6">Carregando...</div>;
	}

	if (!aluno) {
		return <div className="tw:p-6">Aluno não encontrado</div>;
	}

	return (
		<div className="tw:min-h-screen tw:bg-neutral-100 tw:p-6">
			<div className="tw:max-w-6xl tw:mx-auto">
				<Link
					to="/"
					className="tw:inline-flex tw:items-center tw:gap-2 tw:text-blue-800 hover:tw:text-blue-900 tw:mb-6 tw:transition-colors"
				>
					<PiArrowLeft className="tw:text-xl" />
					<span className="tw:font-medium">Voltar para Lista</span>
				</Link>

				<div className="tw:w-full mb-4 tw:outline tw:outline-neutral-300 tw:rounded-md tw:shadow-sm tw:bg-neutral-50 tw:p-6">
					<h1 className="tw:text-2xl! tw:text-blue-700! tw:font-bold tw:mb-6">
						Detalhes do Aluno
					</h1>

					<div className="tw:space-y-4">
						<div className="tw:w-full tw:bg-white/90 tw:p-3 tw:rounded-md! tw:outline-1 tw:outline-neutral-200!">
							<h2 className="tw:text-sm! tw:mb-0! tw:font-medium tw:text-gray-500!">
								Nome
							</h2>
							<p className="tw:mt-1 tw:text-md! tw:mb-0! tw:text-gray-900">
								{aluno.nome}
							</p>
						</div>

						<div className="tw:w-full tw:bg-white/90 tw:p-3 tw:rounded-md! tw:outline-1 tw:outline-neutral-200!">
							<h2 className="tw:text-sm! tw:mb-0! tw:font-medium tw:text-gray-500!">
								Email
							</h2>
							<p className="tw:mt-1 tw:text-md! tw:mb-0! tw:text-gray-900">
								{aluno.email}
							</p>
						</div>

						<div className="">
							<Link
								to={`/alunos/${aluno.id}/editar`}
								className="tw:inline-flex tw:justify-center tw:rounded-md tw:border tw:border-transparent tw:text-white! tw:w-full tw:bg-blue-600 tw:py-2 tw:px-4 tw:text-sm tw:font-medium tw:shadow-sm hover:tw:bg-blue-700 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500 focus:tw:ring-offset-2"
							>
								Editar
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
