import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Aluno } from "../components/aluno/type";
import useAuthFetch from "./useAuthFetch";

const API_URL = "http://localhost:8080/api/alunos";

export function useGetAlunos() {
	const { authFetch } = useAuthFetch();

	return useQuery({
		queryKey: ["alunos"],
		queryFn: async (): Promise<Aluno[]> => {
			const response = await authFetch(API_URL);
			if (!response) throw new Error("Falha ao buscar alunos");
			return response.json();
		},
	});
}

export function useGetAluno(id: number) {
	const { authFetch } = useAuthFetch();

	return useQuery({
		queryKey: ["alunos", id],
		queryFn: async (): Promise<Aluno> => {
			const response = await authFetch(`${API_URL}/${id}`);
			if (!response) throw new Error("Falha ao buscar aluno");
			return response.json();
		},
		enabled: !!id,
	});
}

export function useCreateAluno() {
	const { authFetch } = useAuthFetch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (aluno: Omit<Aluno, "id">): Promise<Aluno> => {
			const response = await authFetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(aluno),
			});
			if (!response) throw new Error("Falha ao criar aluno");
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["alunos"] });
		},
	});
}

export function useUpdateAluno() {
	const { authFetch } = useAuthFetch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (aluno: Aluno): Promise<Aluno> => {
			const response = await authFetch(`${API_URL}/${aluno.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(aluno),
			});
			if (!response) throw new Error("Falha ao atualizar aluno");
			return response.json();
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["alunos"] });
			queryClient.invalidateQueries({ queryKey: ["alunos", data.id] });
		},
	});
}

export function useDeleteAluno() {
	const { authFetch } = useAuthFetch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: number): Promise<void> => {
			const response = await authFetch(`${API_URL}/${id}`, {
				method: "DELETE",
			});
			if (!response) throw new Error("Falha ao deletar aluno");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["alunos"] });
		},
	});
}
