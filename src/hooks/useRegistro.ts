import { useMutation } from "@tanstack/react-query";
import { URL_BASE } from "../util/constants";

export interface UsuarioRegistro {
	nome: string;
	email: string;
	senha: string;
}

export interface RegistroResponse {
	valido: boolean;
	duplicado: boolean;
	mensagem: string;
}


const useRegistro = () => {
	const registrarUsuario = async (
		usuario: UsuarioRegistro
	): Promise<RegistroResponse> => {
		const response = await fetch(`${URL_BASE}/usuarios`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(usuario),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.mensagem || "Erro ao registrar usuário.");
		}

		return data;
	};

	return useMutation({
		mutationFn: (usuario: UsuarioRegistro) => registrarUsuario(usuario),
	});
};

export default useRegistro;
