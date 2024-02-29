/**
 * Mocked data as a 2D array
 */


// Create data, filepath pairs 
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

const malformedCSV = "csv/malformed"
const csvMalformed = [
    ["jarvsfrm", "'''", "5fqrw  32q"],
    ["hen36 fq&y", "ford"]
]



// Create map to export
export const filepath_data_map: Map<string , string [][]> = new Map<
    string,
    string[][]
>();

// Assign map with filepath to data
filepath_data_map.set(emptyPath, csvEmpty)
filepath_data_map.set(headerPath, csvHeader)
filepath_data_map.set(noHeaderPath, csvNoHeader)
