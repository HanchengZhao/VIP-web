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
    let averageGraph = [];
    graph.forEach((graph)=>{
      let average = {};
      let student = {x:[],y:[],type:'scatter', name:graph.name};
      graph.x.forEach((i,j)=>{
        if(!average[i]){
          average[i] = [];
        }
        average[i].push(graph.y[j]);
      });
      Object.keys(average).forEach((i)=>{
        let sum = average[i].reduce((sum,value)=>{
          return parseInt(sum) + parseInt(value);
        }, 0);
        student.y.push(sum/average[i].length);
        student.x.push(i);
      });
      averageGraph.push(student);
    })
    return averageGraph;
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
    
    Plotly.newPlot('line', this.averageData(Graph));
  }

  render() {
    return(<div id='line'></div>);
  }
}

export default TestPlot;