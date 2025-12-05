import { Link, useNavigate } from "react-router-dom";
import {
	RegisterForm,
	type RegisterFormOutput,
} from "@/components/register/RegisterForm";
import useRegistro from "@/hooks/useRegistro";
import { useState } from "react";

export default function RegisterPage() {
	const navigate = useNavigate();
	const registro = useRegistro();

	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");

	const handleSubmit = (data: RegisterFormOutput) => {
		// Limpar mensagens anteriores
		setErrorMessage("");
		setSuccessMessage("");

		registro.mutate(data, {
			onSuccess: (response) => {
				if (response.valido) {
					setSuccessMessage(
						response.mensagem || "Cadastro realizado com sucesso!"
					);
					// Redirecionar para login após 2 segundos
					setTimeout(() => {
						navigate("/login");
					}, 2000);
				} else if (response.duplicado) {
					setErrorMessage(response.mensagem || "Email já cadastrado!");
				} else {
					setErrorMessage(response.mensagem || "Erro ao cadastrar usuário.");
				}
			},
			onError: (error) => {
				console.log("Erro ao registrar:", error);

				if (error instanceof Error) {
					setErrorMessage(error.message);
				} else {
					setErrorMessage("Erro ao cadastrar. Tente novamente.");
				}
			},
		});
	};

	return (
		<div className="tw:min-h-screen tw:bg-neutral-100 tw:flex tw:items-center tw:justify-center tw:p-6">
			<div className="tw:w-full tw:max-w-md">
				<div className="tw:w-full tw:outline tw:outline-neutral-300 tw:rounded-md tw:shadow-sm tw:bg-neutral-50 tw:p-6">
					<div className="tw:text-center tw:mb-6">
						<h1 className="tw:text-2xl! tw:text-blue-700! tw:font-bold tw:mb-0!">
							Criar Conta
						</h1>
						<p className="tw:text-sm tw:text-gray-600 tw:mt-1!">
							Preencha os dados para se cadastrar
						</p>
					</div>

					<RegisterForm
						onSubmit={handleSubmit}
						isLoading={registro.isPending}
						errorMessage={errorMessage}
						successMessage={successMessage}
					/>

					<div className="tw:mt-4 tw:text-center">
						<p className="tw:text-sm tw:text-gray-600">
							Já possui uma conta?{" "}
							<Link
								to="/login"
								className="tw:text-blue-600 hover:tw:text-blue-700 tw:font-medium"
							>
								Faça login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
