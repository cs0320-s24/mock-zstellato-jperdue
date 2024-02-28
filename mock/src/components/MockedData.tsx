

interface MockedDataProps{
    // TODO: Fill with some shared state tracking all the pushed commands
    // CHANGED
    filepath: string
}

export function MockedData(props : MockedDataProps) {

    let fileMap = new Map<string, Array<Array<string>>>();

    const emptyPath = "csv/empty"
    const csvEmpty = [[]]

    const headerPath = "csv/headers"
    const csvHeader = [
        ["first_name", "last_name", "age"],
        ["jim", "grant", "59"],
        ["henry", "ford", "28"]
    ]

    const noHeaderPath = "csv/noHeaders"
    const csvNoHeader = [
        ["jim", "grant", "59"],
        ["henry", "ford", "28"]
    ]

    fileMap.set(emptyPath, csvEmpty)
    fileMap.set(headerPath, csvHeader)
    fileMap.set(noHeaderPath, csvNoHeader)

    


    // return (
    //     <div className="repl-history" aria-label='repl-history'>
    //         {/* This is where command history will go */}
    //         {/* TODO: To go through all the pushed commands... try the .map() function! */}
    //         {/* CHANGED */}
    //         {props.history.map((command, index) => <p>{command}</p>)}
    //     </div>
    // );
}