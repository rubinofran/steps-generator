/* ------------------------------------ */
/* STEPS FUNCTIONS (test logs: node .\generator.js) */

const waitFN = (time) => `{"fn":"wait","for":${time}}`
// EXAMPLE) time: 5000
// console.log(waitFN(5000))

const waitFieldFN = (field) => `{"fn":"wait","field":"${field}"}`
// EXAMPLE) field: 'div[class*="myAccountWrapperLink"]'
// console.log(waitFieldFN('div[class*="myAccountWrapperLink"]'))

const clickFN = (field, type) => `{"fn":"click","field":"${field}","type":"${type}"}`
// EXAMPLE) field: 'div[class*="myAccountWrapperLink"]', type: 'raro' (type: 'text' variable)
// console.log(clickFN('div[class*="myAccountWrapperLink"]', 'raro'))

const completeFN = (field, value) => `{"fn":"complete","field":"${field}","value":"${value}"}`
// EXAMPLE) field: 'div.vtex-login-2-x-inputContainerEmail input', value: 'email' 
// console.log(completeFN('div.vtex-login-2-x-inputContainerEmail input', 'email'))

const pressFN = (key) => `{"fn":"press","key":"${key}"}`
// EXAMPLE) key: 'Enter' (key: 'ArrowDown' variable)
// console.log(pressFN('Enter'))    

const pressManyTimesFN = (key, value) => `{"fn":"press","key":"${key}","value":"${value}"}`
// EXAMPLE) key: 'Enter', value: 'provincia_times' 
// console.log(pressManyTimesFN('Enter', 'provincia_times'))

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

const windowScrollFN = (increment, direction, delay) => `{"fn":"windowScroll","increment":"${increment}","direction":"${direction}","delay":"${delay}"}`
// EXAMPLE) increment: 90, direction: 'DOWN', delay: 1000   
// console.log(windowScrollFN(90, 'DOWN', 1000))

/* ------------------------------------ */
/* OPTIONS */

const stepTypes = [
    { name: "wait", fn: waitFN, vars: ["time"], showTitle: false, title: "" },
    { name: "wait field", fn: waitFieldFN, vars: ["field"], showTitle: false, title: "" },
    { name: "click", fn: clickFN, vars: ["field", "type"], showTitle: true, title: "son válidos los types: text / raro" },
    { name: "complete", fn: completeFN, vars: ["field", "value"], showTitle: false, title: "" },
    { name: "press", fn: pressFN, vars: ["key"], showTitle: true, title: "algunos ejemplos de key: Enter / ArrowDown" },
    { name: "press many times", fn: pressManyTimesFN, vars: ["key", "value"], showTitle: true, title: "algunos ejemplos de key: Enter / ArrowDown" },
    { name: "click if exists", fn: clickIfExistsFN, vars: ["field"], showTitle: false, title: "" },
    { name: "reload page", fn: reloadPageFN, vars: [], showTitle: false, title: "" },
    { name: "exec JS", fn: execJSFN, vars: ["code"], showTitle: false, title: "" },
    { name: "goto", fn: gotoFN, vars: ["value"], showTitle: false, title: "" },
    { name: "scroll", fn: scrollFN, vars: ["field", "scrollIncrement"], showTitle: false, title: "" },
    { name: "window scroll", fn: windowScrollFN, vars: ["increment", "direction", "delay"], showTitle: true, title: "algunos ejemplos de direction: UP / DOWN" }    
]

/* ------------------------------------ */
/* MAIN APP FUNCTIONS */

// Associated with button "+" to add a new step
const newStep = () => {
    
    // Getting html  
    let listContainer = document.querySelector("#stepList");
  
    // Creating elements
    let newP = document.createElement("p");
    let newSelect = document.createElement("select");
    stepTypes.forEach(step => {
        let newOption = document.createElement("option");
        newOption.value = step.name;
        newOption.textContent = step.name;
        if(step.showTitle) {
            newOption.setAttribute("title", step.title);    
        }
        newSelect.appendChild(newOption);
    });
    let configButton = document.createElement("button");
    configButton.textContent = "CONFIG";
    configButton.classList = "configButton";
    configButton.onclick = () => {
        let selectedStep = newSelect.value;
        let step = stepTypes.find(step => step.name === selectedStep);
        let stepCode = step.fn(...step.vars.map(v => prompt(`Enter ${v}:`)));
        contentSpan.textContent = stepCode;
    };
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList = "deleteButton";
    deleteButton.onclick = () => {
        listContainer.removeChild(newP);
    };
    let contentSpan = document.createElement("span");
    contentSpan.textContent = "{ CONFIG AND SHOW STEP }";
    
    // Modifying the dom
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
    
    // Getting html  
    let result = document.querySelector("#resultSteps");
    let formattedResult = document.querySelector("#formattedResultSteps");
    
    // Processed
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