React-to-do-list Part 1:

# *ReactTodoList*

## Overview
- Create a simple react todo application that utilizes core react functionality such as components, props and events.
- The todo application should have core CRUD functionality for handling ToDo items.
	- Listing todo's
	- Adding a todo
		- Title
		- Priority
		- isComplete
		- Description
		- Creation Date
		- Completed Date
	- Editing a todo
		- Mark todo as complete

## Assignment

1) Project Setup:
- Create a new github repo called react-todo-list:
- Clone the repo to your computer and add the link to populi
- cd into the react-todo-list directory
- Run 'npx create-react-app .' to initialize react in the repository
- Run 'npm start' after react has finished installing
- If the above worked properly, you should see the react start page on localhost:3000

2) Initialize the toDo List:
- Replace the initial code in App.js with the following code:

import { useState } from "react";
import "./App.css";

const App = () => {
	return (
		<div className="App-header">

		</div>
	);
}

export default App;

- In the <App/> component, add a new state variable called toDoList initialized to the following value: [1]
	- [{
			title: "Implement ToDo List",
			priority: "High",
			isComplete: false,
			description: "Implement the todo list application",
			creationDate: new Date().toString(),
			completedDate: null
		}]
	- _Note_: 
		- In development, it is often useful to start the application with sample data so that you can see how the data will display in the components while you are creating them. We are storing our toDo's in the component state of <App/> so that we can pass the toDo list through props to all the child components that will require them. 
		- creationDate has been initialized to new Date().toString(), this is because react can only render strings and not entire date objects.
		- completedDate has been initialized to null. In general, we want to initialize all our object data with all the properties we will need to display even if they don't have a value yet. Since we intend to set completedDate in the future, initializing the property to null is acceptable.

3) Implement ToDo List Display Component:
- _Approach_: We will need to create two components to display our ToDo's, the <ToDoListContainer/> and <ToDoItem> components. <ToDoListContainer/> will receive our toDo list as a prop and map through it in its JSX to display a <ToDoItem/> for every toDo in our list.
- Create two new react components <ToDoListContainer/> and <ToDoItem>. 
	- _Remember_: The first parameter in the function will be props and we will need enclosing <div> tags in the JSX.[2]
- In the JSX of <ToDoListContainer/> (inside the enclosing <div>'s), add a h1 heading that says "Todo List".
- In the JSX of <App/>, add <ToDoListContainer/> inside the enclosing <div>'s and pass in toDoList as a prop.[3]
- _Commentary_: Now that the toDoList is being passed into <ToDoListContainer/> from <App/> as a prop, we can iterate through the list and display a <ToDoItem/> for every todo.
- In the JSX of <ToDoListContainer/>, map through the toDoList array coming through the props parameter and return a <ToDoItem/> for every toDo in the toDoList array. Next, pass the toDo (the first parameter in the .map callback function) into the <ToDoItem/> component. This code should be creating a new instance of <ToDoItem/> with the toDo object itself passed in as a prop.[4]
- Now in <ToDoItem/>, the toDo data should be available from the props. You can verify this by console logging props.toDo.
- In the JSX of <ToDoItem/>, display the following properties of the toDo:
	- The toDo title in an h2 tag
	- The text "Priority: " and then the toDo priority value in a p tag
	- The text "Creation Date: " and then the toDo creationDate value in a p tag
	- The text "Completed Date: " and then toDo completedDate value in a p tag if the completedDate is defined/is a truthy value
		- _Hint_: Use &&'s to conditionally render the completedDate.[5]
	- The text "Description: " and then toDo description value in a p tag
- If the above was implemented correctly, you should see the initial toDo displayed on the page.

4) Implement the ToDo Form Component:
- Create a new component <ToDoForm/>
- Add <ToDoForm/> into the JSX of <App/> above <ToDoListContainer/>
- Add the following state variables to <ToDoForm/> along with their setter functions:
	- title, initialized to an empty string
	- priority, initialized to an empty string
	- description, initialized to an empty string
