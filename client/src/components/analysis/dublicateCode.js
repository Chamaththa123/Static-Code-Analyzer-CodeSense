// import React, { useState, useEffect } from 'react';

// function DublicateCode({ fileExtension1, fileContent1, file }) {
//   const [duplicateCode, setDuplicateCode] = useState([]);

//   useEffect(() => {
 
//     // Code duplication detection
//     const codeLines = fileContent1.split('\n');
//     const duplicateLines = new Set();

//     // Loop through each line of code
//     for (let i = 0; i < codeLines.length; i++) {
//       const line1 = codeLines[i];

//       // Compare with subsequent lines
//       for (let j = i + 1; j < codeLines.length; j++) {
//         const line2 = codeLines[j];

//         // If lines are similar, consider them duplicates
//         if (line1 === line2) {
//           duplicateLines.add(line1);
//           duplicateLines.add(line2);
//         }
//       }
//     }

//     // Convert duplicate lines to an array
//     const duplicateCodeArray = Array.from(duplicateLines);

//     // Filter out empty lines and whitespace
//     const cleanDuplicateCodeArray = duplicateCodeArray.filter((line) => line.trim() !== '');

//     // Set the state with the found duplicate lines
//     setDuplicateCode(cleanDuplicateCodeArray);
//   }, [fileExtension1, fileContent1, file]);

//   return (
//     <div>
//       <ul>
//         {duplicateCode.map((duplicateLine, index) => (
//           <li key={index}>
//             <div>
//               <h4>Duplicate Code Line:</h4>
//               <p>{duplicateLine}</p>
//             </div>
          
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default DublicateCode;

import React, { useState, useEffect } from 'react';
import { Lexer } from "chevrotain";
import { allTokens } from "components/code/code_Metrics";
import { parse } from "java-parser";
import { isBranchStatement, isIterationStatement, isSwitchStatement, isClassDeclaration, countCases } from "components/code/codeAnalysis";
// reactstrap components

