import { useReducer, useState } from 'react';
import './App.css';

const ToDoForm = () => {

	const [title, setTitle] = useState("")
	const [priority, setPriority] = useState("")
	const [description, setDescription] = useState("")

	return (
		<div>
			<label>Title: </label>
			<input type="text" onChange={
				(e) => {
					setTitle(e.target.value)
				}}/>
			<br/>

			<label>Priority: </label>
			<select onChange={(e)=>{
				setPriority(e.target.value)
				}}>
					<option value=""></option>
					<option value="Low">Low</option>
					<option value="Medium">Medium</option>
					<option value="High">High</option>
			</select>
			<br/>

			<label>Description: </label>
			<textarea type="textarea" onChange={(e)=>{
				setDescription(e.target.value)
			}}/>
		</div>
	)
}

const ToDoListContainer = (props) => {
	return (
		<div>
			<h1>ToDo List</h1>
			{props.toDoList.map((toDo)=>{
				return <ToDoItem toDo={toDo} />
			})}
		</div>
	)
}

const ToDoItem = (props) => {
	return (
			<div>
				<h2>Title: {props.toDo.title}</h2>
				<p>Priority: {props.toDo.priority}</p>
				<p>Creation Date: {props.toDo.creationDate}</p>
				{props.toDo.completedDate && 
					<p>Completed Date: {props.toDo.completedDate}</p>}
				<p>Description: {props.toDo.description}</p>
			</div>
	)
}

const App = () => {
	const [toDoList, setToDoList] = useState([{
		title: "Implement ToDo List",
		description: "Implement the todo list application",
		isComplete: false,
		priority: "High",
		creationDate: new Date().toString(),
		completedDate: null
	}])

	const handleAddToDo = (title, priority, description) => {
		let newToDo = {
			title: title,
			priority: priority,
			isComplete: false,
			description: description,
			creationDate: new Date().toString(),
			completedDate: null
		}
		const toDoListCopy = [...toDoList, newToDo]
		setToDoList(toDoListCopy)
	}

	return (
		<div className="App App-header">
			<ToDoForm />
			<ToDoListContainer toDoList={toDoList}/>
		</div>
	);
}

export default App;
