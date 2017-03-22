import React from 'react'
import STORE from '../../store'
import ACTIONS from '../../actions'
var TextInputField = React.createClass({
	componentWillMount:function(){
		$(document)
		    .one('focus.autoExpand', 'textarea.autoExpand', function(){
		        var savedValue = this.value;
		        this.value = '';
		        this.baseScrollHeight = this.scrollHeight;
		        this.value = savedValue;
		    })
		    .on('input.autoExpand', 'textarea.autoExpand', function(){
		        var minRows = this.getAttribute('data-min-rows')|0, rows;
		        this.rows = minRows;
		        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
		        this.rows = minRows + rows;
		    });
	},
	_handleKeyDown:function(event){
		if(event.key === 'Enter'){
			var obj = {
				uniqueID:STORE.getUniqueID(),
				taskDescription: event.target.value
			}
			location.hash = 'allTasks'
			ACTIONS.addTask(obj)
			console.log('heres whats in data now', STORE.data)
			event.target.value = ''
			if(event.preventDefault) event.preventDefault(); // This should fix it
			return false // Just a workaround for old browsers		
		}
	},
	render:function(){
		return(
			<div id='textInput'>
				<textarea onKeyPress={this._handleKeyDown} className='autoExpand' rows='3' data-min-rows='3' placeholder='Create Task'></textarea>
			</div>
		)
	}
})

export default TextInputField