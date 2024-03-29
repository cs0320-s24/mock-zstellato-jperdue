import { Dispatch, SetStateAction, useState } from 'react';
import '../../styles/main.css';
import { ControlledInput } from '../ControlledInput';
import { commands } from './REPLFunction';

interface REPLInputProps{
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: [string, string [][]][],
  setHistory: Dispatch<SetStateAction<[string, string [][]][]>>,
  mode: boolean, // if true, brief, if false, verbose
  setMode: Dispatch<SetStateAction<boolean>>,
  loadedFile: string,
  setLoadedFile: Dispatch<SetStateAction<string>>,
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props : REPLInputProps) {
    // Remember: let React manage state in your webapp. 
    // Manages the contents of the input box
    const [commandString, setCommandString] = useState<string>('');
    const [count, setCount] = useState<number>(0)

    // Variable output to change given the command
  
    
    // This function is triggered when the button is clicked.
    function handleSubmit(commandString:string) {
      setCount(count+1)
      // CHANGED
      // props.setHistory([...props.history, commandString])
      // setCommandString('')
      const commandArgs: string[] = commandString.split(' ')
      const command: string = commandArgs[0]
      const args = commandArgs.slice(1)

      if (!(command in commands)){ // check if command in commands map
        props.setHistory([[commandString, [["Provided Command is Unknown"]]], ...props.history])
      }

      const useFunction = commands[command]
      const output = useFunction(args, props.mode, props.setMode, props.loadedFile, props.setLoadedFile)
      props.setHistory([[commandString, output], ...props.history])
    }
    /**
     * We suggest breaking down this component into smaller components, think about the individual pieces 
     * of the REPL and how they connect to each other...
     */
    return (
      <div className="repl-input">
        {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
        {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
        <fieldset>
          <legend>Enter a command:</legend>
          <ControlledInput
            value={commandString}
            setValue={setCommandString}
            ariaLabel={"Command input"}
          />
        </fieldset>
        {/* it used to say: Submitted {count} times but it was having errors during testing so I simplified to submit*/}
        <button onClick={() => handleSubmit(commandString)}>Submit</button>
      </div>
    );
  }