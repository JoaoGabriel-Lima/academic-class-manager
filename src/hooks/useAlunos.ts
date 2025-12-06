import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Aluno } from "../components/aluno/type";
import useApi from "./useApi";

export function useGetAlunos() {
	const { recuperarTodos } = useApi<Aluno>("/api/alunos");

	return useQuery({
		queryKey: ["alunos"],
		queryFn: recuperarTodos,
	});
}

export function useGetAluno(id: number) {
	const { recuperarPorId } = useApi<Aluno>("/api/alunos");

	return useQuery({
		queryKey: ["alunos", id],
		queryFn: () => recuperarPorId(id),
		enabled: !!id,
	});
}

export function useCreateAluno() {
	const { criar } = useApi<Aluno>("/api/alunos");
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: criar,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["alunos"] });
		},
	});
}

export function useUpdateAluno() {
	const { alterar } = useApi<Aluno>("/api/alunos");
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: alterar,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["alunos"] });
			queryClient.invalidateQueries({ queryKey: ["alunos", data.id] });
		},
	});
}

export function useDeleteAluno() {
	const { remover } = useApi<Aluno>("/api/alunos");
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: remover,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["alunos"] });
		},
	});
}
