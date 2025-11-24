import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Turma from "./pages/Turma";
import "./App.css";
import AlunoPage from "./pages/alunos/AlunoPage";
import CadastroDeAlunosPage from "./pages/alunos/CadastroDeAlunosPage";
import EditarAlunoPage from "./pages/alunos/EditarAlunoPage";
import InscricaoAlunoPage from "./pages/inscricao/InscricaoAlunoPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/turma/:id" element={<Turma />} />
				<Route path="/alunos/cadastro" element={<CadastroDeAlunosPage />} />
				<Route path="/alunos/:id" element={<AlunoPage />} />
				<Route path="/alunos/:id/editar" element={<EditarAlunoPage />} />
				<Route path="/inscricao" element={<InscricaoAlunoPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
