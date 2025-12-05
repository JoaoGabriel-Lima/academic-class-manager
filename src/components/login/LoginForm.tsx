import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().min(1, "Informe o email.").email("Informe um email válido."),
	senha: z.string().min(1, "Informe a senha."),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
	onSubmit: (data: LoginFormData) => void;
	isLoading?: boolean;
	errorMessage?: string;
}

export function LoginForm({ onSubmit, isLoading, errorMessage }: LoginFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			senha: "",
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="tw:space-y-4">
			{errorMessage && (
				<div className="tw:bg-red-50 tw:border tw:border-red-300 tw:text-red-700 tw:px-4 tw:py-3 tw:rounded-md tw:text-sm">
					{errorMessage}
				</div>
			)}

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
					htmlFor="senha"
					className="tw:block tw:text-sm tw:font-medium tw:text-gray-700"
				>
					Senha
				</label>
				<input
					id="senha"
					type="password"
					placeholder="Digite sua senha"
					{...register("senha")}
					className="tw:mt-1 tw:bg-white tw:block tw:text-sm! tw:w-full tw:rounded-md tw:border-gray-300 tw:shadow-sm tw:focus:border-blue-600 tw:focus:ring-blue-600 tw:sm:text-sm tw:p-2 tw:border"
				/>
				{errors.senha && (
					<p className="tw:mt-1.5! tw:text-xs! tw:text-red-600">
						{errors.senha.message}
					</p>
				)}
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="tw:inline-flex tw:text-sm! tw:w-full tw:rounded-md! tw:justify-center tw:shadow-md! tw:border tw:border-transparent tw:bg-blue-600 tw:py-2 tw:px-4 tw:font-medium tw:text-white hover:tw:bg-blue-700 focus:tw:outline-none focus:tw:ring-2 focus:tw:ring-blue-500 focus:tw:ring-offset-2 disabled:tw:opacity-50"
			>
				{isLoading ? "Entrando..." : "Entrar"}
			</button>
		</form>
	);
}
