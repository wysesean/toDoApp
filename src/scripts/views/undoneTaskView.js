import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'

var UndoneTaskView = React.createClass({
	componentWillMount: function(){
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	getInitialState: function(){
		return STORE.data
	},
	render: function(){
		let classValue = 'slide undoneSlide'
		if(this.state.activeValue==='undoneTasks'){
			$('.slider').css('background-color','#3f88c5')
		}
		return(
			<div className={classValue+=this.state.activeValue==='undoneTasks'?' active':''}>
				<UndoneTasksList tasks={STORE.data.undoneTasks} />
			</div>
		)
	}
})

//Receives props 'tasks' which is an array called allTasks filled with objects
var UndoneTasksList = React.createClass({
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


export default UndoneTaskView