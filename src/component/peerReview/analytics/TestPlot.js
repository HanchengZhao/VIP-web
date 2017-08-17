/*global Plotly*/
import React, { Component } from 'react';
import firebase from '../../../firebase';


class TestPlot extends Component {

  constructor() {
    super();
    this.state = {
      answers:''
    }
    this.buildGraph = this.buildGraph.bind(this);
    this.averageData = this.averageData.bind(this);
  }
  
  componentDidMount(){

    firebase.database().ref('Answers').on('value', (snap) => {
      this.setState({answers:snap.val()},()=>{
        this.buildGraph(this.state.answers)});
    });
  }

  averageData(graph) {
    graph[0].x.forEach((i)=>{
      
    });
  }

  buildGraph(data) {
    let Graph = []; 
    Object.keys(data).forEach((keys)=>{
      let line = {x:[],y:[],type:'scatter', name:keys};
      Object.keys(data[keys]).forEach((i)=>{
        
        (data[keys][i]).forEach((j, l)=>{
          if(j<=5){
            line.x.push(l);
            line.y.push(j);
          }
        })
      });
      Graph.push(line);
    });
    this.averageData(Graph);
    
    Plotly.newPlot('line', Graph);
  }

  render() {
    return(<div id='line'></div>);
  }
}

export default TestPlot;