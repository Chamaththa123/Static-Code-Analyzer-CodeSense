import JavaLexer from './code_Metrics.js'
import { isClassDeclaration, isMethodDeclaration, isBranchStatement, isIterationStatement, isSwitchStatement } from 'typescript';

export default function JavaMerics(javaCode){
    const removeComments = javaCode.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');

    let nestingLevel = 0;
    let currentNestingLevel = 0;
    let classStart = 0;
    let inheritance = 0;

    let caseCount = countCases(removeComments);
    findInheritance(javaCode);

    var report = [];

    const lines = removeComments.split("\n");

    for(const line of lines){
        const startReprt = {
            line: '',
            metric: {
                SizeFactor: 0,
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

        const tokenArray = JavaLexer.tokenize(line);

        startReprt.line = line;

        if(isBranchStatement(line)){
            startReprt.metric.typeOfControlStructure = 1;
        }
        if(isIterationStatement(line)){
            startReprt.metric.typeOfControlStructure = 2;
        }
        if(isSwitchStatement(line)){
            startReprt.metric.typeOfControlStructure = caseCount;
        }

        startReprt.metric.sizeFactor = tokenArray.tokens.length;
        if(isClassDeclaration(line)){
            startReprt.metric.nestingLevelStructure = 0;
            let className = getCl
        }
    }
}