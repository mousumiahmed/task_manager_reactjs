import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';



export default class DragAndDropApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tasks: [ ],
      cato:"",
      name:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDragStart = (ev, name) => {
    ev.dataTransfer.setData("id", name);
  };


  onDrop = (ev, category) => {
    const id = ev.dataTransfer.getData("id");
    //console.log(id)
    let tasks = this.state.tasks.filter(task => {
      if (task.name == id) {
        task.category = category;
      }
      return task;
    });
    this.setState({
      ...this.state,
      tasks
    });
  };


  onChangeCatogory=(e)=>{
    this.setState({
      cato:e.target.value
    })
  }
  onChangeName=(e)=>{
    this.setState({
      name:e.target.value
    })
  }

  removeItem=(index)=> {
    const tasks = this.state.tasks;
    tasks.splice(index, 1);
    this.setState({ tasks });
  }
  handleSubmit(e) {
    e.preventDefault();
    if ( (this.state.name !== "") && this.state.cato !=="") {
      this.setState({
        tasks: [
          ...this.state.tasks,
          { name: this.state.name, category: this.state.cato }
        ]
      });
      this.state.name = " ";
      this.state.cato = " ";
    }

  }

  render() {
    console.log(this.state.tasks)
    
    var tasks = {
      todo: [],
      working: [],
      complete: [],
      trash: []
    };

    if(this.state.tasks){
      this.state.tasks.map((t,index) => {
      tasks[t.category].push(
        <div
          className="item-container"
          key={t.name}
          draggable
          onDragStart={e => this.onDragStart(e, t.name)}
          >
          {t.name}
          <button className="btn"  onClick={() => this.removeItem(index) } >X</button>
        </div>
      );
    });
  }



    var occurrences = { };
    
    if(this.state.tasks){
    for (var i = 0, j = this.state.tasks.length; i < j; i++) {
      occurrences[this.state.tasks[i].category] = (occurrences[this.state.tasks[i].category] || 0) + 1;
     }
      //console.log(occurrences)
    }
    
    var numtodo=Number(occurrences["todo"])||0
    var todopercent=(numtodo/this.state.tasks.length)*100
    const style = {width:todopercent+"%",backgroundColor:"purple"}

    var numworking=Number(occurrences["working"])||0
    var workingpercent=(numworking/this.state.tasks.length)*100
    const style1 = {width:workingpercent+"%"}

    var numcomplete=Number(occurrences["complete"])||0
    var completepercent=(numcomplete/this.state.tasks.length)*100
    const style2 = {width:completepercent+"%",backgroundColor:"green"}

    return (
        <div>
          <div id='background-image'>
            <h1 style={{textAlign:"center",color:"white",fontSize:"30px"}}><b>TASK MANAGER</b></h1>
            <div class="container">
              <div
              className="drop-area"
              onDragOver={e => this.onDragOver(e)}
              onDrop={e => this.onDrop(e, "todo")}
              >

              <div class="progress">
                  <div class="progress-bar" role="progressbar" style={style} aria-valuenow={numtodo} aria-valuemin="0" aria-valuemax={this.state.tasks.length}></div>
              </div>
              <h1>Todo<span className="todonumstyle">{numtodo}</span></h1>
              {tasks.todo}
              </div>


            <div
              className="drop-area"
              onDragOver={e => this.onDragOver(e)}
              onDrop={e => this.onDrop(e, "working")}
              >
                <div class="progress">
                  <div class="progress-bar" role="progressbar" style={style1} aria-valuenow={numtodo} aria-valuemin="0" aria-valuemax={this.state.tasks.length}>{}</div>
                </div>
                <h1>Working<span className="todonumstyle">{numworking}</span></h1>
                {tasks.working}
              </div>

            <div
              className="drop-area"
              onDragOver={e => this.onDragOver(e)}
              onDrop={e => this.onDrop(e, "complete")}
            >
              <div class="progress">
                <div class="progress-bar" role="progressbar" style={style2} aria-valuenow={numtodo} aria-valuemin="0" aria-valuemax={this.state.tasks.length}></div>
              </div>
              <h1>Complete<span className="todonumstyle">{numcomplete}</span></h1>
              {tasks.complete}
            </div>
          </div>  
          <div>
          <form onSubmit={ this.handleSubmit }>
          <select name="cato" value={this.state.cato} onChange={this.onChangeCatogory}>
              <option>Select category</option>
              <option value="todo">todo</option>
              <option value="working">working</option>
              <option value="complete">complete</option>
            </select>
            <input
              //onKeyPress={e => this.handleKeyPress(e)}  
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChangeName}
              placeholder="Task Name"
            />
            <button className="addbtn">Add</button>
          </form>
          </div>
        </div>
    </div>
    );
  }
}