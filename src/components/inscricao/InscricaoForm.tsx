import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useInscreverAluno } from "../../hooks/useInscricao";
import { useInscricaoStore } from "../../stores/inscricao.store";
import { AlunoComboBox } from "./AlunoComboBox";
import { DisciplinaComboBox } from "./DisciplinaComboBox";
import { TurmaComboBox } from "./TurmaComboBox";

const inscricaoSchema = z.object({
	turmaId: z
		.any()
		.transform(Number)
		.pipe(z.number().min(1, "Selecione uma turma")),
	alunoId: z
		.any()
		.transform(Number)
		.pipe(z.number().min(1, "Selecione um aluno")),
});

type InscricaoFormData = z.infer<typeof inscricaoSchema>;

export function InscricaoForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<InscricaoFormData>({
		resolver: zodResolver(inscricaoSchema),
	});

	const { selectedDisciplinaId, selectedTurmaId } = useInscricaoStore();
	const inscreverAluno = useInscreverAluno();

	useEffect(() => {
		if (selectedDisciplinaId !== null) {
			setValue("turmaId", 0);
			setValue("alunoId", 0);
		}
	}, [selectedDisciplinaId, setValue]);

	useEffect(() => {
		if (selectedTurmaId !== null) {
			setValue("alunoId", 0);
		}
	}, [selectedTurmaId, setValue]);

	const onSubmit: SubmitHandler<InscricaoFormData> = (data) => {
		inscreverAluno.mutate(
			{ alunoId: data.alunoId, turmaId: data.turmaId },
			{
				onSuccess: () => {
					setValue("alunoId", 0);
				},
			},
		);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="tw:bg-white tw:p-6 tw:rounded-lg tw:shadow-sm tw:border tw:border-gray-200"
		>
			<h2 className="tw:text-xl! tw:text-blue-700! tw:font-bold tw:mb-6">
				Nova Inscrição
			</h2>

			<DisciplinaComboBox />

			<TurmaComboBox
				register={register("turmaId")}
				error={errors.turmaId?.message}
			/>

			<AlunoComboBox
				register={register("alunoId")}
				error={errors.alunoId?.message}
			/>

			<button
				type="submit"
				disabled={inscreverAluno.isPending}
				className="tw:w-full tw:flex tw:justify-center tw:py-2 tw:px-4 tw:border tw:border-transparent tw:rounded-md! tw:shadow-sm! tw:text-sm! tw:font-medium tw:text-white tw:bg-blue-600 hover:tw:bg-blue-700 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-offset-2 focus:tw:ring-blue-500 disabled:tw:opacity-50"
			>
				{inscreverAluno.isPending ? "Inscrevendo..." : "Inscrever Aluno"}
			</button>
		</form>
	);
}
