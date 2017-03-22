import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'

var DoneTaskView = React.createClass({
	componentWillMount: function(){
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	getInitialState: function(){
		return STORE.data
	},
	render: function(){
		let classValue = 'slide doneSlide'

		return(
			<div className={classValue+=this.state.activeValue==='doneTasks'?' active':''}>
				<DoneTasksList tasks={STORE.data.doneTasks} />
			</div>
		)
	}
})

//Receives props 'tasks' which is an array called allTasks filled with objects
var DoneTasksList = React.createClass({
	//Creates individual task elements
	_createTaskElements: function(singleElement){
		return(
			<TaskElement 
				key={singleElement.uniqueID}
				uniqueID={singleElement.uniqueID}
				taskDescription={singleElement.taskDescription}
			/>
		)
	},
	render:function(){
		return(
			<div className='task-list'>
				{this.props.tasks.map(this._createTaskElements)}
			</div>
		)
	}
})

//Receives props 'uniqueID' and 'taskDescription'
var TaskElement = React.createClass({
	
	render:function(){
		return(
			<div key={this.props.uniqueID}  id='task-element'>
				<div className='task-wrapper'>
					<p>{this.props.taskDescription}</p>
				</div>
			</div>
		)
	}
})


export default DoneTaskView