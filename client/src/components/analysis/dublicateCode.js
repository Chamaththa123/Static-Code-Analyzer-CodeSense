import React, { useState, useEffect } from 'react';
import { Lexer } from "chevrotain";
import { allTokens } from "../analysis/code_Metrics";
import { parse } from "java-parser";
import { isBranchStatement, isIterationStatement, isSwitchStatement, isClassDeclaration, countCases } from "../analysis/codeAnalysis";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
  const renderCodeWithLineNumbers = () => {
    const lines = input.split('\n');
    let lineCount = 0;

    return (
      <div>
        <pre>
          {lines.map((line, index) => {
            if (line.trim() === '') {
              return null; // Skip empty lines
            }

            lineCount++;
            return (
              <div key={index}>
                <span style={{ marginRight: '10px' }}>{lineCount}</span>
                <span>{line}</span>
              </div>
            );
          })}
        </pre>
      </div>
    );
  };

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

  for (const line of lines) {
    const startReprt = {
      line: '',
      metric: {
        typeOfControlStructure: 0,
        nestingLevelStructure: 0,
        inheritanceLevelStructure: 0
      }
    }

    if (line.includes("class")) {
      classStart++;
    }
    if (line.includes("}")) {
      classStart--;
    }

    const lexer = new Lexer(allTokens);
    const tokenArray = lexer.tokenize(line);
    // console.log(tokenArray.tokens.length);

    startReprt.line = line;

    //Weight Due to Type of Control Structures (Wc)
    if (isBranchStatement(line)) {
      startReprt.metric.typeOfControlStructure = 1;

    }
    if (isIterationStatement(line)) {
      startReprt.metric.typeOfControlStructure = 2;
    }
    if (isSwitchStatement(line)) {
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

    // Weight Due to Size of Control Structures (Wi)
    if (isClassDeclaration(line)) {
      startReprt.metric.nestingLevelStructure = 0;
      if (line.includes("{")) {
        inheritance++;
      }
      else if (line.includes("}")) {
        inheritance--;
        inheritance = Math.max(inheritance, 0);
      }
    }




    startReprt.metric.inheritanceLevelStructure = inheritance;
    startReprt.metric.nestingLevelStructure = currentNestingLevel;

    //WC = wi + wn + wc
    startReprt.metric.WC = startReprt.metric.inheritanceLevelStructure + startReprt.metric.nestingLevelStructure + startReprt.metric.typeOfControlStructure;

    //complexity = WC * no of tokens
    if (startReprt.metric.WC == 0) {

      startReprt.metric.complexity = startReprt.metric.WC * tokenArray.tokens.length;
    }
    if (startReprt.metric.WC >= 1) {
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


  const renderNonDuplicateCodeWithLineNumbers = () => {
    const lines = removeComments.split('\n');
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

            


            return (
              <div key={index}>
                <span >{index + 1}</span>
                <span style={{ marginLeft: '10px' }}
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
       <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Duplicate Code Lines">
      {duplicateCode.length > 0 ? (
    <ul>
      {duplicateCode.map((duplicateLine, index) => (
        <li key={index}>
          <p>({index + 1})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {duplicateLine}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>No duplicate code lines found.</p>
  )}
      </Tab>
      <Tab eventKey="profile" title="Code Without Duplicate Code Lines">
      <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Recorrect Code Without Duplicate Code Lines">
      {renderNonDuplicateCodeWithLineNumbers()}
      </Tab>
      <Tab eventKey="profile" title="Calculate Complexity for Recorrect Code">
      <table className="table" style={{color:'white'}}>
        <thead>
          <tr>
            <th>Line No</th>
            <th>Tokens</th>
            <th>Wc</th>
            <th>Wi</th>
            <th>Wc</th>
            <th>Wt</th>
            <th >Complexity</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item, index) => (
            <tr key={index}>
              <td style={{textAlign:'center'}}>{index + 1}</td>
              <td>{item.line}</td>
              <td style={{textAlign:'center'}}>{item.metric.typeOfControlStructure}</td>
              <td style={{textAlign:'center'}}>{item.metric.nestingLevelStructure}</td>
              <td style={{textAlign:'center'}}>{item.metric.inheritanceLevelStructure}</td>
              <td style={{textAlign:'center'}}>{item.metric.WC}</td>
              <td style={{textAlign:'center'}}>{item.metric.complexity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </Tab>
    </Tabs>
      </Tab>
    </Tabs>

      
    </div>
  );
}

export default DublicateCode;



