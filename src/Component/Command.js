import React, { Component } from 'react';
import { Input,Button,notification } from 'antd';
import "../App.css";


class Command extends Component{
    
    state = {
        init: false,
        inputCommand:'',
        currentState:{}
    }

    handleClick =()=>{
        const newCommand = this.refs.textArea.textAreaRef.value;
        const commands = newCommand.split('\n')

        if (commands.length>0){
            this.checkCommand(commands)
            
            this.setState({
                inputCommand:this.state.inputCommand+"\n"+ newCommand
            });
        }
        this.refs.textArea.textAreaRef.value = "";
        
    }

    checkCommand=(commands)=>{
        var initState = this.state.init;
        var cState = this.state.currentState;
        debugger
        for(var n=0;n<commands.length;n++){
            if(commands[n]!==""){
                if (!initState){
                    if (commands[n].includes("PLACE")){
                        cState=this.startFromInit(commands);
                        initState = true;
                    }else if(n===0){
                        this.getWarnMessage("The game will start from command: PLACE")
                    }else{
                            if(cState!=={}){
                                cState=this.updateState(commands[n],cState)
                            }
                    }
                }else{
    
                    if (commands[n].includes("PLACE")){
                        cState=this.startFromInit(commands);
                    }else{
                            if(cState!=={}){
                                cState=this.updateState(commands[n],cState)
                            }
                    }
                }
            }
            
        }
        this.setState({
            init: initState,
            currentState:{
                x:cState.x,
                y:cState.y,
                f:cState.f
            }
        })
        console.log(this.state)
    }

    startFromInit=(commands)=>{

        const face=["SOUTH","WEST","EAST","NORTH"];
            const initCommand = commands[0].split(" ");
            if (initCommand.length>1){
                if (initCommand[0]==="PLACE"){
                    const pacmanState = initCommand[1].split(",");
                    if(pacmanState.length===3){
                        if(pacmanState[0]<5&&pacmanState[0]>=0&&pacmanState[1]<5&&pacmanState[1]>=0){
                            if (face.indexOf(pacmanState[2])>0){
                                return this.updateState("PLACE",{x:pacmanState[0],y:pacmanState[1],f:pacmanState[2]})
                        }
                    }
                    }else{
                    this.getWarnMessage("Please enter like: PLACE 0,0,NORTH")
                    }
                }
            }else{
                this.getWarnMessage("Please enter like: PLACE 0,0,NORTH")
            }

    }

    move=(previousState,step,direction)=>{
        const f = previousState.f;
        const x = previousState.x;
        const y = previousState.y;
        const boundry = 5;
        var cf = f;
        var currentState = {};


        switch (f){
            case "NORTH":
                const cy = Number(y)+step;
                
                if (direction === "LEFT"){
                    cf = "WEST"
                }else if(direction === "RIGHT"){
                    cf = "EAST"
                }
                
                if (0<=cy&&cy<boundry){
                    currentState = {x:x,y:cy,f:cf}
                }else{
                    currentState = {x:x,y:y,f:cf}
                }
                break;
            case "EAST":
                const cx = Number(x)+step

                if (direction === "LEFT"){
                    cf = "NORTH"
                }else if(direction === "RIGHT"){
                    cf = "SOUTH"
                }
                if (0<=cx&&cx<boundry){
                    currentState={x:cx,y:y,f:cf}
                }else{
                    currentState={x:x,y:y,f:cf}
                }

                break;
            case "SOUTH":
                const currenty = Number(y)-step

                if (direction === "LEFT"){
                    cf = "EAST"
                }else if(direction === "RIGHT"){
                    cf = "WEST"
                }
                if (0<=currenty&&currenty<boundry){
                    currentState={x:x,y:currenty,f:cf}
                }else{
                    currentState={x:x,y:y,f:cf}
                }
                break;
            case "WEST":
                const currentx = Number(x)-step

                if (direction === "LEFT"){
                    cf = "SOUTH"
                }else if(direction === "RIGHT"){
                    cf = "NORTH"
                }
                if (0<=currentx&&currentx<boundry){
                    currentState={x:currentx,y:y,f:cf}
                }else{
                    currentState={x:x,y:y,f:cf}
                }
                break;
            default: 
                break;
        }
        return currentState;
    }

    updateState=(m,previousState)=>{

        switch (m){
            case "MOVE":
                return this.move(previousState,1,"")

            
            case "LEFT":    

                return this.move(previousState,0,"LEFT")


            case "RIGHT":
                return this.move(previousState,0,"RIGHT")


            case "REPORT":
                this.props.addPacmanState({x:previousState.x,y:previousState.y,f:previousState.f})
                return previousState;
            
            case "PLACE":
                return previousState;
            default:
                break;
        }
        return 
    }

    getWarnMessage=(message)=>{
        notification['warning']({
            message: 'Warn',
            description: message,
        });
        
    }

    render(){
        const { TextArea } = Input
        return(
        <div className = 'Command'>
            <div className = 'enteredCommand'>
                <div className='commandEnterArea'>
                    <div className='title'>Please enter command:</div>
                    <TextArea ref='textArea' className='textArea' type="textarea"/><br/>
                    <Button type="primary" onClick={this.handleClick}>Enter</Button>
                </div>
                
                <div className='historyContainer'>
                    <div className='title'>Enter history:</div>
                    <div className='history'>
                        {this.state.inputCommand}
                    </div>
                </div>
            </div>
            
        </div>)
    }
}

export default Command;