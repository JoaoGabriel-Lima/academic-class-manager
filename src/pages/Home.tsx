import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GerenciarGrupos from "@/components/gerenciar-grupos";
import { useLogout } from "@/hooks/useLogin";
import CadastrarUsuario from "@/pages/usuarios/CadastrarUsuario";
import useTokenStore from "@/stores/token.store";
import AlunosTab from "../components/aluno";
import BuscarTurmas from "../components/buscar-turmas";
import TurmasTab from "../components/turmas";

function Home() {
	const [selectedTab, setSelectedTab] = useState("Alunos");
	const logout = useLogout();
	const { nome, role } = useTokenStore((s) => s.tokenResponse);
	const navigate = useNavigate();
	const isAdmin = role === "ADMIN";

	return (
		<div className="container flex-grow-1 mt-4 gap-3 d-flex flex-column align-items-center w-100">
			<section className="mx-auto container-xl border-0 d-flex justify-content-between align-items-center w-100 border-bottom border-2 p-2">
				<h1>
					<span className="fs-5 text-primary">Página Inicial</span>
					{/** biome-ignore lint/a11y/useKeyWithClickEvents: Mesclar com o H1 pai */}
					{/** biome-ignore lint/a11y/noStaticElementInteractions: Mesclar com o H1 pai */}
					<span
						onClick={logout}
						className="tw:bg-blue-500! tw:hover:bg-blue-600! tw:transition-all tw:cursor-pointer tw:text-white tw:px-1 tw:py-0.5 tw:ml-1.5 tw:text-sm tw:rounded!"
					>
						{nome} <span className="tw:font-bold">({role})</span>
					</span>
				</h1>
				<ul className="nav nav-pills nav-fill justify-content-end gap-2">
					<li className="nav-item">
						<button
							onClick={() => setSelectedTab("Alunos")}
							type="button"
							className={`nav-link ${selectedTab === "Alunos" ? "active" : ""}`}
						>
							Alunos
						</button>
					</li>
					<li className="nav-item">
						<button
							onClick={() => setSelectedTab("Turmas")}
							type="button"
							className={`nav-link ${selectedTab === "Turmas" ? "active" : ""}`}
						>
							Turmas
						</button>
					</li>
					<li className="nav-item">
						<button
							onClick={() => navigate("/inscricao")}
							type="button"
							className={`nav-link`}
						>
							Inscrições
						</button>
					</li>
					<li className="nav-item">
						<button
							onClick={() => setSelectedTab("Buscar-Turmas")}
							type="button"
							className={`nav-link ${selectedTab === "Buscar-Turmas" ? "active" : ""}`}
						>
							Buscar Turmas
						</button>
					</li>
					<li className="nav-item">
						<button
							onClick={() => setSelectedTab("Gerenciar-Grupos")}
							type="button"
							className={`nav-link ${selectedTab === "Gerenciar-Grupos" ? "active" : ""}`}
						>
							Grupos
						</button>
					</li>
					{isAdmin && (
						<li className="nav-item">
							<button
								onClick={() => setSelectedTab("Cadastrar-Usuario")}
								type="button"
								className={`nav-link ${selectedTab === "Cadastrar-Usuario" ? "active" : ""}`}
							>
								Cadastrar Usuário
							</button>
						</li>
					)}
				</ul>
			</section>
			<section className="mx-auto container-xl d-flex flex-column gap-3 w-100">
				{selectedTab === "Alunos" && (
					<div className="gap-1 d-flex flex-column">
						<div className="tw:w-full tw:flex tw:justify-between tw:items-center! tw:mb-4!">
							<h2 className="fs-6 tw:mb-0!">Lista Alunos</h2>
							<Link to="/alunos/cadastro">
								<button type="button" className="btn btn-secondary btn-sm">
									Adicionar Aluno
								</button>
							</Link>
						</div>
						<AlunosTab />
					</div>
				)}
				{selectedTab === "Turmas" && (
					<div className="gap-1 d-flex flex-column">
						<h2 className="fs-6">Lista de Turmas</h2>
						<TurmasTab />
					</div>
				)}
				{selectedTab === "Buscar-Turmas" && (
					<div className="gap-1 d-flex flex-column">
						<h2 className="fs-6">Pesquisa de Turmas</h2>
						<BuscarTurmas />
					</div>
				)}
				{selectedTab === "Gerenciar-Grupos" && (
					<div className="gap-1 d-flex flex-column">
						<h2 className="fs-6">Gerenciar Grupos</h2>
						<GerenciarGrupos />
					</div>
				)}
				{isAdmin && selectedTab === "Cadastrar-Usuario" && (
					<div className="gap-1 d-flex flex-column">
						<h2 className="fs-6">Cadastrar Usuário</h2>
						<CadastrarUsuario />
					</div>
				)}
			</section>
		</div>
	);
}

export default Home;
