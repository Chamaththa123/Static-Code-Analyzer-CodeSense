export function isBranchStatement(line){

  if(line.includes("if") || line.includes("else")){
      return true;
  }
  return false;
}


export function isIterationStatement(line){

  if(line.includes("for") || line.includes("while")){
      return true;
  }
  return false;
}

export function isSwitchStatement(line){

  if(line.includes("switch")){
      return true;
  }
  return false;
}

export function countCases(code){
  const lines = code.split("\n");
  var caseCount = 0;
  for(const line of lines){
      if(line.includes("case")){
          caseCount++;
      }
  }
  return caseCount;
}

export function isClassDeclaration(code){
  if(code.includes("class")){
      return true;
  }
  return false;
}


  // function isBranchStatement(line){

  //   if(line.includes("if") || line.includes("else")){
  //       return true;
  //   }
  //   return false;
  // }

  // function isIterationStatement(line){
  //   if(line.includes("for") || line.includes("while") || line.includes("do")){
  //       return true;
  //   }
  //   return false;
  // }

  // function isSwitchStatement(line){
  //   if(line.includes("switch")){
  //       return true;
  //   }
  //   return false;
  // }

  // function countCases(code){
  //   const lines = code.split("\n");
  //   var caseCount = 0;
  //   for(const line of lines){
  //       if(line.includes("case")){
  //           caseCount++;
  //       }
  //   }
  //   return caseCount;
  // }

  // function isClassDeclaration(code){
  //   if(code.includes("class")){
  //       return true;
  //   }
  //   return false;
  // }