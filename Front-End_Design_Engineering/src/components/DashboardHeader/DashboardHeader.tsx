import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo-tech-do-bem.webp';

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-linear-to-r from-[#641226] to-[#da345d] text-white shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Tech do Bem" className="h-10 w-auto" />
          <div>
            <p className="font-semibold leading-tight">Tech do Bem</p>
            <p className="text-xs opacity-80">{user?.nome}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors rounded-full px-4 py-1.5 text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </header>
  );
}
