const TEXT = "text";
const DATE = "date";
const RADIO = "radio";
const SELECT = "SELECT";
const EMPTY_STRING = "";
const INCORRECT = "incorrect";


let btnSubmit = document.getElementById("btnSubmit");

btnSubmit.onclick = function () {
    main();
}

function main() {
    let objectOfRequiredElements = getObjectOfRequiredElements();
    console.log(objectOfRequiredElements);
    if (allRequiredElementsAreOk(objectOfRequiredElements)) {
        console.log("Submit OK");
        window.location = "/submitOK.html";
    } else {
        console.log("Submit FAILED");
        paintRequiredElements(objectOfRequiredElements);
    }
}

function getObjectOfRequiredElements() {
    let listOfRequiredElements = getListOfRequiredElements();
    let objectOfRequiredElements = {
        basicInput: getBasicInputs(listOfRequiredElements),
        radioButtonGroup: getRadioButtonGroups(listOfRequiredElements),
        select: getSelects(listOfRequiredElements)
    }

    return objectOfRequiredElements;
}

function getListOfRequiredElements() {
    return [...document.querySelectorAll("[data-required='true']")];
}

function getBasicInputs(listOfRequiredElements) {
    return listOfRequiredElements.filter(element => (element.type === TEXT || element.type === DATE));
}

function getRadioButtonGroups(listOfRequiredElements) {
    return listOfRequiredElements.filter(element => element.type === RADIO).map(element => [...document.getElementsByName(element.name)]);
}

function getSelects(listOfRequiredElements) {
    return listOfRequiredElements.filter(element => element.tagName === SELECT);
}

function allRequiredElementsAreOk(objectOfRequiredElements) {
    return (allBasicInputsAreOk(objectOfRequiredElements.basicInput) &&
        allRadioButtonGroupsAreOk(objectOfRequiredElements.radioButtonGroup) &&
        allSelectsAreOk(objectOfRequiredElements.select));
}

function allBasicInputsAreOk(arrayBasicInputs) {
    console.log("check Inputs");
    return arrayBasicInputs.every(input => inputIsOk(input));
}

function allRadioButtonGroupsAreOk(arrayRadioButtonGroups) {
    console.log("check Radio");
    return arrayRadioButtonGroups.some(radioButtonGroup => radioButtonGroupIsOk(radioButtonGroup));
}

function allSelectsAreOk(arraySelects) {
    console.log("check Select");
    return arraySelects.every(select => selectIsOk(select));
}

function inputIsOk(input) {
    return input.value != EMPTY_STRING;
}

function radioButtonGroupIsOk(radioButtonGroup) {
    return radioButtonGroup.some(radioButton => radioButton.checked);
}

function selectIsOk(select) {
    return select.value != EMPTY_STRING;
}

function paintRequiredElements(objectOfRequiredElements) {
    paintBasicInputs(objectOfRequiredElements.basicInput);
    paintRadioButtonGroups(objectOfRequiredElements.radioButtonGroup);
    paintSelects(objectOfRequiredElements.select);
}

function paintBasicInputs(arrayBasicInputs) {
    arrayBasicInputs.forEach(input => paintBasicInput(input));
}

function paintRadioButtonGroups(arrayRadioButtonGroups) {
    arrayRadioButtonGroups.forEach(radioButtonGroup => paintRadioButtonGroup(radioButtonGroup));
}

function paintSelects(arraySelects) {
    arraySelects.forEach(select => paintSelect(select));
}

function paintBasicInput(input) {
    if (inputIsOk(input)) {
        if (input.classList.contains(INCORRECT)) {
            input.classList.remove(INCORRECT);
        }
    } else {
        input.classList.add(INCORRECT);
    }
}

function paintRadioButtonGroup(radioButtonGroup) {
    if (radioButtonGroupIsOk(radioButtonGroup)) {
        radioButtonGroup.forEach(radioButton => {
            if (radioButton.classList.contains(INCORRECT)) {
                radioButton.classList.remove(INCORRECT);
                document.querySelector("label[for=" + radioButton.id + "]").classList.remove(INCORRECT);
            }
        })
    } else {
        radioButtonGroup.forEach(radioButton => {
            radioButton.classList.add(INCORRECT)
            document.querySelector("label[for=" + radioButton.id + "]").classList.add(INCORRECT);
        });
    }
}

function paintSelect(select) {
    if (selectIsOk(select)) {
        if (select.classList.contains(INCORRECT)) {
            select.classList.remove(INCORRECT);
        }
    } else {
        select.classList.add(INCORRECT);
    }
}