import { useTheme } from '../context/ThemeContext';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={`p-4 bg-gray-200 dark:bg-gray-800 flex justify-between items-center`}>
            <h1 className="text-xl font-bold">My Blog</h1>
            <button
                onClick={toggleTheme}
                className={`px-4 py-2 rounded-md text-white ${theme === 'light' ? 'bg-blue-500' : 'bg-blue-300'}`}
            >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
        </header>
    );
};

export default Header;
