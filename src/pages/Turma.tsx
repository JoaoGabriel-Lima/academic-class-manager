import { useEffect, useState } from "react";
import {
	PiArrowLeft,
	PiCalendar,
	PiChalkboardTeacher,
	PiEnvelope,
	PiSpinner,
	PiStudent,
	PiStudentBold,
	PiUser,
} from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import AlunoCard from "../components/aluno/card";
import type { Turma as TurmaType } from "../components/turmas/type";

function Turma() {
	const { id } = useParams<{ id: string }>();
	const [isLoading, setIsLoading] = useState(true);
	const [turma, setTurma] = useState<TurmaType | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTurma = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(`http://localhost:8080/api/turmas/${id}`);
				if (!response.ok) {
					throw new Error("Turma não encontrada");
				}
				const data = await response.json();
				setTurma(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Erro ao carregar turma");
				console.error("Erro ao buscar turma:", err);
			} finally {
				setIsLoading(false);
			}
		};

		if (id) {
			fetchTurma();
		}
	}, [id]);

	if (isLoading) {
		return (
			<div className="tw:min-h-screen tw:bg-neutral-100 tw:flex tw:justify-center tw:items-center">
				<div className="tw:text-blue-800">
					<PiSpinner className="tw:inline tw:animate-spin tw:text-4xl" />
					<span className="tw:ml-3 tw:text-xl">Carregando turma...</span>
				</div>
			</div>
		);
	}

	if (error || !turma) {
		return (
			<div className="tw:min-h-screen tw:bg-neutral-100 tw:p-6">
				<div className="tw:max-w-4xl tw:mx-auto">
					<Link
						to="/"
						className="tw:inline-flex tw:items-center tw:gap-2 tw:text-blue-800 hover:tw:text-blue-900 tw:mb-6 tw:transition-colors"
					>
						<PiArrowLeft className="tw:text-xl" />
						<span>Voltar para Home</span>
					</Link>
					<div className="tw:bg-white tw:rounded-lg tw:shadow-md tw:p-8 tw:text-center">
						<h2 className="tw:text-2xl tw:font-bold tw:text-red-600 tw:mb-4">
							Erro ao carregar turma
						</h2>
						<p className="tw:text-neutral-600">
							{error || "Turma não encontrada"}
						</p>
					</div>
				</div>
			</div>
		);
	}

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

				<div className="tw:w-full mb-4 tw:outline tw:outline-neutral-300 tw:rounded-md tw:shadow-sm tw:bg-neutral-50 tw:p-3">
					<h1 className="fs-5 tw:mb-2 tw:font-bold tw:text-blue-700!">
						Detalhes da Turma
					</h1>
					<div className="tw:flex tw:items-center fs-7 tw:gap-4 tw:text-neutral-600">
						<div className="tw:flex tw:items-center tw:gap-2">
							<PiCalendar className="fs-6" />
							<span className="tw:font-semibold tw:text-xs">
								Ano: {turma.ano}
							</span>
						</div>
						<span className="tw:text-neutral-400 tw:text-xs">|</span>
						<span className="tw:font-semibold tw:text-xs">
							Período: {turma.periodo}
						</span>
						<span className="tw:text-neutral-400 tw:text-xs">|</span>
						<span className="tw:text-sm tw:text-neutral-400 text-xs">
							ID: {turma.id}
						</span>
					</div>
				</div>

				<div className="tw:grid tw:grid-cols-1 lg:tw:grid-cols-3 tw:gap-6">
					<div className="lg:tw:col-span-1">
						<div className="tw:w-full tw:outline tw:outline-neutral-300 tw:rounded-md tw:shadow-sm tw:bg-neutral-50 tw:p-3">
							<div className="tw:flex tw:items-center tw:gap-2 tw:mb-4 tw:pb-3 tw:border-b tw:border-neutral-200">
								<PiChalkboardTeacher className="tw:text-lg tw:text-blue-800" />
								<h2 className="fs-6 m-0 tw:font-bold tw:text-neutral-800">
									Professor
								</h2>
							</div>

							<div className="tw:space-y-3">
								<div className="tw:flex tw:items-start tw:gap-3">
									<PiUser className="tw:text-xl tw:text-blue-600 tw:mt-0.5" />
									<div className="tw:flex-1">
										<p className="tw:text-xs m-0 tw:text-neutral-500 tw:uppercase tw:tracking-wide">
											Nome
										</p>
										<p className="tw:text-sm m-0 tw:font-semibold tw:text-neutral-800">
											{turma.professor.nome}
										</p>
									</div>
								</div>

								<div className="tw:flex tw:items-start tw:gap-3">
									<PiEnvelope className="tw:text-xl tw:text-blue-600 tw:mt-0.5" />
									<div className="tw:flex-1">
										<p className="m-0 tw:text-xs tw:text-neutral-500 tw:uppercase tw:tracking-wide">
											Email
										</p>
										<a
											href={`mailto:${turma.professor.email}`}
											className="tw:text-sm tw:text-blue-700 hover:tw:text-blue-900 hover:tw:underline tw:break-all"
										>
											{turma.professor.email}
										</a>
									</div>
								</div>

								<div className="tw:pt-2 tw:border-t tw:border-neutral-200">
									<p className="tw:text-xs m-0 tw:text-neutral-400">
										ID do Professor: {turma.professor.id}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="lg:tw:col-span-2">
						<div className="tw:w-full mb-4 tw:outline tw:outline-neutral-300 tw:rounded-md tw:shadow-sm tw:bg-neutral-50 tw:p-3">
							<div className="tw:flex tw:items-center tw:justify-between tw:mb-4 tw:pb-3 tw:border-b tw:border-neutral-200">
								<div className="tw:flex tw:items-center tw:gap-2">
									<PiStudent className="tw:text-xl  tw:text-blue-800" />
									<h2 className="fs-6 m-0 tw:font-bold tw:text-neutral-800">
										Alunos Matriculados
									</h2>
								</div>
								<span className="tw:bg-blue-100 tw:text-center tw:text-blue-800 tw:px-3 tw:py-1 tw:rounded-full tw:text-xs tw:font-semibold">
									{turma.alunos.length}{" "}
									{turma.alunos.length === 1 ? "aluno" : "alunos"}
								</span>
							</div>

							{turma.alunos.length === 0 ? (
								<div className="tw:text-center tw:py-12">
									<PiStudentBold className="tw:text-6xl tw:text-neutral-300 tw:mx-auto tw:mb-3" />
									<p className="tw:text-neutral-500">
										Nenhum aluno matriculado nesta turma
									</p>
								</div>
							) : (
								<div className="tw:space-y-3 ">
									{turma.alunos.map((aluno) => (
										<AlunoCard key={aluno.id} aluno={aluno} />
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Turma;
