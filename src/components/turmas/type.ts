import type { Aluno } from "../aluno/type";

export interface Turma {
	id: number;
	ano: string;
	periodo: string;
	professor: Professor;
	disciplina: Disciplina;
	alunos: Aluno[];
}

export interface Professor {
	id: number;
	nome: string;
	email: string;
}

export interface Disciplina {
	id: number;
	nome: string;
	cargaHoraria: number;
}