- For the state variable title, add a label that says "Title", a type="text" input field, and a <br/> line break in the JSX of <ToDoForm/>. Additionally, add an onChange event handler function to the input field that sets the title state variable.[6]
- For the state variable priority, add a label that says "Priority", a <select> dropdown menu, and a <br/> line break in the JSX of <ToDoForm/>. Add the following three values as options to the select dropdown: "Low", "Medium", "High". These options should have a value attribute on each one that matches the displayed option strings. E.G:
	- <option value="Medium">Medium</option>
	- Additionally, add one more blank option at the very top of the option list. This will represent our inital unselected default value:
		- <option value=""></option>
	- Additionally, add an onChange event handler on the <select> tag that sets the priority state variable.[7]
- For the state variable description, add a label that says "Description", a <textarea> input field, and a <br/> line break in the JSX of <ToDoForm/>. Additionally, add an onChange event handler function to the <textarea> that sets the description state variable.[8]
	- _Note_: For large text values, we use the <textarea> tag which allows the user to resize the input area (try it by clicking on the bottom right corner of the <textarea> and dragging the mouse to resize the input area).
- _Commentary_: The three state variables title, priority and description are the only toDo properties that require user input and so those are the only state variables we need to keep track of in the <ToDoForm/>

5) Implement the handleAddToDo function:
- _Approach_: We are going to create a new function in <App/> to handle adding a new toDo item to the toDoList. We will eventually pass this handler function as a prop into <ToDoForm/> and hook it up to a <button> on <ToDoForm/>. This handler will work by:
	-	Creating a new copy of the toDoList.
	- Creating a new toDo item using the parameter inputs we will eventually hook up to the accompanying state variables in <ToDoForm/>.
	- Pushing the new toDo into the toDoList copy.
	- Setting the toDoList state variable with the updated version of toDoListCopy.
- In the body of <App/> (above the JSX return statement), add a new function called handleAddToDo. 
- handleAddToDo should take in three parameters: title, priority and description.[9]
- Add code to handleAddToDo so that it has the following functionality:
	- First, it should create a new variable called newToDo. newToDo should be an object with the following key/value pairs:[10]
		- title: which should get its value from the handleAddToDo title parameter
		- priority: which should get its value from the handleAddToDo priority parameter
		- isComplete: which should be initialized to false
		- description: which should get its value from the handleAddToDo description parameter
		- creationDate: which should be a new date object with .toString() chained on it.
			- new Date().toString()
		- completedDate: which should be initialized to null
	- Second, it should make a copy of the toDoList state variable and assign that value to a new variable called toDoListCopy.
		- _Hint_: Use the spread operator to create a copy of toDoList
	- Third, it should push the newToDo variable into the toDoListCopy array.
		- [Optional]: Instead of pushing newToDo into toDoListCopy, you can add it as an inline value after the spread operator inside toDoListCopy
	- Forth, it should call setToDoList with the toDoListCopy passed as an argument.[11]
- Pass handleAddToDo as a prop into <ToDoForm/>.[12]

6) Connect handleAddToDo to <ToDoForm/>
- _Approach_: Now that handleAddToDo has been passed through as a prop into <ToDoForm/>, we will hook it up to a button and pass in our component state variables that are tracking the user input.
- Add a <button> called "Add ToDo" to the JSX of <ToDoForm/> below the last <br/> (after the <textarea>)
- Add an onClick handler to the "Add ToDo" button that calls handleAddToDo from the props and passes in title, priority and description as arguements.[13]
- Test that the above worked by writing a new toDo title and description, setting a priority and clicking "Add ToDo"


React-to-do-list Part 2:

**********STRETCH_GOALS**********

