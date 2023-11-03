import React, { useState, useEffect } from 'react';
import BarChart from './Graph';

function Count({ fileExtension1, fileContent1, file }) {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [singleLineCommentsCount, setSingleLineCommentsCount] = useState(0);
  const [multiLineCommentsCount, setMultiLineCommentsCount] = useState(0);
  const [ifElseCount, setIfElseCount] = useState(0);
  const [forLoopCount, setForLoopCount] = useState(0);
  const [whileLoopCount, setWhileLoopCount] = useState(0);
  const [returnStatementCount, setReturnStatementCount] = useState(0);
  const [stringCount, setStringCount] = useState(0);
  const [intCount, setIntCount] = useState(0);
  const [doubleCount, setDoubleCount] = useState(0);
  const [booleanCount, setBooleanCount] = useState(0);
  const [floatCount, setFloatCount] = useState(0);

  useEffect(() => {
    
    const fileContentWithoutComments = fileContent1.replace(/\/\/[^\r\n]*|\/\*[\s\S]*?\*\//g, '');

    // Count if-else statements
    const ifElse = /\bif\b|\belse\b/g;
    const ifElseMatches = fileContentWithoutComments.match(ifElse);
    const ifElseCount = ifElseMatches ? ifElseMatches.length : 0;
    setIfElseCount(ifElseCount);

    // Count loops
    const forLoop = /\bfor\b/g;
    const whileLoop = /\bwhile\b/g;
    const forLoopMatches = fileContentWithoutComments.match(forLoop);
    const whileLoopMatches = fileContentWithoutComments.match(whileLoop);
    setForLoopCount(forLoopMatches ? forLoopMatches.length : 0);
    setWhileLoopCount(whileLoopMatches ? whileLoopMatches.length : 0);

    // Count return statements
    const returnStatement = /\breturn\b/g;
    const returnStatementMatches = fileContentWithoutComments.match(returnStatement);
    const returnStatementCount = returnStatementMatches ? returnStatementMatches.length : 0;
    setReturnStatementCount(returnStatementCount);

    // Count data types
    const string = /\bString\b/g;
    const int = /\bint\b/g;
    const double = /\bdouble\b/g;
    const boolean = /\bBoolean\b/g;
    const float = /\bfloat\b/g;

    const stringMatches = fileContentWithoutComments.match(string);
    const intMatches = fileContentWithoutComments.match(int);
    const doubleMatches = fileContentWithoutComments.match(double);
    const booleanMatches = fileContentWithoutComments.match(boolean);
    const floatMatches = fileContentWithoutComments.match(float);

    setStringCount(stringMatches ? stringMatches.length : 0);
    setIntCount(intMatches ? intMatches.length : 0);
    setDoubleCount(doubleMatches ? doubleMatches.length : 0);
    setBooleanCount(booleanMatches ? booleanMatches.length : 0);
    setFloatCount(floatMatches ? floatMatches.length : 0);

    setFileContent(fileContent1);

    // Count comments
    const singleLine = /\/\/[^\r\n]*/g;
    const multiLine = /\/\*[\s\S]*?\*\//g;
    const singleLineMatches = fileContent1.match(singleLine);
    const multiLineMatches = fileContent1.match(multiLine);
    

    setSingleLineCommentsCount(singleLineMatches ? singleLineMatches.length : 0);
    setMultiLineCommentsCount(multiLineMatches ? multiLineMatches.length : 0);
  }, [fileExtension1, fileContent1, file]);

  return (
    <div>
      <ul>
        <li>Single-line Comments: {singleLineCommentsCount}</li>
        <li>Multi-line Comments: {multiLineCommentsCount}</li>
        <li>If-Else Statements: {ifElseCount}</li>
        <li>For Loops: {forLoopCount}</li>
        <li>While Loops: {whileLoopCount}</li>
        <li>Return Statements: {returnStatementCount}</li>
        <li>String Count: {stringCount}</li>
        <li>Int Count: {intCount}</li>
        <li>Double Count: {doubleCount}</li>
        <li>Boolean Count: {booleanCount}</li>
        <li>Float Count: {floatCount}</li>
      </ul>

      <BarChart
        singleLineCommentsCount={singleLineCommentsCount}
        multiLineCommentsCount={multiLineCommentsCount}
        ifElseCount={ifElseCount}
        forLoopCount={forLoopCount}
        whileLoopCount={whileLoopCount}
        returnStatementCount={returnStatementCount}
        stringCount={stringCount}
        intCount={intCount}
        doubleCount={doubleCount}
        booleanCount={booleanCount}
        floatCount={floatCount}
      />
    </div>
  );
}

export default Count;
