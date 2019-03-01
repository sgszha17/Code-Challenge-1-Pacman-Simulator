import React, { Component } from 'react';
import { Input } from 'antd';
import {Button} from 'antd';

class Command extends Component{
    
        handleChange =()=>{
            
        }

    render(){
        const { TextArea } = Input
        return(
        <div className = 'Command'>
            <div className = 'enteredCommand'>
                <div className='title'>Please enter command:</div>
                <TextArea className='textArea' type="textarea" onChange={this.handleChange}/><br/>
                <Button type="primary">Enter</Button>
                <div className='historyContainer'>
                    <div className='title'>Enter history:</div>
                    <div className='history'>
                    { TextArea }
                    </div>
                </div>
            </div>
            
        </div>)
    }
}

export default Command;