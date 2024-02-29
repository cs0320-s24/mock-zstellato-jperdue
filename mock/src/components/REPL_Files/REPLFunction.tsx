import { Dispatch, SetStateAction, useState } from 'react';
import '../../styles/main.css';
import { filepath_data_map } from '../../data/mockedData';


/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when 
 * the command is done executing.
 * 
 * The arguments passed in the input (which need not be named "args") should 
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {    
    (args: Array<string>, mode: boolean, setMode: Dispatch<SetStateAction<boolean>>): String|String[][]
}

export const commands: { [key: string]: REPLFunction} = {
    mode: (args: string[], mode: boolean, setMode: Dispatch<SetStateAction<boolean>>) => handleMode(args, mode, setMode)
}

function handleMode(args: Array<string>, mode: boolean, setMode: Dispatch<SetStateAction<boolean>>): String|String[][] {
    if (mode){ // if mode is true, the mode is brief, this means we will switch to verbose mode
        setMode(false)
        return "Mode set to Verbose"
      } else {
        setMode(true)
        return "Mode set to Brief"
      }
}


