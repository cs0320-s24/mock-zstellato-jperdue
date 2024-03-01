> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details
This Project includes front end functionality for a server which would load, view, and search input CSV's, and disply them in either a brief or verbose setting. This functionality has been testing using a playwright testing suite on mocked data we provided. The mocked data is stored in a map from filepath to 2d arrays of strings, as well as mocked query responses within a map from filepath to query arguments to resulting row. This front end uses a REPLFunction interface which allows developers to add new commands to those already built, allowing easy addition of new commands through the map from input string (eg. mode, view) to a function which will process the REPL input.

# Design Choices
The most significant design choice was the usage of the REPLFunction interface to allow flexibility in the front ends ability to process inputs and add new commands. This interface contains a map from string to method, which can then be called on in the REPLInput class. The input is parsed to locate the command string (first word of an input string) which is then passed into the commands map, return the function to be utilized to process the rest of the args. These functions also take in the mode, setMode, loadedPath, and setLoadedPath variables, allowing the REPLFunctions the ability to update and modify the state of the program. The primary REPL class is where everything comes together, as it is the source of the commandString, mode, and loadedCSV states, as well as their modifier function. From there, the work is delegated to other REPL classes to process and display the results of the user queries on the mocked data.

For changing the mode of the program, we utilized two other classes, BriefHistory and VerboseHistory, which we called upon in REPLHistory, to display the outputs or command and outputs of the respective inputs of the user. The REPL History classes switches between which class it uses to display based upon the status of the mode variable in the server state. Generically, the server defaults to brief mode. Also, by keeping our history in the shape of a map from a string (command) to a 2d array of strings (output), we could allow the server to display all former inputs in either brief or verbose mode as it switched, rather than only allowing verbose viewing after a mode switch.

Similarly, we change the loadedPath variable in the load_csv command, which, as long as the filepath is found in our mocked data, we set the loadedPath variable to the provided file path. From there, view and search will access this same state variable to display and query the data which this file path maps to in our Mocked Data.

To make sure our user knew which mode they were in and which path they had loaded, we created a REPLHeader class which took in these variables and displayed them on the page to the left of the submit button.

We made our mocked data maps from filepaths to data and queries to result to allow us to quickly process results that reflect what real data would look like. By exporting this maps, we could access them in the REPLFunction class and work with them as needed to process queries of users.


# Errors/Bugs

# Tests

# How to
After logging in, the mode will be set to brief, and no CSV will be loaded. One could use the load_csv command, using this structure "load_csv filepath" with a desired filepath. If the filepath is within the mocked data, and not a malformed csv (csv/malformed in the mocked data) it will set that path as the loadedPath and display this information on the bottom left. Now, one can use the view command to see the data within the loaded table, and search to search the table so long as the query is within the mocked query map. To search, use the query format "search <column> <value>" where column and value are inputs and column can be either an index or a column name. Note one can only search or view the loaded table, no others in the mocked data until they are loaded. Only one data set can be loaded at a time. TO switch modes, use the mode command. Brief history will only portrary the outputs of commands, while verbose will display both commands and outputs.

As a developer attempting to add new commands, one can add them by creating a new item in the REPLFunction classes commands map, which maps strings to functions. From there, one can either write the function within the map, or map the functionality to a handler method within the REPLFunction class. 

# Collaboration
Conceptual conversations with Natalie King
