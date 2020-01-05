var app=new Vue({
	el:'#app',
	data:{
		todo:'',
 		//list1:[],
 		//list2:[],
		data:{}
	},
	mounted(){
		//调接口
		this.getTodoList()
	},
	methods:{
		/*
		confirm(){
			console.log(this.todo)
			if(!this.todo){
				return;
			}
			this.list1.push({
				title:this.todo,
				time:Date.now()
			})
			this.todo=""
		},
		del(index,type){
			if(type==='up'){
				this.list1.splice(index,1)
			}else{
				this.list2.splice(index,1)
			}
		},
		transform(index,type){
			if(type==='up'){
				var res=this.list1.splice(index,1);
				this.list2.push(res[0])
			}else{
				var res=this.list2.splice(index,1);
				this.list1.push(res[0])
			}
		},
		*/
	   confirm(){
		   var that=this;
		   if(!this.todo) return;
		   fetch('/todo/addTodo','POST',{userId:'sz191613027',task:this.todo},function(){
			   that.todo=''
			   that.getTodoList()
		   })
	   },
		del(item){
			var that=this;
			fetch('/todo/deleteTodo','GET',{userId:'sz191613027',id:item._id},function(){
				that.getTodoList()
			})
		},
		transform(item,type){
			var that=this;
			var status='0';
			if(type=='up'){
				status='1'
			}
			fetch('/todo/changeTodoStatus','GET',{userId:'sz191613027',id:item._id,status:status},function(){
				that.getTodoList()
			})
		},
		edit(item,index,type){
			var that=this;
			var newTask=""
			if(type=='up'){
				newTask=that.data.undone[index].task
			}else{
				newTask=that.data.done[index].task
			}
			fetch('/todo/editTodo','POST',{userId:'sz191613027',id:item._id,task:newTask},function(){
				that.getTodoList()
			})
		},
		//每次刷新时调用该方法
		getTodoList(){
			var that=this;
			fetch('/todo/getMyTodos','GET',{userId:'sz191613027'},function(res){
				that.data=res.data
				console.log('that',that.data)
			})
		}
	}
})