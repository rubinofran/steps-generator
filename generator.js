/*
ejemplo step 
[
    {"fn":"wait","for":4000},
    {"fn":"press","key":"ArrowDown"},
    {"fn":"wait","for":4000},
    {"fn":"clickifexists","field":"#onetrust-accept-btn-handler"},
    {"fn":"wait","for":4000},
    {"fn":"click","field":"div[class*=\"myAccountWrapperLink\"]","type":"raro"},
    {"fn":"wait","field":"div.vtex-login-2-x-emailPasswordOptionBtn"},
    {"fn":"click","field":"div.vtex-login-2-x-emailPasswordOptionBtn","type":"text"},
    {"fn":"wait","field":"div.vtex-login-2-x-inputContainerEmail input"},
    {"fn":"complete","field":"div.vtex-login-2-x-inputContainerEmail input","value":"email"},
    {"fn":"wait","for":2000},
    {"fn":"complete","field":"div.vtex-login-2-x-inputContainerPassword input","value":"pass"},
    {"fn":"wait","for":2000},
    {"fn":"click","field":"div.vtex-login-2-x-sendButton span","type":"text"},
    {"fn":"wait","for":10000},
    {"fn":"clickifexists","field":"#onetrust-accept-btn-handler"},
    {"fn":"click","field":"div[class*=\"openIconContainer\"]","type":"raro"},
    {"fn":"wait","for":10000},
    {"fn":"click","field":"div.valtech-carrefourar-region-locator-1-x-methodsContainer button","type":"text"},
    {"fn":"wait","for":2000},
    {"fn":"click","field":".valtech-carrefourar-region-locator-1-x-orderTypeContainer[data-name=Food]","type":"text"},
    {"fn":"wait","for":4000},
    {"fn":"wait","selector":"div.fl:nth-child(1) input"},
    {"fn":"complete","field":"div.fl:nth-child(1) input","value":"provincia"},
    {"fn":"press","key":"Enter"},
    {"fn":"wait","for":2000},
    {"fn":"wait","selector":"div.fl:nth-child(2) input"},
    {"fn":"complete","field":"div.fl:nth-child(2) input","value":"partido"},
    {"fn":"press","key":"ArrowDown"},
    {"fn":"press","key":"Enter"},
    {"fn":"wait","for":5000},
    {"fn":"click","field":"div.valtech-carrefourar-region-locator-1-x-storeBlock","type":"text"},
    {"fn":"wait","for":2000},
    {"fn":"wait","selector":"#rl-step2"},
    {"fn":"click","field":"#rl-step2","type":"raro"},
    {"fn":"wait","for":10000},
    {"fn":"goto","value":"paramUrl","case":"complete"},
    {"fn":"wait","for":4000},
    {"fn":"press","key":"ArrowDown"},
    {"fn":"scroll","field":".lyracons-region-login-1-x-drawerContent","scrollIncrement":3}
    {"fn":"wait","for":4000}]
*/

// FALTA VARIANTE FIELD ------------------>
const waitFN = (time) => `{"fn":"wait","for":${time}}`
// EXAMPLE) time: 5000
// console.log(waitFN(5000))

const clickFN = (field, type) => `{"fn":"click","field":"${field}","type":"${type}"}`
// EXAMPLE) field: 'div[class*="myAccountWrapperLink"]', type: 'raro' (type: 'text' variable)
// console.log(clickFN('div[class*="myAccountWrapperLink"]', 'raro'))

const completeFN = (field, value) => `{"fn":"complete","field":"${field}","value":"${value}"}`
// EXAMPLE) field: 'div.vtex-login-2-x-inputContainerEmail input', value: 'email' 
// console.log(completeFN('div.vtex-login-2-x-inputContainerEmail input', 'email'))

// FALTA VARIANTE TIMES ------------------>
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
    result.textContent = resultStep;
    formattedResult.textContent = formattedResultStep;
    console.log("A. Result:\n", resultStep);
    console.log("B. Formatted result:\n", formattedResultStep);
}

const copyResultStep = () => {
    resultStep === "" ? alert("No steps to copy!") : alert("Result copied to clipboard!");
    navigator.clipboard.writeText(resultStep);
}

const copyFormattedResultStep = () => {
    formattedResultStep === "" ? alert("No steps to copy!") : alert("Formatted result copied to clipboard!");
    navigator.clipboard.writeText(formattedResultStep);
}