7) Marking/toggling a toDo as complete:
- _Approach_: 
	- In order to mark a toDo as complete, we will be implementing a toDo update handler in the body of <App/> and then pass that handler through the props chain down to each individual <ToDoItem/> component. We will then give each <ToDoItem/> a "Toggle Complete" button to call this update handler from. 
	- If we are marking a toDo as complete, the update handler will need to make a copy of toDoList, look up a specific toDo in the toDoListCopy, invert the isComplete property on the toDo, set the completedDate property to the current date, and then set toDoList with the update copy. If we are marking a toDo as incomplete from complete, we will have to do the same process but set completedDate back to null. 
	- In order to perform the lookup for the specific toDo we are targeting, we are going to pass the title and createdDate of the toDo into the update handler and find a matching toDo in toDoListCopy based upon those values.
	- We will also be adding conditional css to the <ToDoItem/> in order to show that the toDo has been completed.
- In the body of <App/> (above the JSX return statement), add a new function called handleUpdateToDo.
- handleUpdateToDo should take in two parameters: title and createdDate.[14]
- Add code to handleUpdateToDo so that it has the following functionality:
	- First, it should make a copy of the toDoList state variable and assign that value to a new variable called toDoListCopy.
		- _Hint_: Use the spread operator to create a copy of toDoList
	- Second, it should loop through toDoListCopy until it finds a toDo whose title equals the title parameter and whose createdDate equals the createdDate parameter.
		- _Hint_: There are many ways of implementing this.
			- If you are comfortable with .map(), I recommend using .map() to implement steps 2, 3 and 4 by returning just the toDo if the condition in the callback function does not match the title and createdDate and returning an updated toDo if the condition does match.[15]
			- Otherwise, I recommend using .findIndex() to find the index of the target toDo and then set the values of that toDo in the array.[15]
	- Third, invert the value of isComplete (i.e. set isComplete equal to !isComplete). 
	- Forth, if completedDate is null, set it to new Date() and if it is not null, set it to null.
		- _Commentary_: There are only going to be two states for isComplete and completedDate. Either the toDo is complete in which case isComplete will be true and completedDate will have a date. Or the toDo is incomplete in which case isComplete will be false and the completedDate will be null. Thus, we can perform a simple inversion of the values based upon the current state of these properties. I.E. if isComplete is true, we can simply set it to !isComplete which will evaluate to false.
	- Fifth, it should call setToDoList with the toDoListCopy passed as an argument.
- Now that we have implemented handleUpdateToDo, we need to pass it down the prop chain to each individual <ToDoItem/>.
- Pass handleUpdateToDo as a prop into <ToDoListContainer/> in the JSX of <App/> and then pass handleUpdateToDo as a prop from the <ToDoListContainer/> props into the <ToDoItem/>'s being rendered by the map function.[16] 
- In the JSX of <ToDoItem>, add a button called "Toggle Complete". Add an onClick handler to this button that calls handleUpdateToDo from the props and passes in the toDo title and createdDate as arguments.
	- _Commentary_: There is no code example for this step, but all the variables you need should be available in <ToDoItem/> already. The function handleUpdateToDo is a prop and the toDo item itself is a prop. The handleUpdateToDo function you have in the onClick handler is expecting two arguments: the toDo title and the toDo completedDate. Both of these values will be coming from the toDo prop and will be unique to every toDo in our toDo list. Try console.log(props.toDo) in <ToDoItem/> to see the values that are available to you from props.toDo.
- Test that the above is working by clicking "Toggle Complete" on each rendered toDo in the browser. You should see the createdDate flip from displayed to not displayed if you implemented it correctly. 

8) Conditional CSS for <ToDoItem/>
- _Approach_: Now that our handleUpdateToDo function is hooked up, we will add conditional css to the JSX of <ToDoItem/> to display the priority and completion status of each toDo.
- Add the following class to the App.css file:
.To-do-item {
	margin: 20px;
	padding: 10px;
}
- On the enclosing <div> of <ToDoItem/>, add the class "To-do-item" as well as the evaluated value of toDo.priority. 
	- _Hint_: The easiest way to do this is to set className equal to a string literal in curly braces: {``}. Then put To-do-item in the string literal since that class will never change and then put ${props.toDo.priority} after To-Do-item so it will be evaluated as a Javascript value.[17]
