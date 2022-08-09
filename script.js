
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
const taskHead = [
	{key:"id",default:Date.now()},
	{key:"status",default:false},
	{key:"taskTitle",default:null},
	{key:"taskContent",default:null},
	{key:"taskDetails",default:null}];
const addFun =(event)=>{
	event.preventDefault();
	const allTasks = readFromLocalStorage();
	const data = {
		id: Date.now(),
		status: false,
	}
	taskHead.forEach(head=>{ if(head.default == null) {data[head.key] =addTask.elements[head.key].value ;}else{data[head.key] = head.default;}
						   })
	console.log(data);
	allTasks.push(data);
	writeToStorage(allTasks);
	window.location.href = 'add.html';
}
if(addTask) addTask.addEventListener("submit" , addFun);
	
const readFromLocalStorage = (storageKey="tasks" , option="array")=>{
	let data;
	try{
		data = localStorage.getItem(storageKey);
		if(option!="string") data = JSON.parse(data)
		if(!Array.isArray(data) && option=="array") throw new Error('invalid data')
		
		
	}
	catch(e){
		data = [];
	}
	return data
}	
console.log(readFromLocalStorage())
// write my data to local storage
	const writeToStorage = (data, storageKey="tasks")=>{
		localStorage.setItem(storageKey, JSON.stringify(data))
	}

const taskWrap = document.querySelector("#taskWrap");
const singleWrap = document.querySelector("#singleWrap");
const editedTask = document.querySelector("#editTask");

// design function to create wanted elements
	const createMyOwnElement = (el , parent , classes , txt=null)=>{
		const myElem = document.createElement(el);
		parent.appendChild(myElem);
		myElem.classList = classes;
		if(txt) myElem.textContent = txt;
		return myElem;
	}
	
	//function to show new page
		const showPage = (i , allTasks)=>{
			writeToStorage(allTasks[i] , "singletask");
			writeToStorage(i , "index");
			window.location.href = 'single.html';
		}
	//function to change task status
		const changeStatus = (i , allTasks , ref)=>{
				if(allTasks[i].status == false) allTasks[i].status=true
				else allTasks[i].status = false
				writeToStorage(allTasks)
				drawData(ref , allTasks)
		}
	// function to edit task content
		const editTask = (i , allTasks)=>{
			writeToStorage(allTasks[i] , "singletask");
			writeToStorage(i , "index");
			window.location.href = 'edit.html';
		}
	//create a function to draw each task
		const drawSingleTask = (task , i , allTasks , ref)=>{
				const d1 = createMyOwnElement("div" , ref ,"col-3  mx-3" );
				let c 
				console.log(task)
				if(task.status){
					c = "p-2 border border-primary m-2 bg-primary";
				}else{
					c = "p-2 border border-primary m-2 bg-danger";
				}
				const d2 = createMyOwnElement("div" , d1 ,c);		
				taskHead.forEach(head=> createMyOwnElement("h3" , d2 , "" , task[head.key]))
				const delBtn = createMyOwnElement("button" , d2 ,"btn btn-danger m-2" , "Delete" );
				const showBtn = createMyOwnElement("button" , d2 ,"btn btn-warning m-2" , "show" );
				const editBtn = createMyOwnElement("button" , d2 ,"btn btn-primary m-2" , "Edit" );
				const changeBtn = createMyOwnElement("button" , d2 ,"btn btn-success m-2" , "Change" );
			changeBtn.addEventListener('click' , (e)=>changeStatus(i , allTasks , taskWrap));
			showBtn.addEventListener('click' , (e)=>showPage(i , allTasks))
			editBtn.addEventListener('click' , (e)=>editTask(i , allTasks))
		}
	//function to draw data
		const drawData = (ref , allTasks)=>{
			ref.innerHTML = "";
			allTasks.forEach((task , i)=>{ drawSingleTask(task , i , allTasks , ref)	})

		}
	
if(taskWrap){
	const allTasks = readFromLocalStorage();
	drawData(taskWrap , allTasks)
}

if(singleWrap){
	const allTasks = readFromLocalStorage()
	const taskIndex = readFromLocalStorage("index" , "string");
	const singleTask = readFromLocalStorage("singletask", "object")
	drawSingleTask(singleTask , taskIndex , allTasks , singleWrap)
	}
	
// function to draw the form
	const createForm = (parent , task)=>{
		const formBody = createMyOwnElement("form" , parent , "col-10 ");
		const input1 = createMyOwnElement("input" , formBody , "col-3")
		input1.value = task.taskTitle
		input1.setAttribute("type" , "text")
		const input2 = createMyOwnElement("input" , formBody , "col-3")
		input2.value = task.taskContent
		input2.setAttribute("type" , "text")
		input2.setAttribute("placeholder" , "content")
		const input3 = createMyOwnElement("input" , formBody , "col-3")
		input3.value = task.taskDetails
		input3.setAttribute("type" , "text")
		input3.setAttribute("placeholder" , "details")
		const btn1 = createMyOwnElement("button" , formBody , "col-3 btn border")
		btn1.setAttribute("type" , "submit")
		btn1.textContent = "edit task"
		formBody.addEventListener('submit' , (e)=>editTaskValues(task))
	}
//function to asign edited values to task
	const editTaskValues = (task)=>{
		for(let property in task){
			task[property] = task[property].value
		}
		console.log(task[property])
		const taskEdited = writeToStorage(task , "editedTask")
		
	}
if(editedTask){
	const singleTask = readFromLocalStorage("singletask" , "object")
//	console.log(singleTask)
	const taskForm = createForm(editedTask , singleTask)
	console.log(taskForm)
	editTask.innerHTML=""
	const taskEdited = readFromLocalStorage("editedTask" , "object")
	const allTasks = readFromLocalStorage()
	const taskIndex = readFromLocalStorage("index" , "string");
	drawSingleTask(taskEdited , taskIndex , allTasks , editedTask)
}
	
	
	
	
	
	
	
	
