import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createUserSchema = z
	.object({
		nome: z.string().min(1, "Informe o nome."),
		email: z
			.string()
			.min(1, "Informe o email.")
			.email("Informe um email válido."),
		senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
		confirmarSenha: z.string().min(1, "Confirme a senha."),
		role: z.enum(["USER", "ADMIN"], {
			message: "Selecione o tipo de usuário.",
		}),
	})
	.refine((data) => data.senha === data.confirmarSenha, {
		message: "As senhas não coincidem.",
		path: ["confirmarSenha"],
	});

type CreateUserFormData = z.infer<typeof createUserSchema>;

export interface CreateUserFormOutput {
	nome: string;
	email: string;
	senha: string;
	role: "USER" | "ADMIN";
}

interface CreateUserFormProps {
	onSubmit: (data: CreateUserFormOutput) => void;
	isLoading?: boolean;
	errorMessage?: string;
	successMessage?: string;
}

export function CreateUserForm({
	onSubmit,
	isLoading,
	errorMessage,
	successMessage,
}: CreateUserFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateUserFormData>({
		resolver: zodResolver(createUserSchema),
		defaultValues: {
			nome: "",
			email: "",
			senha: "",
			confirmarSenha: "",
			role: "USER",
		},
	});

	const handleFormSubmit = (data: CreateUserFormData) => {
		onSubmit({
			nome: data.nome,
			email: data.email,
			senha: data.senha,
			role: data.role,
		});
	};

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className="tw:space-y-4">
			{errorMessage && (
				<div className="tw:bg-red-50 tw:border tw:border-red-300 tw:text-red-700 tw:px-4 tw:py-3 tw:rounded-md tw:text-sm">
					{errorMessage}
				</div>
			)}

			{successMessage && (
				<div className="tw:bg-green-50 tw:border tw:border-green-300 tw:text-green-700 tw:px-4 tw:py-3 tw:rounded-md tw:text-sm">
					{successMessage}
				</div>
			)}

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
					placeholder="Nome completo do usuário"
					{...register("nome")}
					className="tw:mt-1 tw:bg-white tw:block tw:text-sm! tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm tw:focus:border-blue-600 tw:focus:ring-blue-600 tw:sm:text-sm tw:p-2 tw:border"
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

			<div>
				<label
					htmlFor="role"
					className="tw:block tw:text-sm tw:font-medium tw:text-gray-700"
				>
					Tipo de Usuário
				</label>
				<select
					id="role"
					{...register("role")}
					className="tw:mt-1 tw:bg-white tw:block tw:text-sm! tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm tw:focus:border-blue-600 tw:focus:ring-blue-600 tw:sm:text-sm tw:p-2 tw:border"
				>
					<option value="USER">Usuário (USER)</option>
					<option value="ADMIN">Administrador (ADMIN)</option>
				</select>
				{errors.role && (
					<p className="tw:mt-1.5! tw:text-xs! tw:text-red-600">
						{errors.role.message}
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor="senha"
					className="tw:block tw:text-sm tw:font-medium tw:text-gray-700"
				>
					Senha
				</label>
				<input
					id="senha"
					type="password"
					placeholder="Mínimo 6 caracteres"
					{...register("senha")}
					className="tw:mt-1 tw:bg-white tw:block tw:text-sm! tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm tw:focus:border-blue-600 tw:focus:ring-blue-600 tw:sm:text-sm tw:p-2 tw:border"
				/>
				{errors.senha && (
					<p className="tw:mt-1.5! tw:text-xs! tw:text-red-600">
						{errors.senha.message}
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor="confirmarSenha"
					className="tw:block tw:text-sm tw:font-medium tw:text-gray-700"
				>
					Confirmar Senha
				</label>
				<input
					id="confirmarSenha"
					type="password"
					placeholder="Digite a senha novamente"
					{...register("confirmarSenha")}
					className="tw:mt-1 tw:bg-white tw:block tw:text-sm! tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm tw:focus:border-blue-600 tw:focus:ring-blue-600 tw:sm:text-sm tw:p-2 tw:border"
				/>
				{errors.confirmarSenha && (
					<p className="tw:mt-1.5! tw:text-xs! tw:text-red-600">
						{errors.confirmarSenha.message}
					</p>
				)}
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="tw:inline-flex tw:text-sm! tw:w-full tw:rounded-md! tw:justify-center tw:shadow-md! tw:border tw:border-transparent tw:bg-blue-600 tw:py-2 tw:px-4 tw:font-medium tw:text-white hover:tw:bg-blue-700 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500 focus:tw:ring-offset-2 disabled:tw:opacity-50"
			>
				{isLoading ? "Cadastrando..." : "Cadastrar Usuário"}
			</button>
		</form>
	);
}
