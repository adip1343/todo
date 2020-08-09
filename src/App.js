import React from 'react';
import './App.css';

function Task(props){
	return(
		<div className="task">
			<h3>{props.task.task}</h3>
			<h4>{props.task.description}</h4>
		  <button className="remove" onClick={()=>props.removeTask(props.task.key)}></button>
		</div>
	)
}

class App extends React.Component {
	
	constructor(props){
		super(props);
		this.state={
			id:0,
			currentTask : "",
			currentDescription : "",
			TaskList:[],
		};
		this.handleSubmit=this.handleSubmit.bind(this);
		this.taskChange=this.taskChange.bind(this);
		this.descriptionChange=this.descriptionChange.bind(this);
		this.removeTask=this.removeTask.bind(this);
	}

	taskChange(e){
		this.setState({
			currentTask : e.target.value,
		})
	}

	descriptionChange(e){
    this.setState({
      currentDescription : e.target.value,
    })
  }

	handleSubmit(e){
		e.preventDefault();
		if(this.state.currentTask!==""){
			this.setState({
				TaskList : [
					...this.state.TaskList,
					{
						key : this.state.id,
						task : this.state.currentTask,
						description : this.state.currentDescription,
					}
				],
				id : this.state.id+1,
				currentTask : "",
				currentDescription:"",
			})
		}
	}

	removeTask(id){
		const newList = this.state.TaskList.filter((p)=>p.key!==id);
		this.setState({
			TaskList:[...newList]
		})
	}

	render(){
  		return (
    			<div className="App">
						<form onSubmit={this.handleSubmit} className="form">
							<input 
								type="text" 
								value={this.state.currentTask} 
								onChange={this.taskChange}
								className="input"
								placeholder="Task..."
							/>
							<input
								type="text"
                value={this.state.currentDescription}
                onChange={this.descriptionChange}
								placeholder="Description..."
                className="input"
              />
							<input 
								type="submit" 
								value="Add"
								className="submit"
							/>
						</form>
						<div className="task-list">
							{
								this.state.TaskList.map(
									(task)=>
										<Task key={task.key} task={task} removeTask={this.removeTask}/>
								)
							}
						</div>
    			</div>
		);
	}
}

export default App;
