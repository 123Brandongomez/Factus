import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 text-white bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors shadow"
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {theme === 'dark' ? (
        <Sun size={18} className="text-yellow-300" />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
};

export default ThemeToggle;
