import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Aluno } from "./type";

const alunoSchema = z.object({
	nome: z.string().min(1, "Nome é obrigatório"),
	email: z
		.string()
		.min(1, "Email é obrigatório")
		.email({ message: "Email inválido" }),
});

type AlunoFormData = z.infer<typeof alunoSchema>;

interface AlunoFormProps {
	onSubmit: (data: AlunoFormData) => void;
	initialData?: Aluno;
	isLoading?: boolean;
}

export function AlunoForm({
	onSubmit,
	initialData,
	isLoading,
}: AlunoFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AlunoFormData>({
		resolver: zodResolver(alunoSchema),
		defaultValues: {
			nome: "",
			email: "",
		},
	});

	useEffect(() => {
		if (initialData) {
			reset({
				nome: initialData.nome,
				email: initialData.email,
			});
		}
	}, [initialData, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="tw:space-y-4">
			<div>
				<label
					htmlFor="nome"
					className="tw:block tw:text-sm tw:font-medium tw:text-gray-700"
				>
					Nome
				</label>
				<input
					id="nome"
					type="text"
					{...register("nome")}
					placeholder="Nome completo"
					className="tw:mt-1  tw:bg-white tw:block tw:text-sm! tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm tw:focus:border-blue-600 tw:focus:ring-blue-600 tw:sm:text-sm tw:p-2 tw:border"
				/>
				{errors.nome && (
					<p className="tw:mt-1.5! tw:text-xs! tw:text-red-600">
						{errors.nome.message}
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor="email"
					className="tw:block tw:text-sm tw:font-medium tw:text-gray-700"
				>
					Email
				</label>
				<input
					id="email"
					type="email"
					placeholder="exemplo@id.uff.br"
					{...register("email")}
					className="tw:mt-1 tw:bg-white tw:block tw:text-sm! tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm tw:focus:border-blue-600 tw:focus:ring-blue-600 tw:sm:text-sm tw:p-2 tw:border"
				/>
				{errors.email && (
					<p className="tw:mt-1.5! tw:text-xs! tw:text-red-600">
						{errors.email.message}
					</p>
				)}
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="tw:inline-flex tw:text-sm! tw:w-full tw:rounded-md! tw:justify-center tw:shadow-md!  tw:border tw:border-transparent tw:bg-blue-600 tw:py-2 tw:px-4 tw:font-medium tw:text-white hover:tw:bg-blue-700 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500 focus:tw:ring-offset-2 disabled:tw:opacity-50"
			>
				{isLoading ? "Salvando..." : "Salvar"}
			</button>
		</form>
	);
}
