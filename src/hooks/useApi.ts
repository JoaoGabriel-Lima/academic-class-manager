import { URL_BASE } from "../util/constants";
import useAuthFetch from "./useAuthFetch";

interface ResultadoPaginado<T> {
	totalDeItens: number;
	totalDePaginas: number;
	paginaCorrente: number;
	itens: T[];
}

const useApi = <T>(endpoint: string) => {
	const { authFetch } = useAuthFetch();
	const URL = `${URL_BASE}${endpoint}`;

	const recuperarTodos = async (): Promise<T[]> => {
		const response = await authFetch(URL);
		if (!response.ok) {
			const error: Error = await response.json().catch(() => ({}));
			if (error) throw error;
			else
				throw new Error(
					"Erro desconhecido: " + " - Status code: " + response.status,
				);
		}
		return await response.json();
	};

	const recuperarPorId = async (id: number | string): Promise<T> => {
		const response = await authFetch(`${URL}/${id}`);
		if (!response.ok) {
			const error: Error = await response.json().catch(() => ({}));
			if (error) throw error;
			else
				throw new Error(
					"Erro desconhecido: " + " - Status code: " + response.status,
				);
		}
		return await response.json();
	};

	const criar = async (obj: Omit<T, "id">): Promise<T> => {
		const response = await authFetch(URL, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(obj),
		});
		if (!response.ok) {
			const error: Error = await response.json().catch(() => ({}));
			if (error) throw error;
			else
				throw new Error(
					"Erro desconhecido: " + " - Status code: " + response.status,
				);
		}
		return await response.json();
	};

	const alterar = async (obj: T & { id: number | string }): Promise<T> => {
		const response = await authFetch(`${URL}/${obj.id}`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(obj),
		});
		if (!response.ok) {
			const error: Error = await response.json().catch(() => ({}));
			if (error) throw error;
			else
				throw new Error(
					"Erro desconhecido: " + " - Status code: " + response.status,
				);
		}
		return await response.json();
	};

	const remover = async (id: number | string): Promise<void> => {
		const response = await authFetch(`${URL}/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) {
			const error: Error = await response.json().catch(() => ({}));
			if (error) throw error;
			else
				throw new Error(
					"Erro desconhecido: " + " - Status code: " + response.status,
				);
		}
	};

	const recuperarComPaginacao = async (
		queryString: Record<string, string>,
	): Promise<ResultadoPaginado<T>> => {
		const response = await authFetch(
			`${URL}/paginacao?` + new URLSearchParams({ ...queryString }),
		);
		if (!response.ok) {
			const error: Error = await response.json().catch(() => ({}));
			if (error) throw error;
			else
				throw new Error(
					"Erro desconhecido: " + " - Status code: " + response.status,
				);
		}
		return await response.json();
	};

	return {
		recuperarTodos,
		recuperarPorId,
		criar,
		alterar,
		remover,
		recuperarComPaginacao,
	};
};
export default useApi;
