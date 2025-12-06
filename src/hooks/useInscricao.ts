import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Aluno } from "../components/aluno/type";
import type { Disciplina, Turma } from "../components/turmas/type";
import useApi from "./useApi";
import useAuthFetch from "./useAuthFetch";

export function useGetDisciplinas() {
	const { recuperarTodos } = useApi<Disciplina>("/api/disciplinas");

	return useQuery({
		queryKey: ["disciplinas"],
		queryFn: recuperarTodos,
	});
}

export function useGetTurmasPorDisciplina(disciplinaId: number | null) {
	const { authFetch } = useAuthFetch();

	return useQuery({
		queryKey: ["turmas", "disciplina", disciplinaId],
		queryFn: async (): Promise<Turma[]> => {
			if (!disciplinaId) return [];
			const response = await authFetch(
				`http://localhost:8080/api/turmas/disciplina/${disciplinaId}`,
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
			const response = await authFetch(
				`http://localhost:8080/api/turmas/${turmaId}/alunos`,
			);
			if (!response.ok) throw new Error("Failed to fetch alunos inscritos");
			return response.json();
		},
		enabled: !!turmaId,
	});
}

export function useGetTodosAlunos() {
	const { recuperarTodos } = useApi<Aluno>("/api/alunos");

	return useQuery({
		queryKey: ["alunos", "todos"],
		queryFn: recuperarTodos,
	});
}

interface Inscricao {
	aluno: { id: number };
	turma: { id: number };
}

export function useInscreverAluno() {
	const { criar } = useApi<Inscricao>("/api/inscricoes");
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			alunoId,
			turmaId,
		}: {
			alunoId: number;
			turmaId: number;
		}) => {
			return criar({
				aluno: { id: alunoId },
				turma: { id: turmaId },
			} as Omit<Inscricao, "id">);
		},
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["alunos", "turma", variables.turmaId],
			});
		},
	});
}
