import { Dispatch, SetStateAction, useState } from "react";
import "../../styles/main.css";
import { filepath_data_map, query_map } from "../../data/mockedData";

/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
 * the command is done executing.
 *
 * The arguments passed in the input (which need not be named "args") should
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {
  (
    args: Array<string>,
    mode: boolean, // if true, brief, if false, verbose
    setMode: Dispatch<SetStateAction<boolean>>,
    loadedFile: string,
    setLoadedFile: Dispatch<SetStateAction<string>>
  ): string[][];
}

// Command map to be exported to the rest of the file. Any strings here map to a command used in the REPL
export const commands: { [key: string]: REPLFunction } = {
  mode: (
    args: string[],
    mode: boolean,
    setMode: Dispatch<SetStateAction<boolean>>,
    loadedFile: string,
    setLoadedFile: Dispatch<SetStateAction<string>>
  ) => handleMode(args, mode, setMode, loadedFile, setLoadedFile),
  load_csv: (
    args: string[],
    mode: boolean,
    setMode: Dispatch<SetStateAction<boolean>>,
    loadedFile: string,
    setLoadedFile: Dispatch<SetStateAction<string>>
  ) => handleLoad(args, mode, setMode, loadedFile, setLoadedFile),
  view: (
    args: string[],
    mode: boolean,
    setMode: Dispatch<SetStateAction<boolean>>,
    loadedFile: string,
    setLoadedFile: Dispatch<SetStateAction<string>>
  ) => handleView(args, mode, setMode, loadedFile, setLoadedFile),
  search: (
    args: string[],
    mode: boolean,
    setMode: Dispatch<SetStateAction<boolean>>,
    loadedFile: string,
    setLoadedFile: Dispatch<SetStateAction<string>>
  ) => handleSearch(args, mode, setMode, loadedFile, setLoadedFile),
};

// Method to be called when someone maps to the mode command.
function handleMode(
  args: Array<string>,
  mode: boolean, // if true, brief, if false, verbose
  setMode: Dispatch<SetStateAction<boolean>>,
  loadedFile: string,
  setLoadedFile: Dispatch<SetStateAction<string>>
): string[][] {
  if (mode) {
    // if mode is true, the mode is brief, this means we will switch to verbose mode
    setMode(false);
    return [["Mode set to Verbose"]];
  } else {
    setMode(true);
    return [["Mode set to Brief"]];
  }
}

// Method to be called when someone maps to load command
function handleLoad(
  args: Array<string>,
  mode: boolean, // if true, brief, if false, verbose
  setMode: Dispatch<SetStateAction<boolean>>,
  loadedFile: string,
  setLoadedFile: Dispatch<SetStateAction<string>>
): string[][] {
  const filepath = args[0];
  console.log(filepath);
  console.log(args[1]);
  if (filepath == "csv/malformed") {
    return [["Error: Input Malformed CSV"]];
  } else if (filepath in filepath_data_map) {
    setLoadedFile(args[0]);
    return [["Loaded File: " + args[0]]];
  } else {
    return [["Error: Invalid Filepath"]];
  }
}

// Method to be called when someone maps to the View command
function handleView(
  args: Array<string>,
  mode: boolean, // if true, brief, if false, verbose
  setMode: Dispatch<SetStateAction<boolean>>,
  loadedFile: string,
  setLoadedFile: Dispatch<SetStateAction<string>>
): string[][] {
  if (loadedFile != "No CSV") {
    if ((loadedFile == "csv/empty")) {
      return [["CSV '" + loadedFile + "' is empty."]];
    } else {
      const table = filepath_data_map[loadedFile];
      return table;
    }
  } else {
    return [["Error: No CSV Loaded"]];
  }
}

// Method to be called when mapped to search command
function handleSearch(
  args: Array<string>,
  mode: boolean, // if true, brief, if false, verbose
  setMode: Dispatch<SetStateAction<boolean>>,
  loadedFile: string,
  setLoadedFile: Dispatch<SetStateAction<string>>
): string[][] {
  const column = args[0];
  const value = args[1];
  const combined = column + " " + value;

  if (loadedFile != "No CSV") {
    if ((loadedFile == "csv/empty")) {
      return [["Error: CSV '" + loadedFile + "' is empty."]];
    } else if (combined in query_map[loadedFile]) {
      const table = query_map[loadedFile][combined];
      return table;
    } else {
      /* This will change when we implement the backend, but since the backend doesnt exist, any commands we havent
        specifically accounted for in our mock data will throw this */
      return [
        [
          "Error: Invalid Query, request '" +
            combined +
            "' not found in Mocked Data",
        ],
      ];
    }
  } else {
    return [["Error: No CSV Loaded"]];
  }
}
