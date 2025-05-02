/* ------------------------------------ */
/* STEPS FUNCTIONS */

// FALTA VARIANTE FIELD ------------------> {"fn":"wait","field":"div.vtex-login-2-x-emailPasswordOptionBtn"},
const waitFN = (time) => `{"fn":"wait","for":${time}}`
// EXAMPLE) time: 5000
// console.log(waitFN(5000))

const clickFN = (field, type) => `{"fn":"click","field":"${field}","type":"${type}"}`
// EXAMPLE) field: 'div[class*="myAccountWrapperLink"]', type: 'raro' (type: 'text' variable)
// console.log(clickFN('div[class*="myAccountWrapperLink"]', 'raro'))

const completeFN = (field, value) => `{"fn":"complete","field":"${field}","value":"${value}"}`
// EXAMPLE) field: 'div.vtex-login-2-x-inputContainerEmail input', value: 'email' 
// console.log(completeFN('div.vtex-login-2-x-inputContainerEmail input', 'email'))

// FALTA VARIANTE TIMES ------------------> {"fn":"press","key":"ArrowDown","value":"provincia_times"},
const pressFN = (key) => `{"fn":"press","key":"${key}"}`
// EXAMPLE) key: 'Enter' (key: 'ArrowDown' variable)
// console.log(pressFN('Enter'))    

const clickIfExistsFN = (field) => `{"fn":"clickifexists","field":"${field}"}`
// EXAMPLE) field: '#onetrust-accept-btn-handler'
// console.log(clickIfExistsFN('#onetrust-accept-btn-handler')) 

const reloadPageFN = () => `{"fn":"reloadPage"}`
// EXAMPLE) -
// console.log(reloadPageFN())

const execJSFN = (code) => `{"fn":"execJS","code":"${code}"}`
// EXAMPLE) code: 'if(document.querySelector(".fpw_backdrop")) {document.querySelector(".fpw_backdrop").remove()}'
// console.log(execJSFN('if(document.querySelector(".fpw_backdrop")) {document.querySelector(".fpw_backdrop").remove()}'))

const gotoFN = (value) => `{"fn":"goto","value":"${value}","case":"complete"}`
// EXAMPLE) value: 'http://...' (value: 'paramUrl' variable)
// console.log(gotoFN('http://...'))

const scrollFN = (field, scrollIncrement) => `{"fn":"scroll","field":"${field}","scrollIncrement":${scrollIncrement}}`
// EXAMPLE) field: '.lyracons-region-login-1-x-drawerContent', scrollIncrement: 3
// console.log(scrollFN('.lyracons-region-login-1-x-drawerContent', 3))

/* ------------------------------------ */
/* OPTIONS */

const stepTypes = [
    { name: "wait", fn: waitFN, vars: ["time"] },
    { name: "click", fn: clickFN, vars: ["field", "type"] },
    { name: "complete", fn: completeFN, vars: ["field", "value"] },
    { name: "press", fn: pressFN, vars: ["key"] },
    { name: "clickifexists", fn: clickIfExistsFN, vars: ["field"] },
    { name: "reloadPage", fn: reloadPageFN, vars: [] },
    { name: "execJS", fn: execJSFN, vars: ["code"] },
    { name: "goto", fn: gotoFN, vars: ["value"] },
    { name: "scroll", fn: scrollFN, vars: ["field", "scrollIncrement"] }
]

/* ------------------------------------ */
/* MAIN APP FUNCTIONS */

// Associated with button "+" to add a new step
const newStep = () => {
    
    // 
    let listContainer = document.querySelector("#stepList");
  
    //
    let newP = document.createElement("p");
    let newSelect = document.createElement("select");
    stepTypes.forEach(step => {
        let newOption = document.createElement("option");
        newOption.value = step.name;
        newOption.textContent = step.name;
        newSelect.appendChild(newOption);
    });

    //
    let configButton = document.createElement("button");
    configButton.textContent = "CONFIG";
    configButton.classList = "configButton";
    configButton.onclick = () => {
        let selectedStep = newSelect.value;
        let step = stepTypes.find(step => step.name === selectedStep);
        let stepCode = step.fn(...step.vars.map(v => prompt(`Enter ${v}:`)));
        contentSpan.textContent = stepCode;
    };

    //
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList = "deleteButton";
    deleteButton.onclick = () => {
        listContainer.removeChild(newP);
    };

    //
    let contentSpan = document.createElement("span");
    contentSpan.textContent = "{ CONFIG AND SHOW STEP }";
    
    //
    newP.appendChild(newSelect);
    newP.appendChild(configButton);
    newP.appendChild(contentSpan);  
    newP.appendChild(deleteButton);
    listContainer.appendChild(newP);
}

let resultStep = "";
let formattedResultStep = "";

// Associated with button "GENERATE" to generate the result
const showResult = () => {
    let result = document.querySelector("#resultSteps");
    let formattedResult = document.querySelector("#formattedResultSteps");
    let steps = document.querySelectorAll("span");
    if(steps.length > 0) {
        resultStep = "["; 
        formattedResultStep = "[\n";
        for(let i = 0; i < steps.length; i++) {
            resultStep += steps[i].textContent;
            formattedResultStep += ("\t"+steps[i].textContent);
            steps.length - 1 !== i ? resultStep += "," : resultStep += "]";
            steps.length - 1 !== i ? formattedResultStep += ",\n" : formattedResultStep += "\n]";
        }
    } else {
        resultStep = "EMPTY STEPS";
    }
    result.textContent = "";
    formattedResult.textContent = "";
    result.textContent = resultStep;
    formattedResult.textContent = formattedResultStep;
    console.log("A. Result:\n", resultStep);
    console.log("B. Formatted result:\n", formattedResultStep);
}

// Associated with button "COPY A" to copy the result in normal format
const copyResultStep = () => {
    resultStep === "" ? alert("No steps to copy!") : alert("Result copied to clipboard!");
    navigator.clipboard.writeText(resultStep);
}

// Associated with button "COPY B" to copy the result in special format
const copyFormattedResultStep = () => {
    formattedResultStep === "" ? alert("No steps to copy!") : alert("Formatted result copied to clipboard!");
    navigator.clipboard.writeText(formattedResultStep);
}