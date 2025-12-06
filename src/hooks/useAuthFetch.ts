import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useLoginStore from "@/stores/login.store";
import useTokenStore from "@/stores/token.store";

const useAuthFetch = () => {
	const setLoginInvalido = useLoginStore((s) => s.setLoginInvalido);
	const setMsg = useLoginStore((s) => s.setMsg);
	const tokenResponse = useTokenStore((s) => s.tokenResponse);
	const setTokenResponse = useTokenStore((s) => s.setTokenResponse);
	const navigate = useNavigate();

	const authFetch = async (url: string, options?: RequestInit) => {
		const token = tokenResponse.token;

		let newHeaders: Record<string, string> = {};
		if (options?.headers) {
			newHeaders = { ...(options.headers as Record<string, string>) };
		}

		if (token !== "") {
			newHeaders["Authorization"] = `Bearer ${token}`;
		}

		options = { ...(options || {}), headers: newHeaders };

		const response = await fetch(url, { ...options });

		if (!response.ok) {
			console.log("Ocorreu um erro com status = ", response.status);

			if (response.status === 401) {
				setLoginInvalido(true);
				setMsg("É preciso efetuar login para acessar este recurso.");
				toast.error("É preciso efetuar login para acessar este recurso.");
				setTokenResponse({ token: "", idUsuario: 0, nome: "", role: "" });
				navigate("/login");
			} else if (response.status === 403) {
				setLoginInvalido(true);
				setMsg("403 - Você não tem permissão para acessar este recurso.");
				toast.error("403 - Você não tem permissão para acessar este recurso.");
				setTokenResponse({ token: "", idUsuario: 0, nome: "", role: "" });
				navigate("/login");
			} else {
				const error: Error = await response.json().catch(() => ({}));
				toast.error(
					`Erro: Este aluno está inscrito em uma turma ` +
						" - Status code: " +
						response.status,
				);
				if (error) throw error;
				else
					throw new Error(
						"Erro desconhecido: " + " - Status code: " + response.status,
					);
			}
		}
		return response;
	};

	return { authFetch };
};
export default useAuthFetch;
