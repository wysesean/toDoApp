import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'

var AllTaskView = React.createClass({
	componentWillMount: function(){
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	getInitialState: function(){
		return STORE.data
	},
	render: function(){
		let classValue = 'slide allSlide'
		if(this.state.activeValue==='allTasks'){
			console.log('im returning true')
			$('.slider').css('background-color','#e94f37')
		}
		return(
			<div className={classValue+=this.state.activeValue==='allTasks'?' active':''}>
				<AllTasksList tasks={STORE.data.allTasks} />
			</div>
		)
	}
})

//Receives props 'tasks' which is an array called allTasks filled with objects
var AllTasksList = React.createClass({
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
	tickCheckBox:function(id){
		if(this.state.buttonClicked){
			console.log('unticked')
			ACTIONS.toggleUndoneTask(id)
			this.setState({
				buttonClicked:false
			})
			$({})
		}
		else{
			console.log('ticked')
			ACTIONS.toggleDoneTask(id)
			this.setState({
				buttonClicked:true
			})
		}
	},
	getInitialState:function(){
		return{
			buttonClicked:false
		}
	},
	render:function(){
		return(
			<div key={this.props.uniqueID}  id='task-element' onClick={()=>{this.tickCheckBox(this.props.uniqueID)}}>
				<div className='task-wrapper'>
					<div className={this.state.buttonClicked?'tickBox ticked':'tickBox'}></div>
					<p>{this.props.taskDescription}</p>
				</div>
			</div>
		)
	}
})


export default AllTaskView