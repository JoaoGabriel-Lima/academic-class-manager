import type { Aluno } from "../aluno/type";

export interface Turma {
	id: number;
	ano: string;
	periodo: string;
	professor: Professor;
	alunos: Aluno[];
}

export interface Professor {
	id: number;
	nome: string;
	email: string;
}
