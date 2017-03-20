import STORE from './store'

var ACTIONS = {
	//Moves task from done to undone
	addTask: function(obj){
		STORE.set(obj, STORE.data.allTasks)
		STORE.set(obj, STORE.data.undoneTasks)
	},
	deleteTask: function(objID){
		STORE.delete(objID, STORE.data.allTasks)
		STORE.delete(objID, STORE.data.doneTasks)
		STORE.delete(objID, STORE.data.undoneTasks)
	},
	//Finds from all tasks and inputs into doneTask, then deletes from undoneTasks
	toggleDoneTask: function(ObjID){
		STORE.set(STORE.data.allTasks.find((el)=>{
			if(el.uniqueID === ObjID){
				return el
			}
		}), STORE.data.doneTasks)

		STORE.delete(ObjID, STORE.data.undoneTasks)
	},
	//Finds from all tasks and inputs into undoneTask, then deletes from doneTasks
	toggleUndoneTask: function(ObjID){
		STORE.set(STORE.data.allTasks.find((el)=>{
			if(el.uniqueID === ObjID){
				return el
			}
		}), STORE.data.undoneTasks)

		STORE.delete(ObjID, STORE.data.doneTasks)
	},
}

export default ACTIONS