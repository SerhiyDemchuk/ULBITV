import './styles/index.scss';
import { Suspense, useEffect } from 'react';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { AppRouter } from './providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';

function App() {
  const { theme } = useTheme();
  useEffect(() => {
    if (Math.random() < 0.5) {
      throw new Error();
    }
  }, [])
  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