- Add classes to the App.css file that will give each toDo item a 1px solid red border if the priority is high, a 1px solid yellow border if the priority is medium and a 1px solid green border if the priority is low.[18] 
	- _Hint_: The syntax .some-css-class.something-else is going to target any element on our page that has both the classes 'some-css-class' and 'something-else'. E.G. for a High priority task, we want to target the toDo item that has both the classes 'To-do-item' and 'High'.
- On the h2 tag for the toDo title, add the class "To-do-item-title" as well as the evaluated value of toDo.isComplete.
- Add a class to App.css that will add a strikethrough to the text in h2 if props.toDo.isComplete is true.
	- _Hint_: The use the css property text-decoration to add the strikethrough decoration to the text.

## Code References
- [1]: 
	const [toDoList, setToDoList] = useState([{
		title: "Implement ToDo List",
		description: "Implement the todo list application",
		isComplete: false,
		priority: "High",
		creationDate: new Date().toString(),
		completedDate: null
	}])
- [2]: 
	const ToDoListContainer = (props) => {
		return (
			<div>
			</div>
		)
	}
	const ToDoItem = (props) => {
		return (
			<div>
			</div>
		)
	}
- [3]: 
	<div>
		<ToDoListContainer toDoList={toDoList}/>
	</div>
- [4]:
	<div>
		{props.toDoList.map((toDo)=>{
			return <ToDoItem toDo={toDo} />
		})}
	</div>
- [5]:
	{props.toDo.completedDate && <p>Completed Date: {props.toDo.completedDate}</p>}

- [6]:
	<label>Title</label>
	<input type="text" onChange={(e)=>{
		setTitle(e.target.value)
	}}/>
	<br/>
- [7]:
	<select onChange={(e)=>{
		setPriority(e.target.value)
	}}>
		<option value=""></option>
		...other options
	</select>
	<br/>
- [8]:
	<textarea onChange={(e)=>{
		setDescription(e.target.value)
	}}>
	<br/>
- [9]:
	const handleAddToDo = (title, priority, description) => {}
- [10]:
	{
		title: title,
		priority: priority,
		isComplete: false,
		description: description,
		creationDate: new Date().toString(),
		completedDate: null
	}
- [11]:
	setToDoList(toDoListCopy)
- [12]:
	<ToDoForm handleAddToDo={handleAddToDo}/>
- [13]:
	<button onClick={()=>{
		props.handleAddToDo(title, priority, description)
	}}>Add ToDo</button>
- [14]:
	const handleAddToDo = (title, createdDate) => {}
- [15]:
	- .map():
		let toDoListCopy = [...toDoList];
		toDoListCopy = toDoListCopy.map((toDo)=>{
			if ( /* title and createdDate match */ ) {
				const updatedToDo = {
					...toDo
				}
				updatedToDo.isComplete = !updatedToDo.isComplete
				if (updatedToDo.completedDate === null) {
					updatedToDo.completedDate = new Date().toString() 
				} else {
					updatedToDo.completedDate = null
				}
				return updatedToDo
			} else {
				return toDo
			}
		})
	- .indexOf():
		const toDoIndex = toDoListCopy.findIndex((toDo)=>{
			...add your condition to match title and createdDate here
		})
		toDoListCopy[toDoIndex].isComplete = !toDoListCopy[toDoIndex].isComplete
		if (toDoListCopy[toDoIndex].completedDate === null) {
			toDoListCopy[toDoIndex].completedDate = new Date().toString()
		} else {
			toDoListCopy[toDoIndex].completedDate = null
		}
- [16]:
	- In <App/>:
		<ToDoListContainer toDoList={toDoList} handleUpdateToDo={handleUpdateToDo}/>
	- In <ToDoListContainer/>:
		{props.toDoList.map((toDo)=>{
			return <ToDoItem toDo={toDo} handleUpdateToDo={props.handleUpdateToDo}/>
		})}
- [17]:
	<div className={`To-do-item ${props.toDo.priority}`}>
- [18]:
	.To-do-item.High {
		border: 1px solid red;
	}

	.To-do-item.Medium {
		border: 1px solid yellow;
	}

	.To-do-item.Low {
		border: 1px solid green;
	}