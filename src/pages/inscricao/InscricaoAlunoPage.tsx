import { PiArrowLeft } from "react-icons/pi";
import { Link } from "react-router-dom";
import { InscricaoForm } from "../../components/inscricao/InscricaoForm";
import { TabelaAlunosTurma } from "../../components/inscricao/TabelaAlunosTurma";
import { useGetAlunosInscritos } from "../../hooks/useInscricao";
import { useInscricaoStore } from "../../stores/inscricao.store";

export default function InscricaoAlunoPage() {
	const { selectedTurmaId } = useInscricaoStore();
	const { data: alunos } = useGetAlunosInscritos(selectedTurmaId);

	return (
		<div className="tw:min-h-screen tw:bg-neutral-100 tw:p-6">
			<div className="tw:max-w-6xl tw:mx-auto">
				<Link
					to="/"
					className="tw:inline-flex tw:items-center tw:gap-2 tw:text-blue-800 hover:tw:text-blue-900 tw:mb-6 tw:transition-colors"
				>
					<PiArrowLeft className="tw:text-xl" />
					<span className="tw:font-medium">Voltar para Home</span>
				</Link>

				<div className="tw:flex tw:justify-between tw:items-center! tw:mb-6">
					<h1 className="tw:text-2xl! tw:font-bold tw:text-blue-700! tw:mb-0!">
						Inscrição de Alunos
					</h1>
					{selectedTurmaId && (
						<div className="tw:bg-blue-100 tw:text-blue-800 tw:px-4 tw:py-2 tw:rounded-md tw:text-sm! tw:font-medium">
							Total de Alunos da Turma: {alunos?.length || 0}
						</div>
					)}
				</div>

				<div className="tw:grid tw:grid-cols-1 lg:tw:grid-cols-3 tw:gap-6">
					<div className="lg:tw:col-span-1">
						<InscricaoForm />
					</div>

					<div className="lg:tw:col-span-2">
						<TabelaAlunosTurma />
					</div>
				</div>
			</div>
		</div>
	);
}
