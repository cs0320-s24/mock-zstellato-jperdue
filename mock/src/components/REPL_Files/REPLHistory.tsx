import '../../styles/main.css';
import { BriefHistory } from '../Histories/BriefHistory';
import { VerboseHistory } from '../Histories/VerboseHistory';

interface REPLHistoryProps{
    // CHANGED
    history: [string, string [][]][]
    mode: boolean
}


/**
 * REPL history function, returns all items that have been searched to be viewed by the user,
 * responses can be viewed in verbose or brief mode
 * @param props 
 * @returns  the output of the history, a short version if mode is brief (true) and long version if mode is verbose (false)
 */
export function REPLHistory(props : REPLHistoryProps) {
    
    if (props.mode) { // if mode brief 
        return (

            <div className="repl-history" aria-label='repl-history'>
                {/* This is where command history will go */}
                {/* CHANGED */}
                {props.history.map((command, output) => <BriefHistory history={[command[0], command[1]]}/>)}
            </div>
        );
    } else { // if mode verbose
        return (

            <div className="repl-history" aria-label='repl-history'>
                {/* This is where command history will go */}
                {/* CHANGED */}
                {props.history.map((command, output) => <VerboseHistory history={[command[0], command[1]]}/>)}
            </div>
        );
    }
    
    
    
}

