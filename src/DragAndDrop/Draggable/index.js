import React from 'react'
import PropTypes from 'prop-types'

export default class Draggable extends React.Component{

    //function for dragging the tweets
    drag =(e)=>{
 
    e.dataTransfer.setData('transfer',e.target.id);
    
    }

    noAllowDrag= (e)=>{
        e.stopPropagation();
    }

    render()
    {
        return(
            <div id ={this.props.id}  draggable ="true" onDragStart={this.drag} onDragOver={this.noAllowDrag} style ={this.props.style}>
            {this.props.children}
            </div>
        )
        
    }



}

Draggable.propTypes={
    id:PropTypes.string,
    style:PropTypes.object,
    children:PropTypes.node

}