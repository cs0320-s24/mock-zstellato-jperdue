import '../../styles/main.css';
import { ViewTable } from "../ViewTable";

// Interface for BriefHistory, take in a single string, 2d array tuple
export interface BriefHistory {
    history: [string, string[][]]
}

export function BriefHistory(props: BriefHistory) {

    return (
        <div>
            <ViewTable result={props.history[1]} />
            <hr></hr>
        </div>
    )

}

