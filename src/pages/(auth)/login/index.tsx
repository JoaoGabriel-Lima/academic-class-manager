import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/login/LoginForm";
import useEfetuarLogin from "@/hooks/useLogin";
import useTokenStore from "@/stores/token.store";
import useLoginStore from "@/stores/login.store";


interface LocationState {
	destino?: string;
}

export default function LoginPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const state = location.state as LocationState | null;

	const efetuarLogin = useEfetuarLogin();
	const setTokenResponse = useTokenStore((s) => s.setTokenResponse);
	const { loginInvalido, msg, setLoginInvalido, setMsg} = useLoginStore();


	const handleSubmit = (data: { email: string; senha: string }) => {
		// Limpar erro anterior
		setLoginInvalido(false);
		setMsg("");

		efetuarLogin.mutate(data, {
			onSuccess: (response) => {
				setTokenResponse({
					token: response.token,
					idUsuario: response.idUsuario,
					nome: response.nome,
					role: response.role,
				});

				// Redirecionar para o destino original ou para a home
				const destino = state?.destino || "/";
                setLoginInvalido(false);
                setMsg("");
				navigate(destino, { replace: true });
			},
			onError: (error) => {
				console.log("Erro ao efetuar login:", error);
				setLoginInvalido(true);

				if (error instanceof Error) {
					if (error.message.includes("401")) {
						setMsg("Email ou senha inválidos.");

					} else {
						setMsg(error.message);

					}
				} else {
					setMsg("Erro ao efetuar login. Tente novamente.");

				}
			},
		});
	};

	return (
		<div className="tw:min-h-screen tw:bg-neutral-100 tw:flex tw:items-center tw:justify-center tw:p-6">
			<div className="tw:w-full tw:max-w-md">
				<div className="tw:w-full tw:outline tw:outline-neutral-300 tw:rounded-md tw:shadow-sm tw:bg-neutral-50 tw:p-6">
					<div className="tw:text-center tw:mb-6">
						<h1 className="tw:text-2xl! tw:text-blue-700! tw:font-bold tw:mb-0!">
							Sistema de Gestão Acadêmica
						</h1>
						<p className="tw:text-sm tw:text-gray-600 tw:mt-1!">
							Acesse sua conta para continuar
						</p>
					</div>

					<LoginForm
						onSubmit={handleSubmit}
						isLoading={efetuarLogin.isPending}
						errorMessage={loginInvalido ? msg : undefined}
					/>

					<div className="tw:mt-4 tw:text-center">
						<p className="tw:text-sm tw:text-gray-600">
							Não possui uma conta?{" "}
							<Link
								to="/register"
								className="tw:text-blue-600 hover:tw:text-blue-700 tw:font-medium"
							>
								Cadastre-se
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
