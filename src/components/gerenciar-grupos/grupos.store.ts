import { create } from "zustand";
import { persist } from "zustand/middleware";

type GruposPorTurma = {
	[turmaId: string]: string[];
};

interface GruposState {
	grupos: GruposPorTurma;

	adicionarAluno: (turmaId: string, alunoId: string) => void;

	removerAluno: (turmaId: string, alunoId: string) => void;

	obterAlunos: (turmaId: string) => string[];

	definirAlunos: (turmaId: string, alunoIds: string[]) => void;

	limparTurma: (turmaId: string) => void;

	limparTudo: () => void;
}

export const useGruposStore = create<GruposState>()(
	persist(
		(set, get) => ({
			grupos: {},

			adicionarAluno: (turmaId: string, alunoId: string) =>
				set((state) => ({
					grupos: {
						...state.grupos,
						[turmaId]: [...(state.grupos[turmaId] || []), alunoId],
					},
				})),

			removerAluno: (turmaId: string, alunoId: string) =>
				set((state) => ({
					grupos: {
						...state.grupos,
						[turmaId]: (state.grupos[turmaId] || []).filter(
							(id) => id !== alunoId,
						),
					},
				})),

			obterAlunos: (turmaId: string) => {
				return get().grupos[turmaId] || [];
			},

			definirAlunos: (turmaId: string, alunoIds: string[]) =>
				set((state) => ({
					grupos: {
						...state.grupos,
						[turmaId]: alunoIds,
					},
				})),

			limparTurma: (turmaId: string) =>
				set((state) => {
					const novosGrupos = { ...state.grupos };
					delete novosGrupos[turmaId];
					return { grupos: novosGrupos };
				}),

			limparTudo: () => set({ grupos: {} }),
		}),
		{
			name: "grupos-storage",
		},
	),
);
