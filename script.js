
//window.addEventListener("load", ()=>{
//		var name= prompt('please enter your name')
//	 	var age = prompt('please enter your age')
//})

// get input from user
function getDataFromUser(message){
	return prompt(message);
}
//const userName = getDataFromUser('please enter your name');
//const userAge = getDataFromUser('please enter your age');

////get arithmatic operation from user and do addition
//let userInput = getDataFromUser('please enter your operation as number + number');
//// split function
//function splitString(string){
//	return string.split(' ');
//}
//let outputToUser = splitString(userInput);
//
//// function of addition
//function additionProcess (a,b){
//	return a+b;
//}
//// function of multiplication
//function multiplicationProcess (a,b){
//	return a*b;
//}
//// function of subtraction
//function suntractionProcess (a,b){
//	return a-b;
//}
//// function of subtraction
//function divisionProcess (a,b){
//	return a/b;
//}
//if (outputToUser[1] == '+'){
//	document.write(additionProcess(Number(outputToUser[0]) , Number(outputToUser[2])));
//}else if(outputToUser[1] == '*'){
//		document.write(multiplicationProcess(Number(outputToUser[0]) , Number(outputToUser[2])));
//}else if(outputToUser[1] == '-') {
//	document.write(suntractionProcess(Number(outputToUser[0]) , Number(outputToUser[2])));
//} else {
//	document.write(divisionProcess(Number(outputToUser[0]) , Number(outputToUser[2])))};

//let inputData = document.querySelectorAll('form input');
//let formElm = document.querySelector('form');
//formElm.addEventListener('submit' , function(event){
//	event.preventDefault();
//	let userName = inputData[0].value;
//	let userAge = inputData[1].value;
//	console.log("user Name " + userName + "; user Age" + userAge);
//})
//	                       

//const allTasks = [];	
const addTask = document.querySelector('#addTask');
const taskHead = ['taskTitle' , 'taskContent' , 'taskDetails']
addTask.addEventListener("submit" , function(event){
	event.preventDefault();
	const allTasks = readFromLocalStorage();
	const data = {
		id: Date.now(),
		status: false,
	}
	taskHead.forEach(head=> data[head] = addTask.elements[head].value);
	console.log(data);
	allTasks.push(data);
	writeToStorage(allTasks);
//	window.location.href = 'add.html';
})
	
function readFromLocalStorage(){
	let data;
	try{
		data = JSON.parse(localStorage.getItem('tasks')) || [];
		if(!Array.isArray(data)) throw new Error('invalid data')
	}
	catch(e){
		data = [];
	}
	return data
}	
console.log(readFromLocalStorage())
// write my data to local storage
function writeToStorage(data){
	localStorage.setItem('tasks' , JSON.stringify(data))
}
	
	
	
	
	
	
	
	
	
	
	
	
	
