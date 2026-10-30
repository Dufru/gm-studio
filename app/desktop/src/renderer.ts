import React from 'react';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento root não encontrado.');
}

const params = new URLSearchParams(window.location.search);
const isSplash = params.get('screen') === 'splash';
const root = createRoot(rootElement);

if (isSplash) {
  document.documentElement.classList.add('splash-document');
  void import('./components/splash/splash.css').then(async () => {
    const { default: SplashScreen } =
      await import('./components/splash/SplashScreen');
    root.render(React.createElement(SplashScreen));
  });
} else {
  void import('./App').then(({ default: App }) => {
    function MainApp() {
      useEffect(() => {
        window.gmStudio.mainWindowReady();
      }, []);

      return React.createElement(App);
    }

    root.render(React.createElement(MainApp));
  });
}
