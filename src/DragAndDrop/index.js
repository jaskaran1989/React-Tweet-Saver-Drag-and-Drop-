import React from 'react'

import styled from 'styled-components';

import Draggable from '../DragAndDrop/Draggable/index';
import Droppable from '../DragAndDrop/Droppable/index';
import axios from 'axios'

const Wrapper = styled.div`
width :100%;
padding:32px;
display:flex;
padding-top:40px;
justify-content:center;
`;

const Item = styled.div`
padding:15px;
color:#555;
background-color:white;
border-radius:5px;
margin-top:10px;
margin-left:40px;
margin-top:-40px;
`;

const droppableStyle = {

    
    border:'solid 1px',
    width: '100%',
    height:'auto',
    margin:'32px'
};

export default class DragAndDropTest extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          showdata: false,
          user:''
          
        };
    
      }
    // function for geting tweets 
    //Using axios library
      getdata() {
          console.log("wd");
        var searchkeyword = document.getElementById("tweet").value;
          if(searchkeyword=="")
          {
            searchkeyword="trump"
          }

        ;(async () => {
            const response = await axios({
              url: 'http://tweetsaver.herokuapp.com/?q='+searchkeyword+'&count=10',
              method: 'get'
            })
                   
            localStorage.clear();
            var l = localStorage.setItem("user",JSON.stringify(response.data));
            var mode =localStorage.getItem("user");;
            console.log(mode);

           
          })()

          this.setState(function(prevState, props){
            return { isLoaded: true}
         });

      }
      
    


render() {
    const { isLoaded,error,user,showdata } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }  else {
      return (

        <div > 
        <h2 className="header">Tweet Saver</h2>
        <div >
            <div className='inline-block-child'><input className="w3-input search w3-border" id="tweet" type="text" placeholder="search tweet keyword here"/></div>
            <div className='inline-block-child'>  <button type="button" className="w3-btn w3-blue w3-xlarge" onClick={this.getdata.bind(this)}>Get tweets</button></div>
        </div>
        <Wrapper>
        <Droppable className="tweet" id ="dr1" style ={droppableStyle}>
        {isLoaded && 
        <div>
        {JSON.parse(localStorage.getItem("user")).tweets.map(item=>
       
            <div>
                <Draggable style={{margin:'8px'}} id={item.id}>
    
                <div className="imagebox">
                 <img src={item.user.profileImageUrlHttps} alt="Avatar" style={{width:"30px"}}/>
                 <Item>{item.text}</Item>   
                </div>      
                  </Draggable>
             </div>
              
              )}
              </div>
    }           
          </Droppable>
          <p className="drag">Drag Tweets to Save</p>
         
          <Droppable id ="dr2" style ={droppableStyle}>   
          </Droppable>
       
          </Wrapper>
      
          </div>
         
      );
    }
  }
}



