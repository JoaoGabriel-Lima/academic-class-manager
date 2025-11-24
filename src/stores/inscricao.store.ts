import { create } from "zustand";

interface InscricaoState {
	selectedDisciplinaId: number | null;
	selectedTurmaId: number | null;
	selectedAlunoId: number | null;
	search: string;
	page: number;
	setSelectedDisciplinaId: (id: number | null) => void;
	setSelectedTurmaId: (id: number | null) => void;
	setSelectedAlunoId: (id: number | null) => void;
	setSearch: (search: string) => void;
	setPage: (page: number) => void;
}

export const useInscricaoStore = create<InscricaoState>((set) => ({
	selectedDisciplinaId: null,
	selectedTurmaId: null,
	selectedAlunoId: null,
	search: "",
	page: 1,
	setSelectedDisciplinaId: (id) =>
		set({ selectedDisciplinaId: id, selectedTurmaId: null }),
	setSelectedTurmaId: (id) => set({ selectedTurmaId: id }),
	setSelectedAlunoId: (id) => set({ selectedAlunoId: id }),
	setSearch: (search) => set({ search }),
	setPage: (page) => set({ page }),
}));
