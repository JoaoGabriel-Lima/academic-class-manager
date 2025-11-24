export default function Navbar({
	setSelectedTab,
	selectedTab,
}: {
	setSelectedTab: (tab: string) => void;
	selectedTab: string;
}) {
	return (
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
						Gerenciar Grupos
					</button>
				</li>
			</ul>
		</section>
	);
}
