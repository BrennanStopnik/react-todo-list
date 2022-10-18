import { useState, useRef } from 'react';
import './App.css';

const Header = () => {
	return (
		<div className='my-header'>
			<h1>To Do List App</h1>
			<h6>Most of us have too much going on to keep track of the simple things that need to get done. Hopefully this app will help with that.</h6>
			<hr/>
			<br/>
		</div>
	)
}

const Footer = () => {
	return (
		<div className='my-footer'>
			<br/>
			<br/>
			<hr/>
			<h6>This app was created by:</h6>
			<h5>Brennan Stopnik</h5>
		</div>
	)
}

const ToDoForm = (props) => {

	const [title, setTitle] = useState("")
	const [priority, setPriority] = useState("")
	const [description, setDescription] = useState("")

	

	return (
		<div className='the-form'>
			<label>Title: </label>
			<br/>
			<input type="text" value={ title } className='title' onChange={
				(e) => {
					setTitle(e.target.value)
				}}/>
			<br/>

			<label>Priority: </label>
			<br/>
			<select className='priority' value={ priority } onChange={(e)=>{
				setPriority(e.target.value)
				}}>
					<option value="">Select one</option>
					<option value="Low">Low</option>
					<option value="Medium">Medium</option>
					<option value="High">High</option>
			</select>
			<br/>

			<label className='description'>Description: </label>
			<br/>
			<textarea type="textarea" value={ description } className='description-area' onChange={(e)=>{
				setDescription(e.target.value)
			}}/>
			<br/>

			<button onClick={()=>{
				props.handleAddToDo(title, priority, description)
				setTitle("")
				setPriority("")
				setDescription("")
			}}>Add ToDo Item</button>
		</div>
	)
}

const ToDoListContainer = (props) => {
	return (
		<div>
			<h2>The List</h2>
			{props.toDoList.map((toDo)=>{
				return <ToDoItem toDo={toDo} handleUpdateToDo={props.handleUpdateToDo}/>
			})}
		</div>
	)
}

const ToDoItem = (props) => {

	const {title, priority, creationDate, description, completedDate} = props.toDo

	return (
			<div className={`To-do-item ${priority}`}>
				<hr/>
				<br/>
				<input type="checkbox" className='check' onClick={()=>{
					props.handleUpdateToDo(title, creationDate)
				}}/>
				<label className='title-label'>{title}</label>
				<h6>Priority: {priority}</h6>
				<h6>Creation Date: {creationDate}</h6>
				{completedDate && 
					<h6>Completed Date: {completedDate}</h6>}
				<h6>Description: {description}</h6>
				{/* <button onClick={()=>{
					props.handleUpdateToDo(title, creationDate)
				}}>Toggle Completed</button> */}
			</div>
	)
}

const App = () => {
	const [toDoList, setToDoList] = useState([])

	const handleAddToDo = (title, priority, description) => {
		let newToDo = {
			title: title,
			priority: priority,
			isComplete: false,
			description: description,
			creationDate: new Date().toString().slice(0, 21),
			completedDate: null
		}
		const toDoListCopy = [...toDoList, newToDo]
		setToDoList(toDoListCopy)
	}

	const handleUpdateToDo = (title, creationDate) => {
		const toDoListCopy = [...toDoList]
		let listCopy = toDoListCopy.map((toDo) => {
			if (toDo.title === title && toDo.creationDate === creationDate) {
				if (toDo.isComplete === false){
					toDo.isComplete = true
					toDo.completedDate = new Date().toString().slice(0, 21)
				} else {
					toDo.isComplete = false
					toDo.completedDate = null
				}
				return toDo
			} else {
				return toDo
			}
		})
		setToDoList(listCopy)
	}

	return (
		<div className="App App-header">
			<Header />
			<ToDoForm handleAddToDo={handleAddToDo} />
			<ToDoListContainer toDoList={toDoList} handleUpdateToDo={handleUpdateToDo}/>
			<Footer />
		</div>
	);
}

export default App;
