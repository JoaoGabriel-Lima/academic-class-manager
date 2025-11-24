import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Aluno } from "../components/aluno/type";

const API_URL = "http://localhost:8080/api/alunos";

async function getAlunos(): Promise<Aluno[]> {
	const response = await fetch(API_URL);
	if (!response.ok) {
		throw new Error("Falha ao buscar alunos");
	}
	return response.json();
}

async function getAluno(id: number): Promise<Aluno> {
	const response = await fetch(`${API_URL}/${id}`);
	if (!response.ok) {
		throw new Error("Falha ao buscar aluno");
	}
	return response.json();
}

async function createAluno(aluno: Omit<Aluno, "id">): Promise<Aluno> {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(aluno),
	});
	if (!response.ok) {
		throw new Error("Falha ao criar aluno");
	}
	return response.json();
}

async function updateAluno(aluno: Aluno): Promise<Aluno> {
	const response = await fetch(`${API_URL}/${aluno.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(aluno),
	});
	if (!response.ok) {
		throw new Error("Falha ao atualizar aluno");
	}
	return response.json();
}

export function useGetAlunos() {
	return useQuery({
		queryKey: ["alunos"],
		queryFn: getAlunos,
	});
}

export function useGetAluno(id: number) {
	return useQuery({
		queryKey: ["alunos", id],
		queryFn: () => getAluno(id),
		enabled: !!id,
	});
}

export function useCreateAluno() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createAluno,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["alunos"] });
		},
	});
}

export function useUpdateAluno() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateAluno,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["alunos"] });
			queryClient.invalidateQueries({ queryKey: ["alunos", data.id] });
		},
	});
}
