// uncomment table 2

let outcomeDiv = document.getElementById("outcome");
let studentWronglyTagged = document.getElementById("student-wrong");
let studentCorrectlyTagged = document.getElementById("student-correct");
let table1 = document.getElementById("table1").children;
let WronglyTaggedCount = 0;
let dateBorrowed, dateReturned, dateDiff, nameOfStudent;
const dateToDays = 1000 * 3600 * 24;

function pElement(text) {
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(text));
  return p;
}
function createElementWronglyTagged(student) {
  studentWronglyTagged.appendChild(pElement(student));
}

function createElementCorrectlyTagged(student) {
  studentCorrectlyTagged.appendChild(pElement(student));
}
function createElementChecks(value) {
  outcomeDiv.appendChild(pElement(value));
  let wronglyTaggedText =
    WronglyTaggedCount + " rows/students were wrongly tagged namely:";
  document.getElementById("tag").innerHTML = wronglyTaggedText;
}

function getTable(dateDue, T) {
  let i;
  for (i = 0; i < table1.length; i++) {
    // adds given dueDate if bok hasnt been returned
    if (table1[i].children[2].innerHTML.length === 0) {
      let notreturnedRow = table1[i].children[2];
      notreturnedRow.innerHTML = dateDue;
    }
    nameOfStudent = table1[i].children[0].innerHTML;
    dateBorrowed = new Date(table1[i].children[1].innerHTML);
    dateReturned = new Date(table1[i].children[2].innerHTML);
    dateDiff = dateReturned.getTime() - dateBorrowed.getTime();
    let daysDiff = Math.ceil(dateDiff / dateToDays);
    let style = table1[i].style.cssText ? true : false;

    if (daysDiff < T && style) {
      WronglyTaggedCount++;
      createElementWronglyTagged(nameOfStudent + " was wrongly tagged");
    } else if (daysDiff > T && !style) {
      WronglyTaggedCount++;
      createElementWronglyTagged(nameOfStudent + " was wrongly tagged");
    } else {
      createElementCorrectlyTagged(nameOfStudent + " was correctly tagged");
    }

    let results =
      daysDiff > T
        ? nameOfStudent + " is overdue for return by " + daysDiff + " days"
        : nameOfStudent + " is not yet overdue";
    createElementChecks(results);
  }
  return WronglyTaggedCount;
}

getTable("2016-11-30", 14);

// change date and days for table 2
// getTable("2015-11-30", 7);

// console.log(getTable("2016-11-30", 14));
