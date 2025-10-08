import { Link } from "react-router-dom";
import type { Turma } from "./type";

export default function TurmaCard({ turma }: { turma: Turma }) {
	return (
		<Link
			to={`/turma/${turma.id}`}
			className="tw:w-full tw:outline tw:outline-neutral-300 tw:rounded-md tw:shadow-sm tw:bg-white tw:p-3 tw:block tw:transition-colors tw:hover:bg-neutral-50 tw:cursor-pointer"
		>
			<div className="tw:flex tw:flex-col tw:gap-1">
				<span className="tw:text-sm tw:font-medium tw:text-blue-800">
					{turma.disciplina.nome} - Período: {turma.periodo}
				</span>
				<span className="tw:text-xs tw:text-neutral-500">
					Professor(a): {turma.professor.nome} ({turma.professor.email})
				</span>
				<span className="tw:text-xs tw:text-neutral-600">
					Alunos inscritos: {turma.alunos.length}
				</span>
			</div>
			<span className="tw:text-xs tw:text-neutral-400">
				ID: {turma.id} | Carga Horária: {turma.disciplina.cargaHoraria} horas
			</span>
		</Link>
	);
}
