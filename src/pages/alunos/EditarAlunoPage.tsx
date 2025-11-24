import { PiArrowLeft } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlunoForm } from "../../components/aluno/AlunoForm";
import { useGetAluno, useUpdateAluno } from "../../hooks/useAlunos";

export default function EditarAlunoPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { data: aluno, isLoading: isLoadingAluno } = useGetAluno(Number(id));
	const updateAluno = useUpdateAluno();

	const handleSubmit = (data: { nome: string; email: string }) => {
		if (!aluno) return;
		updateAluno.mutate(
			{ ...data, id: aluno.id },
			{
				onSuccess: () => {
					navigate("/");
				},
			},
		);
	};

	if (isLoadingAluno) {
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
						Editar Aluno
					</h1>
					<AlunoForm
						onSubmit={handleSubmit}
						initialData={aluno}
						isLoading={updateAluno.isPending}
					/>
				</div>
			</div>
		</div>
	);
}
