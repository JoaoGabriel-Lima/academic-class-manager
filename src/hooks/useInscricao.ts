import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Aluno } from "../components/aluno/type";
import type { Disciplina, Turma } from "../components/turmas/type";
import useAuthFetch from "./useAuthFetch";

const API_BASE_URL = "http://localhost:8080/api";

export function useGetDisciplinas() {
	const { authFetch } = useAuthFetch();
	return useQuery({
		queryKey: ["disciplinas"],
		queryFn: async (): Promise<Disciplina[]> => {
			const response = await authFetch(`${API_BASE_URL}/disciplinas`);
			if (!response.ok) throw new Error("Failed to fetch disciplinas");
			return response.json();
		},
	});
}

export function useGetTurmasPorDisciplina(disciplinaId: number | null) {
	const { authFetch } = useAuthFetch();
	return useQuery({
		queryKey: ["turmas", "disciplina", disciplinaId],
		queryFn: async (): Promise<Turma[]> => {
			if (!disciplinaId) return [];
			const response = await authFetch(
				`${API_BASE_URL}/turmas/disciplina/${disciplinaId}`,
			);
			if (!response.ok) throw new Error("Failed to fetch turmas");
			return response.json();
		},
		enabled: !!disciplinaId,
	});
}

export function useGetAlunosInscritos(turmaId: number | null) {
	const { authFetch } = useAuthFetch();
	return useQuery({
		queryKey: ["alunos", "turma", turmaId],
		queryFn: async (): Promise<Aluno[]> => {
			if (!turmaId) return [];
			const response = await authFetch(`${API_BASE_URL}/turmas/${turmaId}/alunos`);
			if (!response.ok) throw new Error("Failed to fetch alunos inscritos");
			return response.json();
		},
		enabled: !!turmaId,
	});
}

export function useGetTodosAlunos() {
	const { authFetch } = useAuthFetch();
	return useQuery({
		queryKey: ["alunos", "todos"],
		queryFn: async (): Promise<Aluno[]> => {
			const response = await authFetch(`${API_BASE_URL}/alunos`);
			if (!response.ok) throw new Error("Failed to fetch todos alunos");
			return response.json();
		},
	});
}

export function useInscreverAluno() {
	const { authFetch } = useAuthFetch();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			alunoId,
			turmaId,
		}: {
			alunoId: number;
			turmaId: number;
		}) => {
			const response = await authFetch(`${API_BASE_URL}/inscricoes`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					aluno: { id: alunoId },
					turma: { id: turmaId },
				}),
			});
			if (!response.ok) throw new Error("Failed to inscrever aluno");
			return response.json();
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["alunos", "turma", variables.turmaId],
			});
		},
	});
}