function DublicateCode({ fileContent1 }) {
  const [duplicateCode, setDuplicateCode] = useState([]);
  const [nonDuplicateCode, setNonDuplicateCode] = useState([]);
  const [input, setInput] = useState('');
  
  const [tokens, setTokens] = useState([]);
  const [tokenizing, setTokenizing] = useState(false);

  
  useEffect(() => {
    // Code duplication detection
    const codeLines = fileContent1.split('\n');
    const duplicateLines = new Set();
    const nonDuplicateLines = [];

    // Loop through each line of code
    for (let i = 0; i < codeLines.length; i++) {
      const line1 = codeLines[i];
      let isDuplicate = false;

      // Compare with subsequent lines
      for (let j = i + 1; j < codeLines.length; j++) {
        const line2 = codeLines[j];

        // If lines are similar, consider them duplicates
        if (line1 === line2) {
          duplicateLines.add(line1);
          duplicateLines.add(line2);
          isDuplicate = true;
        }
      }

      // If the line is not a duplicate, add it to the non-duplicate lines
      if (!isDuplicate) {
        nonDuplicateLines.push(line1);
      }
    }

    // Convert duplicate lines to an array
    const duplicateCodeArray = Array.from(duplicateLines);

    // Filter out empty lines and whitespace
    const cleanDuplicateCodeArray = duplicateCodeArray.filter((line) => line.trim() !== '');

    // Set the state with the found duplicate and non-duplicate lines
    setDuplicateCode(cleanDuplicateCodeArray);
    setNonDuplicateCode(nonDuplicateLines);
    setInput(nonDuplicateLines.join('\n')); 
  }, [fileContent1]);


  const removeComments = input.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
  
  let nestingLevel = 0;
  let currentNestingLevel = 0;
  let classStart = 0;
  let inheritance = 0;

  function isMethodDeclaration(code) {
    // Check for the presence of access modifiers and the absence of "class" and "main"
    if ((code.includes("public") || code.includes("private") || code.includes("protected")) &&
        !code.includes("class") && !code.includes("main")) {
        return true;
    }
    return false;
}

let caseCount = countCases(removeComments);
  // findInheritance(input);

  // console.log(caseCount);

  const lines = removeComments.split("\n");

  console.log(lines);

  var report = [];

  for(const line of lines){
      const startReprt = {
          line: '',
          metric: { 
              typeOfControlStructure: 0,
              nestingLevelStructure: 0,
              inheritanceLevelStructure: 0
          }
      }

      if(line.includes("class")){
          classStart++;
      }
      if(line.includes("}")){
          classStart--;
      }

      const lexer = new Lexer(allTokens);
      const tokenArray = lexer.tokenize(line);
      // console.log(tokenArray.tokens.length);

      startReprt.line = line;

      //Weight Due to Type of Control Structures (Wc)
      if(isBranchStatement(line)){
          startReprt.metric.typeOfControlStructure = 1;
        
      }
      if(isIterationStatement(line)){
          startReprt.metric.typeOfControlStructure = 2;
      }
      if(isSwitchStatement(line)){ 
          startReprt.metric.typeOfControlStructure = 3;
      }

      // Weight Due to Nesting Level of Control Structures (Wn)
      if (!isClassDeclaration(line) && !isMethodDeclaration(line)) {
        if (line.includes("{")) {
            currentNestingLevel++;
        } else if (line.includes("}")) {
            currentNestingLevel--;
            currentNestingLevel = Math.max(currentNestingLevel, 0); // Ensure it's not negative
        }
      }

      // Weight Due to Inheritance Level of Control Structures (Wi)
      // if (isClassDeclaration(line)) {
      //   inheritance = 0;
      // } else if (line.includes("extends")) {
      //   inheritance++;
      // }

      // Weight Due to Size of Control Structures (Wi)
      if(isClassDeclaration(line)){
        startReprt.metric.nestingLevelStructure = 0;
        if(line.includes("{")) {
          inheritance++;
        }
        else if(line.includes("}")){
          inheritance--;
          inheritance = Math.max(inheritance, 0);
        }
      }

  


    startReprt.metric.inheritanceLevelStructure = inheritance;
    startReprt.metric.nestingLevelStructure = currentNestingLevel;

    //WC = wi + wn + wc
    startReprt.metric.WC = startReprt.metric.inheritanceLevelStructure + startReprt.metric.nestingLevelStructure + startReprt.metric.typeOfControlStructure;
    
    //complexity = WC * no of tokens
    if(startReprt.metric.WC == 0){
     
      startReprt.metric.complexity = startReprt.metric.WC * tokenArray.tokens.length;
    }
    if(startReprt.metric.WC >= 1){
      startReprt.metric.complexity = startReprt.metric.WC * tokenArray.tokens.length;
    }
    


    report.push(startReprt);

  }
  

  console.log(report);

  const tokenizeJavaCode = () => {
    setTokenizing(true);
    try {
      const lexer = new Lexer(allTokens);
      const { tokens } = lexer.tokenize(removeComments);
      setTokens(tokens);
    } catch (error) {
      // Handle parsing errors here
      console.error("Parsing error:", error.message);
    } finally {
      setTokenizing(false);
    }
  };

  const clearTokens = () => {
    setTokens([]);
  };


  const renderCodeWithLineNumbers = () => {
    const lines = removeComments.split('\n');
    let insideForLoop = false; 
    let insideWhileLoop = false; 
    let insideMultiLineComment = false; 

    const isComment = (line) => {
      return line.trim().startsWith('//');
    };

    return (
      <div>
        <pre>
          {lines.map((line, index) => {
            // Check for multi-line comment 
            if (line.includes('/*')) {
              insideMultiLineComment = true;
            }
            if (line.includes('*/')) {
              insideMultiLineComment = false;
            }

            // Check for single-line comment
            if (isComment(line)) {
              return (
                <div key={index}>
                  <span style={{ marginRight: '10px', color: 'green' }}>
                    {index + 1}
                  </span>
                  <span style={{ color: 'green' }}>{line}</span>
                </div>
              );
            }

            // Check for if and else 
            if (
              (line.includes('if') || line.includes('else')) &&
              !insideMultiLineComment
            ) {
              return (
                <div key={index}>
                  <span style={{ marginRight: '10px', color: 'red' }}>
                    {index + 1}
                  </span>
                  <span style={{ color: 'red' }}>{line}</span>
                </div>
              );
            }

            // Check for for loop 
            if (line.includes('for') && !insideMultiLineComment) {
              insideForLoop = true;
            } else if (line.includes('}') && insideForLoop) {
              insideForLoop = false;
            }

            // Check for while loop
            if (line.includes('while') && !insideMultiLineComment) {
              insideWhileLoop = true;
            } else if (line.includes('}') && insideWhileLoop) {
              insideWhileLoop = false;
            }

            return (
              <div key={index}>
                <span style={{ marginRight: '10px' }}>{index + 1}</span>
                <span
                  style={{
                    color:
                      insideForLoop || insideWhileLoop
                        ? 'blue'
                        : 'inherit',
                  }}
                >
                  {line}
                </span>
              </div>
            );
          })}
        </pre>
      </div>
    );
  };

  

  return (
    <div>
      <h2>Duplicate Code Lines:</h2>
      <ul>
        {duplicateCode.map((duplicateLine, index) => (
          <li key={index}>
            <p>{duplicateLine}</p>
          </li>
        ))}
      </ul>

      <h2>Non-Duplicate Code Lines:</h2>
      <ul>
        {nonDuplicateCode.map((line, index) => (
          <li key={index}>
            <p>{line}</p>
          </li>
        ))}
      </ul>

      <table className="table">
                  <thead>
                    <tr>
                      <th>Line No</th>
                      <th>Tokens</th>
                      <th>Wc</th>
                      <th>Wi</th>
                      <th>Wc</th>
                      <th>Wt</th>
                      <th>Complexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.line}</td>
                        <td>{item.metric.typeOfControlStructure}</td>
                        <td>{item.metric.nestingLevelStructure}</td>
                        <td>{item.metric.inheritanceLevelStructure}</td>
                        <td>{item.metric.WC}</td>
                        <td>{item.metric.complexity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
    </div>
  );
}

