import '../styles/main.css';
import { BriefHistory } from './BriefHistory';
import { VerboseHistory } from './VerboseHistory';

interface REPLHistoryProps{
    // TODO: Fill with some shared state tracking all the pushed commands
    // CHANGED
    history: [string, string [][]][]
    mode: boolean
}


/**
 * REPL history function, returns all items that have been searched to be viewed by the user,
 * responses can be viewed in verbose or brief mode
 * @param props 
 * @returns 
 */
export function REPLHistory(props : REPLHistoryProps) {
    
    if (props.mode) { // if mode brief 
        return (

            <div className="repl-history" aria-label='repl-history'>
                {/* This is where command history will go */}
                {/* TODO: To go through all the pushed commands... try the .map() function! */}
                {/* CHANGED */}
                {props.history.map((command, output) => <BriefHistory history={[command[0], command[1]]}/>)}
            </div>
        );
    } else { // if mode verbose
        return (

            <div className="repl-history" aria-label='repl-history'>
                {/* This is where command history will go */}
                {/* TODO: To go through all the pushed commands... try the .map() function! */}
                {/* CHANGED */}
                {props.history.map((command, output) => <VerboseHistory history={[command[0], command[1]]}/>)}
            </div>
        );
    }
    
    
    
}

