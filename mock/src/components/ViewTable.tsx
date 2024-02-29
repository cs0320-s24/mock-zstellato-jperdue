import "../styles/main.css";

export interface ViewTableProps {
    result: string[][]
}

export function ViewTable(props: ViewTableProps){



    return (
        <div>
            <table className="Output-Table">
                <tbody>
                    {props.result.map((row) => (
                        <tr>
                            {row.map((datum) => (
                            <td className="Output-Datum">{datum}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}