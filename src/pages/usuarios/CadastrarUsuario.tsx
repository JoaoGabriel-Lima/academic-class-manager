import { useState } from "react";
import useCreateUser from "@/hooks/useCreateUser";
import {
	CreateUserForm,
	type CreateUserFormOutput,
} from "../../components/admin/CreateUserForm";

export default function CadastrarUsuario() {
	const createUser = useCreateUser();

	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");

	const handleSubmit = (data: CreateUserFormOutput) => {
		// Limpar mensagens anteriores
		setErrorMessage("");
		setSuccessMessage("");

		createUser.mutate(data, {
			onSuccess: (response) => {
				if (response.valido) {
					setSuccessMessage(
						response.mensagem || "Usuário cadastrado com sucesso!",
					);
				} else if (response.duplicado) {
					setErrorMessage(response.mensagem || "Email já cadastrado!");
				} else {
					setErrorMessage(response.mensagem || "Erro ao cadastrar usuário.");
				}
			},
			onError: (error) => {
				console.log("Erro ao cadastrar usuário:", error);

				if (error instanceof Error) {
					setErrorMessage(error.message);
				} else {
					setErrorMessage("Erro ao cadastrar. Tente novamente.");
				}
			},
		});
	};

	return (
		<div className="tw:w-full! ">
			<div className="tw:w-full tw:outline tw:outline-neutral-300 tw:rounded-md tw:shadow-sm tw:bg-neutral-50 tw:p-6">
				<div className="tw:mb-4">
					<h2 className="tw:text-lg! tw:text-blue-700! tw:font-bold tw:mb-0!">
						Cadastrar Novo Usuário
					</h2>
					<p className="tw:text-sm tw:text-gray-600 tw:mt-1!">
						Crie uma conta de usuário ou administrador
					</p>
				</div>

				<CreateUserForm
					onSubmit={handleSubmit}
					isLoading={createUser.isPending}
					errorMessage={errorMessage}
					successMessage={successMessage}
				/>
			</div>
		</div>
	);
}
