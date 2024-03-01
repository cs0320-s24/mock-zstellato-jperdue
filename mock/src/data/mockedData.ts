/**
 * Mocked data as a 2D array
 */


// Create data, filepath pairs 

const csvEmpty = [[]]


const csvHeader = [
    ["first_name", "last_name", "age"],
    ["jim", "grant", "59"],
    ["henry", "ford", "28"]
]


const csvNoHeader = [
    ["jim", "grant", "59"],
    ["henry", "ford", "28"]
]


const csvMalformed = [
    ["jarvsfrm", "'''", "5fqrw  32q"],
    ["hen36 fq&y", "ford"]
]



// Create map to export
export const filepath_data_map: {[index: string]: string[][]} = {
    "csv/empty": csvEmpty,
    "csv/header": csvHeader,
    "csv/noHeader": csvNoHeader,
    "csv/malformed": csvMalformed
}

// create query map for mock queries
export const query_map: { [key: string]: { [index: string]: string[][] } } = {
  "csv/header": {
    "0 jim": [["Result:"], ["jim", "grant", "59"]],
    "first_name henry": [["Result:"], ["henry", "ford", "28"]],
    "0 greg": [["Result:"], []],
    "5 greg": [["Error: Column Index '5' is out of Bounds"]],
    "gender male": [["Error: Column Name 'gender male' is not in CSV"]],
  },

  "csv/noHeader": {
    "0 jim": [["Result:"], ["jim", "grant", "59"]],
    "first_name henry": [["Error: No Column Names Provided"]],
    "0 greg": [["Result:"], []],
    "5 greg": [["Error: Column Index '5' is out of Bounds"]],
    "gender male": [["Error: Column Name 'gender male' is not in CSV"]],
  },
};


