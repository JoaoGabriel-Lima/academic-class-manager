import { useCallback, useEffect, useState } from "react";
import { PiSpinner } from "react-icons/pi";
import AlunoCard from "./card";
import type { Aluno } from "./type";

export default function AlunosTab() {
	const [isLoading, setIsLoading] = useState(true);
	const [alunos, setAlunos] = useState<Array<Aluno>>([]);

	const fetchAlunos = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetch("http://localhost:8080/api/alunos");
			const data = await response.json();
			setAlunos(data);
		} catch (error) {
			console.error("Erro ao buscar alunos:", error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAlunos();
	}, [fetchAlunos]);

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
					{alunos.map((aluno) => (
						<AlunoCard key={aluno.id} aluno={aluno} />
					))}
				</div>
			)}
		</div>
	);
}