export default DublicateCode;



// import React, { useState, useEffect } from 'react';

// function DublicateCode({ fileExtension1, fileContent1, file }) {
//   const [duplicateCode, setDuplicateCode] = useState([]);

//   useEffect(() => {
//     // ... Existing code for counting code metrics ...

//     // Code duplication detection
//     const codeLines = fileContent1.split('\n');
//     const duplicateLines = new Set();
//     const foundDuplicates = [];

//     // Loop through each line of code
//     for (let i = 0; i < codeLines.length; i++) {
//       const line1 = codeLines[i];

//       // Compare with subsequent lines
//       for (let j = i + 1; j < codeLines.length; j++) {
//         const line2 = codeLines[j];

//         // If lines are similar, consider them duplicates
//         if (line1 === line2) {
//           duplicateLines.add(line1);
//           duplicateLines.add(line2);
//         }
//       }
//     }

//     // Convert duplicate lines to an array
//     const duplicateCodeArray = Array.from(duplicateLines);

//     // Filter out empty lines and whitespace
//     const cleanDuplicateCodeArray = duplicateCodeArray.filter((line) => line.trim() !== '');

//     // Set the state with the found duplicate lines
//     setDuplicateCode(cleanDuplicateCodeArray);
//   }, [fileExtension1, fileContent1, file]);

//   // Helper function to highlight duplicates in a code line
//   const highlightDuplicates = (line) => {
//     return duplicateCode.includes(line) ? 'duplicate-line' : '';
//   };

//   return (
//     <div>
//       <ul>
//         {codeLines.map((line, index) => (
//           <li key={index} className={highlightDuplicates(line)}>
//             {line}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default DublicateCode;

