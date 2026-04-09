import { useForm } from 'react-hook-form';
import { useNavigate, Navigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import type { AuthUser } from '../../types';
import logo from '../../assets/logo-tech-do-bem.webp';

type LoginForm = {
  login: string;
  senha: string;
};

// Hardcoded credentials for local testing
const USERS: Record<string, AuthUser> = {
  dentista: { id: 'den-1', nome: 'Dr. Felipe Mendes', role: 'dentista' },
  colaborador: { id: 'col-1', nome: 'Ana Lima', role: 'colaborador' },
};

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  // If already authenticated, redirect to the correct dashboard
  if (user) return <Navigate to={`/${user.role}`} replace />;

  const onSubmit = (data: LoginForm) => {
    const found = USERS[data.login];
    if (!found || data.senha !== '1234') {
      setError('senha', { message: 'Login ou senha inválidos.' });
      return;
    }
    login(found);
    navigate(`/${found.role}`);
  };

  return (
    <div className="min-h-screen bg-[#f1f1f1] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <img src={logo} alt="Tech do Bem" className="h-20 w-auto mb-4" />
          <h1 className="title3 font-bold text-center">Tech do Bem</h1>
          <p className="text-sm text-[#232323] mt-1">Sistema de Gestão Odontológica</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <h2 className="text-lg font-semibold text-[#641226] mb-6">Entrar na plataforma</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="login" className="block text-sm font-medium text-[#232323] mb-1">
                Login
              </label>
              <input
                id="login"
                type="text"
                placeholder="colaborador ou dentista"
                {...register('login', { required: 'Informe o login.' })}
                className="w-full px-4 py-2.5 bg-[#f1f1f1] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d] focus:border-transparent"
              />
              {errors.login && (
                <p className="text-xs text-red-600 mt-1">{errors.login.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-[#232323] mb-1">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                placeholder="••••••"
                {...register('senha', { required: 'Informe a senha.' })}
                className="w-full px-4 py-2.5 bg-[#f1f1f1] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#da345d] focus:border-transparent"
              />
              {errors.senha && (
                <p className="text-xs text-red-600 mt-1">{errors.senha.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#da345d] hover:bg-[#641226] text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              Entrar
            </button>
          </form>

          <p className="text-xs text-[#d4d4d4] text-center mt-6">
            Acesso de teste: <strong>colaborador</strong> / <strong>dentista</strong> — senha: <strong>1234</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
