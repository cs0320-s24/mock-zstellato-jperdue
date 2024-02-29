import '../../styles/main.css';
import { ViewTable } from "../ViewTable";

// Interface for BriefHistory, take in a single string, 2d array tuple
export interface VerboseHistory {
    history: [string, string[][]]
}

export function VerboseHistory(props: VerboseHistory) {

    return (
        <div>
            {"Command: " + props.history[0]}
            <br></br>
            {"Output: " }
            <br></br>
            <ViewTable result={props.history[1]} />
            <hr></hr>
        </div>
    )

}