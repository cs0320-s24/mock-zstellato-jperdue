import "../styles/main.css";

export interface ViewTable {
    result: string[][];
}

export function ViewTable(props: ViewTable){


    return (
        <div>
            <table className="out-table">
                <tbody>
                    {props.result.map((row) => (
                        <tr>
                            {row.map((datum) => <td className="out-datum">{datum}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}