import { AppProps } from 'next/app';
import ThemeProvider from '../pages/context/ThemeContext';
import '../styles/globals.css';
const MyApp = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider>
        <Component {...pageProps} />
    </ThemeProvider>
);

export default MyApp;
