import { PiArrowLeft } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { AlunoForm } from "../../components/aluno/AlunoForm";
import { useCreateAluno } from "../../hooks/useAlunos";

export default function CadastroDeAlunosPage() {
	const navigate = useNavigate();
	const createAluno = useCreateAluno();

	const handleSubmit = (data: { nome: string; email: string }) => {
		createAluno.mutate(data, {
			onSuccess: () => {
				navigate("/");
			},
		});
	};

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

				<div className="tw:w-full mb-4 tw:outline tw:outline-neutral-300 tw:rounded-md tw:shadow-sm tw:bg-neutral-50 tw:p-6">
					<h1 className="tw:text-2xl! tw:text-blue-700! tw:font-bold tw:mb-6">
						Cadastro de Aluno
					</h1>
					<AlunoForm
						onSubmit={handleSubmit}
						isLoading={createAluno.isPending}
					/>
				</div>
			</div>
		</div>
	);
}
