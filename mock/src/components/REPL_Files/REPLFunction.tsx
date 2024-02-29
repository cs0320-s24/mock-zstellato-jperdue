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
    (args: Array<string>, 
    mode: boolean, // if true, brief, if false, verbose
    setMode: Dispatch<SetStateAction<boolean>>,
    loadedFile: string,
    setLoadedFile: Dispatch<SetStateAction<string>>): string[][]
}

export const commands: { [key: string]: REPLFunction} = {
    mode: (args: string[], 
      mode: boolean, 
      setMode: Dispatch<SetStateAction<boolean>>, 
      loadedFile: string, 
      setLoadedFile: Dispatch<SetStateAction<string>>) => handleMode(args, mode, setMode, loadedFile, setLoadedFile),
    load_csv: (args: string[], 
      mode: boolean, 
      setMode: Dispatch<SetStateAction<boolean>>, 
      loadedFile: string, 
      setLoadedFile: Dispatch<SetStateAction<string>>) => handleLoad(args, mode, setMode, loadedFile, setLoadedFile)
}

export function hasCommand(input: string) {
  return input in commands
}

function handleMode(
  args: Array<string>, 
  mode: boolean, // if true, brief, if false, verbose
  setMode: Dispatch<SetStateAction<boolean>>,
  loadedFile: string,
  setLoadedFile: Dispatch<SetStateAction<string>>): string[][] {
    if (mode){ // if mode is true, the mode is brief, this means we will switch to verbose mode
        setMode(false)
        return [["Mode set to Verbose"]]
      } else {
        setMode(true)
        return [["Mode set to Brief"]]
      }
}

function handleLoad(
  args: Array<string>, 
  mode: boolean, // if true, brief, if false, verbose
  setMode: Dispatch<SetStateAction<boolean>>,
  loadedFile: string,
  setLoadedFile: Dispatch<SetStateAction<string>>): string[][] {
    setLoadedFile(args[0])
    return [["Loaded File: " + args[0]]]
  }


