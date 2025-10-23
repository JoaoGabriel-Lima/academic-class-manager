import { PiSpinner } from "react-icons/pi";
import type { Turma } from "../../turmas/type";
import TurmaItem from "./item";

export default function TurmaSection({
	filteredTurmas,
	setSelectedTurma,
	searchTerm,
	selectedTurma,
	isLoading,
}: {
	filteredTurmas: Turma[];
	setSelectedTurma: React.Dispatch<React.SetStateAction<Turma | null>>;
	searchTerm: string;
	isLoading: boolean;
	selectedTurma: Turma | null;
}) {
	if (searchTerm.trim() === "" || (filteredTurmas.length === 0 && !isLoading)) {
		return (
			<div className="tw:flex-1 tw:max-w-[240px] tw:max-lg:max-w-3xl tw:flex tw:flex-col tw:gap-1 tw:items-center">
				<span>Turmas</span>
				<div className="tw:flex tw:flex-col tw:gap-1 tw:bg-neutral-50 tw:p-2 tw:w-full tw:rounded tw:outline-1 tw:outline-neutral-200 tw:shadow-sm">
					<span className="tw:text-sm tw:flex tw:justify-center tw:items-center">
						Nenhuma turma encontrada
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className="tw:flex-1 tw:max-w-[250px] tw:max-lg:max-w-3xl tw:flex tw:flex-col tw:gap-1 tw:items-center">
			<span>Turmas</span>
			<div className="tw:flex tw:flex-col tw:gap-1 tw:bg-neutral-50 tw:p-2 tw:w-full tw:rounded tw:outline-1 tw:outline-neutral-200 tw:shadow-sm">
				{isLoading ? (
					<span className="tw:text-sm tw:flex tw:justify-center tw:items-center">
						<PiSpinner className="tw:animate-spin ml-1" />
					</span>
				) : (
					filteredTurmas?.map((turma) => (
						<TurmaItem
							key={turma.id}
							turma={turma}
							isSelected={selectedTurma?.id === turma.id}
							onClick={() => setSelectedTurma(turma)}
						/>
					))
				)}
			</div>
		</div>
	);
}
