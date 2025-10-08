import { useState } from "react";
import AlunosTab from "../components/aluno";
import TurmasTab from "../components/turmas";

function Home() {
	const [selectedTab, setSelectedTab] = useState("Alunos");

	return (
		<div className="container flex-grow-1 mt-4 gap-3 d-flex flex-column align-items-center w-100">
			<section className="mx-auto container-xl border-0 d-flex justify-content-between align-items-center w-100 border-bottom border-2 p-2">
				<h1 className="fs-5 text-primary">Página Inicial</h1>
				<ul className="nav nav-pills nav-fill gap-2">
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
				</ul>
			</section>
			<section className="mx-auto container-xl d-flex flex-column gap-3 w-100">
				{selectedTab === "Alunos" && (
					<div className="gap-1 d-flex flex-column">
						<h2 className="fs-6">Lista Alunos</h2>
						<AlunosTab />
					</div>
				)}
				{selectedTab === "Turmas" && (
					<div className="gap-1 d-flex flex-column">
						<h2 className="fs-6">Lista de Turmas</h2>
						<TurmasTab />
					</div>
				)}
			</section>
		</div>
	);
}

export default Home;
