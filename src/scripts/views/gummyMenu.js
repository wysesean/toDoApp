import React from 'react'
import STORE from '../store'
import TextInputField from './components/textInputField'
import AllTaskView from './allTaskView'
import UndoneTaskView from './undoneTaskView'
import DoneTaskView from './doneTaskView'


var GummyMenu = React.createClass({
	componentDidMount: function(){
		//Set Width to 3x the view width to create 3 slides
		$(".slider-inner").width($(window).width() * 3)
		//Position each slide
		$(".slide").each(function(){
			$(this).width($(window).width());
			$(this).css("left", $(window).width() * $(this).index());
		});	

		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	getInitialState: function(){
		return STORE.data
	},
	changeHash(hashValue){
		location.hash = hashValue
	},
	render:function(){
		return(
			<div className='slider'>
				<nav className='slider-nav'>
					<div onClick={()=>{this.changeHash('allTasks')}} className={this.state.activeValue==='allTasks'?'allTaskButton active loading-panel':'allTaskButton loading-panel'}>
							<h3>All</h3>
					</div>
					<div onClick={()=>{this.changeHash('doneTasks')}} className={this.state.activeValue==='doneTasks'?'doneTaskButton active loading-panel':'doneTaskButton loading-panel'}>
						<h3>Done</h3>
					</div>
					<div onClick={()=>{this.changeHash('undoneTasks')}} className={this.state.activeValue==='undoneTasks'?'undoneTaskButton active loading-panel':'undoneTaskButton loading-panel'}>
							<h3>Undone</h3>
					</div>
				</nav>
				<div className='text-input'>
					<TextInputField />
				</div>
				<div className='slider-inner'>
					<AllTaskView />
					<DoneTaskView />
					<UndoneTaskView />
				</div>
			</div>
		)
	}
})

export default GummyMenu