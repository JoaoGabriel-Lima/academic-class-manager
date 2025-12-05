import { Link } from "react-router-dom";
import { PiTrash } from "react-icons/pi";
import type { Aluno } from "./type";
import { useDeleteAluno } from "@/hooks/useAlunos";

export default function AlunoCard({ aluno }: { aluno: Aluno }) {
	const deleteAluno = useDeleteAluno();

	const handleDelete = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (window.confirm(`Deseja realmente apagar o aluno "${aluno.nome}"?`)) {
			deleteAluno.mutate(aluno.id);
		}
	};

	return (
		<Link to={`/alunos/${aluno.id}`}>
			<div
				key={aluno.id}
				className="tw:w-full tw:px-3  tw:py-2 tw:bg-white tw:rounded-md tw:shadow-sm tw:flex tw:justify-between tw:items-center hover:tw:bg-blue-50 hover:tw:cursor-pointer"
			>
				<div className="tw:flex tw:flex-col">
					<span className="tw:text-sm tw:font-medium tw:text-blue-800 tw:no-underline!">
						{aluno.nome}
					</span>
					<span
						className="tw:text-xs tw:text-neutral-500 tw:no-underline!"
						style={{
							textDecoration: "none !important",
						}}
					>
						{aluno.email}
					</span>
				</div>
				<div className="tw:flex tw:items-center tw:gap-3">
					<span
						className="tw:text-xs tw:text-neutral-400 tw:no-underline!"
						style={{
							textDecoration: "none !important",
						}}
					>
						ID: {aluno.id}
					</span>
					<button
						type="button"
						onClick={handleDelete}
						disabled={deleteAluno.isPending}
						className="tw:p-1.5 tw:rounded-md tw:text-red-700 hover:tw:bg-red-100 hover:tw:text-red-700 tw:transition-colors disabled:tw:opacity-50"
						title="Apagar aluno"
					>
						<PiTrash className="tw:text-lg" />
					</button>
				</div>
			</div>
		</Link>
	);
}
