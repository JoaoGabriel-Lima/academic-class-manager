import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Turma from "./pages/Turma";
import "./App.css";
import LoginPage from "./pages/(auth)/login";
import RegisterPage from "./pages/(auth)/register";
import AlunoPage from "./pages/alunos/AlunoPage";
import CadastroDeAlunosPage from "./pages/alunos/CadastroDeAlunosPage";
import EditarAlunoPage from "./pages/alunos/EditarAlunoPage";
import InscricaoAlunoPage from "./pages/inscricao/InscricaoAlunoPage";
import CadastrarUsuario from "./pages/usuarios/CadastrarUsuario";
import PrivateRoutes from "./routes/private-routes";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				{/* Rotas protegidas */}
				<Route element={<PrivateRoutes />}>
					<Route path="/" element={<Home />} />
					<Route path="/turma/:id" element={<Turma />} />˜
					<Route path="/alunos/:id" element={<AlunoPage />} />
					<Route path="/alunos/cadastro" element={<CadastroDeAlunosPage />} />
					<Route path="/alunos/:id/editar" element={<EditarAlunoPage />} />
					<Route path="/inscricao" element={<InscricaoAlunoPage />} />
					<Route path="/usuarios/cadastro" element={<CadastrarUsuario />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
