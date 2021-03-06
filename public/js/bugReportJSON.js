
const bugreportjson = {
  "bugreport": [
    {
      "id": 0,
      "FileName": "xxx.c",
      "FilePath": "./test_files/c-code-files",
      "Errors": [
        {
          "ln": 4,
          "Type": "Logical",
          "Occurrence": "Dynamic (Run-Time)",
          "Title": "Null Reference",
          "StackTrace": [
            { "ln": 1, "Title": "Null Reference" },
            { "ln": 3, "Title": "Unexpected end of line" },
            { "ln": 4, "Title": "Unexpected end of line" }
          ],
          "Description": "Description - Placeholder - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "CrossOrigin": [
            { "FileName": "xxy.c", "FilePath": "./test_files/c-code-files", "ln": 16 },
            { "FileName": "xxx.c", "FilePath": "./test_files/c-code-files", "ln": 8 },
            { "FileName": "xxz.c", "FilePath": "./test_files/c-code-files", "ln": 18 }
          ]
        },
        {
          "ln": 8,
          "Type": "Semantic",
          "Occurrence": "Static (Compile-Time)",
          "Title": "Variable 'statc' not recognised",
          "Description": "Description - Placeholder - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "StackTrace": [
            { "ln": 4, "Title": "Null Reference" },
            { "ln": 6, "Title": "Unexpected end of line" }
          ],
          "CrossOrigin": [
            { "FileName": "xxy.c", "FilePath": "./test_files/c-code-files", "ln": 16 },
            { "FileName": "xxx.c", "FilePath": "./test_files/c-code-files", "ln": 8 },
            { "FileName": "xxz.c", "FilePath": "./test_files/c-code-files", "ln": 18 }
          ]
        },
        {
          "ln": 10,
          "Type": "Syntax",
          "Occurrence": "Static (Compile-Time)",
          "Title": "Unexpected end of line",
          "Description": "Description - Placeholder - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "StackTrace": [
            { "ln": 7, "Title": "Null Reference" },
            { "ln": 10, "Title": "Unexpected end of line" }
          ],
          "CrossOrigin": []
        }
      ]
    },
    {
      "id": 1,
      "FileName": "xxy.c",
      "FilePath": "./test_files/c-code-files",
      "Errors": [
        {
          "ln": 4,
          "Type": "Syntax",
          "Occurrence": "Static (Compile-Time)",
          "Title": "Missing end of function '}'",
          "Description": "Description - Placeholder - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "StackTrace": [
            { "ln": 4, "Title": "Null Reference" },
            { "ln": 10, "Title": "Unexpected end of line" }
          ],
          "CrossOrigin": [
            { "FileName": "xxz.c", "FilePath": "./test_files/c-code-files", "ln": 12 },
            { "FileName": "xxy.c", "FilePath": "./test_files/c-code-files", "ln": 6 }
          ]
        },
        {
          "ln": 13,
          "Type": "Semantic",
          "Occurrence": "Static (Compile-Time)",
          "Title": "Function reference 'init()' not found",
          "Description": "Description - Placeholder - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "StackTrace": [
            { "ln": 4, "Title": "Null Reference" },
            { "ln": 10, "Title": "Unexpected end of line" }
          ],
          "CrossOrigin": []
        },
        {
          "ln": 18,
          "Type": "Logical",
          "Occurrence": "Dynamic (Run-Time)",
          "Title": "Null Reference",
          "Description": "Description - Placeholder - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "StackTrace": [
            { "ln": 4, "Title": "Null Reference" },
            { "ln": 10, "Title": "Unexpected end of line" }
          ],
          "CrossOrigin": []
        }
      ]
    }
  ]
}
;
const json_length = Object.keys(bugreportjson.bugreport).length;