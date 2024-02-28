import { useState } from 'react';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {
  // TODO: Add some kind of shared state that holds all the commands submitted.
  // CHANGED
  const [history, setHistory] = useState<[string, string [][]][]>([]) // generically have an empty history
  const [mode, setMode] = useState<boolean>(true) // generically set mode to true, meaning it is brief mode

  return (
    <div className="repl">  
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      <REPLHistory 
        history={history}
        mode = {mode}/>
      <hr></hr>
      {/* CHANGED */}
      <REPLInput 
        history={history} 
        setHistory={setHistory} 
        mode={mode} 
        setMode={setMode}/>
    </div>
  );
}
