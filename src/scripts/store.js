import Backbone from 'backbone'

var STORE = Object.assign({},Backbone.Events,{
	data:{
		allTasks: [],
		doneTasks: [],
		undoneTasks:[],
		activeValue:'',
		uniqueIDCounter:0
	},
	//Adds obj to allTasks and undoneTasks
	set: function(obj, arr){
		arr.push(obj)
		this.trigger('dataUpdated')
	},
	//Delets from array an item with ObjID present in uniqueID
	delete: function(ObjID, arr){
		arr.forEach((singleElement)=>{
			if(singleElement.uniqueID===ObjID){
        		arr.splice(arr.indexOf(singleElement),1)
			}
		})
	    this.trigger('dataUpdated')
	},
	setActive: function(hashLocation){
		this.data.activeValue = hashLocation
		this.trigger('dataUpdated')
	},
	unsetActive: function(){
		this.data.activeValue = ''
		this.trigger('dataUpdated')
	},
	getUniqueID: function(){
		return this.data.uniqueIDCounter++
	}

})

export default STORE