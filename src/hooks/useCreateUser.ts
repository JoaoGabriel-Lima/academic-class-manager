import { useMutation } from "@tanstack/react-query";
import useApi from "./useApi";

export interface CreateUserData {
	nome: string;
	email: string;
	senha: string;
	role: "USER" | "ADMIN";
}

export interface CreateUserResponse {
	valido: boolean;
	duplicado: boolean;
	mensagem: string;
}

const useCreateUser = () => {
	const { criar } = useApi<CreateUserResponse>("/usuarios/admin");

	return useMutation({
		mutationFn: (usuario: CreateUserData) =>
			criar(usuario as unknown as Omit<CreateUserResponse, "id">),
	});
};

export default useCreateUser;
