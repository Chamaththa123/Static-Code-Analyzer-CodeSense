import React, { useState, useEffect } from 'react';

function DublicateCode({ fileExtension1, fileContent1, file }) {
  const [duplicateCode, setDuplicateCode] = useState([]);

  useEffect(() => {
   

    // Detect duplicated code
    const codeLines = fileContent1.split('\n');
    const duplicateLines = new Set();
    const foundDuplicates = [];

    // Loop through each line of code
    for (let i = 0; i < codeLines.length; i++) {
      const line1 = codeLines[i];

      // Compare with subsequent lines
      for (let j = i + 1; j < codeLines.length; j++) {
        const line2 = codeLines[j];

        // If lines are similar, consider them duplicates
        if (line1 === line2) {
          duplicateLines.add(line1);
          duplicateLines.add(line2);
        }
      }
    }
  const duplicateCodeArray = Array.from(duplicateLines);

  // Filter out empty lines, lines with brackets, and lines that contain comments
  const cleanDuplicateCodeArray = duplicateCodeArray.filter((line) => {
    // Define regular expressions to match brackets, single-line comments, and multi-line comments
    const bracketRegex = /[{}]/;
    const singleLineCommentRegex = /\/\/.*/;
    const multiLineCommentRegex = /\/\*[\s\S]*?\*\//;

    // Check if the line contains brackets or comments
    return !bracketRegex.test(line) && !singleLineCommentRegex.test(line) && !multiLineCommentRegex.test(line);
  });

  // Set the state with the found duplicate lines
  setDuplicateCode(cleanDuplicateCodeArray)

  }, [fileExtension1, fileContent1, file]);
  

  return (
    <div>
        
      <ul>
        {duplicateCode.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>

    

    </div>
  );
}

export default DublicateCode;
