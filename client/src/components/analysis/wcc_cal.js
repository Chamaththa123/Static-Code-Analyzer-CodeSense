import React, { useState, useEffect } from 'react';
import BarChart from './Graph';
import { isBranchStatement, isIterationStatement, isSwitchStatement, isClassDeclaration, countCases } from "components/code/codeAnalysis";
// reactstrap components
function wcc_cal({ fileExtension1, fileContent1, file }) {
  
    const [input, setInput] = useState('if (marks > -1 && marks < 50 )');
    const [tokens, setTokens] = useState([]);
    const [tokenizing, setTokenizing] = useState(false);
  
  
    function isMethodDeclaration(code) {
      // Check for the presence of access modifiers and the absence of "class" and "main"
      if ((code.includes("public") || code.includes("private") || code.includes("protected")) &&
          !code.includes("class") && !code.includes("main")) {
          return true;
      }
      return false;
  }
  
  
    function getClassIdentifier(code){
      let line = code
    }
  
  
    function findInheritance(code){
      const liness = code.split("\n");
      const lexer = new Lexer(allTokens);
        
      for(const line of liness){
        const { tokens } = lexer.tokenize(line);
        parse.input = tokens;
      }
    }
  
  
  
    const removeComments = input.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
    
    let nestingLevel = 0;
    let currentNestingLevel = 0;
    let classStart = 0;
    let inheritance = 0;
    
  
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
  

  useEffect(() => {
    
    
  }, [fileExtension1, fileContent1, file]);

  return (
    <div>
   
    </div>
  );
}

export default wcc_cal;
