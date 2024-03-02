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

const csvOneColumn = [
  ["first_name"],
  ["jim"],
  ["henry"]
];



// Create map to export
export const filepath_data_map: {[index: string]: string[][]} = {
    "csv/empty": csvEmpty,
    "csv/header": csvHeader,
    "csv/noHeader": csvNoHeader,
    "csv/malformed": csvMalformed,
    "csv/oneColumn": csvOneColumn
}

// create query map for mock queries
export const query_map: { [key: string]: { [index: string]: string[][] } } = {
  "csv/header": {
    "0 jim": [["Result:"], ["jim", "grant", "59"]],
    "first_name henry": [["Result:"], ["henry", "ford", "28"]],
    "- henry": [["Result:"], ["henry", "ford", "28"]],
    "0 greg": [["Result:"], []],
    "5 greg": [["Error: Column Index '5' is out of Bounds"]],
    "gender male": [["Error: Column Name 'gender' is not in CSV"]],
  },

  "csv/noHeader": {
    "0 jim": [["Result:"], ["jim", "grant", "59"]],
    "first_name henry": [
      [
        "Error: Cannot search by column name because CSV 'csv/noHeader' has no headers.",
      ],
    ],
    "- henry": [["Result:"], ["henry", "ford", "28"]],
    "0 greg": [["Result:"], []],
    "5 greg": [["Error: Column Index '5' is out of Bounds"]],
    "gender male": [["Error: Column Name 'gender' is not in CSV"]],
  },

  "csv/oneColumn": {
    "0 jim": [["Result:"], ["jim"]],
    "first_name henry": [["Result:"], ["henry"]],
    "- henry": [["Result:"], ["henry"]],
    "0 greg": [["Result:"], []],
  }
};


