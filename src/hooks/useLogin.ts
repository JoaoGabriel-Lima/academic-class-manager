import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useTokenStore from "@/stores/token.store";
import { URL_AUTENTICACAO, URL_BASE } from "../util/constants";
import isErrorResponse from "../util/isErrorResponse";

interface UsuarioLogin {
	email: string;
	senha: string;
}

export const useLogout = () => {
	const { setTokenResponse } = useTokenStore((s) => s);
	const navigate = useNavigate();
	return () => {
		setTokenResponse({ token: "", idUsuario: 0, nome: "", role: "" });
		navigate("/login");
	};
};

const useEfetuarLogin = () => {
	const efetuarLogin = async (usuarioLogin: UsuarioLogin) => {
		const response = await fetch(`${URL_BASE}${URL_AUTENTICACAO}/login`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(usuarioLogin),
		});

		if (!response.ok) {
			const error: unknown = await response.json().catch(() => ({}));
			console.log("dentro de useEfetuarLogin - error = ", error);

			if (error) {
				if (isErrorResponse(error)) {
					throw error;
				} else {
					throw new Error(
						"Erro desconhecido ao efetuar login. Status code = " +
							response.status,
					);
				}
			} else {
				if (response.status === 401) {
					console.log("O status code do erro que ocorreu é " + response.status);
					throw new Error(
						"Erro ao efetuar login. Status code = " + response.status,
					);
				} else {
					throw new Error(
						"Erro desconhecido ao efetuar login. Status code = " +
							response.status,
					);
				}
			}
		}

		return await response.json();
	};

	return useMutation({
		mutationFn: (usuarioLogin: UsuarioLogin) => efetuarLogin(usuarioLogin),
	});
};

export default useEfetuarLogin;
