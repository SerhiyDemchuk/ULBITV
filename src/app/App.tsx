import './styles/index.scss';
import { Link } from 'react-router-dom';
import { AppRouter } from './providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';

const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Link to="/">Главная</Link>
      <Link to="/about">О сайте</Link>
      <AppRouter />
    </div>
  )
}

export default App;
