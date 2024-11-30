import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'
import { Start } from '@/components/pages/start/start';
import { ThemeProvider } from './components/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme='dark'>
      <BrowserRouter>
        <Routes>
          <Route index Component={Start} />
          <Route path='/chat' element={<p>Chat</p>} />
          <Route path='/join' element={<p>Join</p>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
