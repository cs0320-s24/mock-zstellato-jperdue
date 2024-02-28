import "../styles/Header.css";


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
 * @returns 
 */
export function REPLHeader(props: REPLHeader){
    if (props.mode){
        var modeString = "Brief Mode"
    } else {
        var modeString = "Verbose Mode"
    }
    return (
        <div className="Header">
            <table className="Header-Table">
                <tr>
                    <td>
                        <p className="REPL-header">
                            <b>Mode</b> {modeString}
                        </p>
                    </td>
                    <td>
                    <p className="REPL-header">
                            <b>Load</b> {props.loadStatement}
                        </p>
                    </td>
                </tr>

            </table>
        </div>
    )
}

