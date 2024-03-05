import { useState } from 'react';
import '../styles/App.css';
import { LoginButton } from './LoginButton';
import REPL from './REPL_Files/REPL';

/**
 * This is the highest level component!
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mock</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>

      { isLoggedIn && <REPL /> }
    </div>
  );
}

export default App;