import type { Turma } from "../../../turmas/type";

export default function TurmaItem({
	turma,
	isSelected,
	onClick,
}: {
	turma: Turma;
	isSelected: boolean;
	onClick: () => void;
}) {
	return (
		<button
			key={turma.id}
			onClick={onClick}
			type="button"
			className={`tw-p-1 hover:tw-bg-neutral-300  tw:outline tw:outline-slate-200 tw:w-full ${
				isSelected ? "tw:bg-blue-500! text-white" : "tw:bg-transparent!"
			}`}
		>
			Turma {turma.id}
		</button>
	);
}
