import { Link } from "react-router-dom";
import type { Aluno } from "./type";

export default function AlunoCard({ aluno }: { aluno: Aluno }) {
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
				<span
					className="tw:text-xs tw:text-neutral-400 tw:no-underline!"
					style={{
						textDecoration: "none !important",
					}}
				>
					ID: {aluno.id}
				</span>
			</div>
		</Link>
	);
}
