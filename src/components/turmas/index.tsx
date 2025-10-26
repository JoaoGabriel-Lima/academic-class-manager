import { useQuery } from "@tanstack/react-query";
import { PiSpinner } from "react-icons/pi";
import TurmaCard from "./card";
import type { Turma } from "./type";

export default function TurmasTab() {
	const { data: turmas = [], isLoading } = useQuery<Array<Turma>>({
		queryKey: ["turmas"],
		queryFn: async () => {
			const response = await fetch("http://localhost:8080/api/turmas");
			return response.json();
		},
	});

	return (
		<div className="tw:w-full tw:outline tw:outline-neutral-300 tw:rounded-md tw:shadow-sm tw:bg-neutral-50 tw:p-3">
			{isLoading ? (
				<div className="tw:w-full tw:h-32 tw:flex tw:justify-center tw:items-center">
					<div className="tw:text-blue-800">
						<span className="">
							<PiSpinner className="tw:inline  tw:animate-spin tw:text-xl tw:mr-2 tw:mb-1" />
							Carregando Alunos
						</span>
					</div>
				</div>
			) : (
				<div className="tw:w-full tw:flex tw:flex-col tw:gap-2">
					{turmas.map((turma) => (
						<TurmaCard key={turma.id} turma={turma} />
					))}
				</div>
			)}
		</div>
	);
}
