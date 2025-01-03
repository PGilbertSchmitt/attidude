import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import { ThemeProvider } from './components/theme-provider';
import { SessionProvider } from './contexts/sessionContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StartPage } from '@/pages/start/startPage';
import { ChatPage } from './pages/chat/chatPage';
import { JoinPage } from './pages/join/joinPage';
import { Layout } from './components/layout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider defaultTheme='dark'>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route index Component={StartPage} />
                <Route path='/chat' Component={ChatPage} />
                <Route path='/join' Component={JoinPage} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default App
