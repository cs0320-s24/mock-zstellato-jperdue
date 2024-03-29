import '../../styles/main.css';


/**
 * REPL Header interface
 * Take in mode boolean (true is brief), and loadstatement string stated whether a CSV is loaded
 */
interface REPLHeader{
    mode: boolean,
    loadStatement: string,
}

/**
 * Export function to show Mode and whether a CSV is loaded in header
 * @param props 
 * @returns a table with important and helpful info to the user including the mode and whether or not a csv is loaded
 */
export function REPLHeader(props: REPLHeader){
    if (props.mode){
        var modeString = "Brief"
    } else {
        var modeString = "Verbose"
    }
    return (
        <table className="Table">
          <tbody>
            <tr>
              <td>
                <p className="REPL-header">
                  <b>Mode</b> {modeString}
                </p>
                <p className="REPL-header">{props.loadStatement}</p>
              </td>
            </tr>
          </tbody>
        </table>
    );
}

