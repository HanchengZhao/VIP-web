import React, { Component } from 'react';

//Material UI ELEMENTS
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

//Style sheet
import '../style/ProjectPage.css';


var data = {"title": "Cloud Crypto",
 "subtitle": "Data security for the new age",
 "logo":"/img/crypto.png",
 "topics":["Cryptography", "Homomorphic Encryption", "Penetration Testing", "ATM Security", "Blockchain Applications", "Secure Web Applications"],
 "sections":[
   {"title":"GOALS",
    "content":`
    The Cloud Crypto team has several aims.  We are working actively on ATM security using biometrics,
    Blockchain voting systems, Penetration Testing, Secure Web App Design, and Fully Homomorphic Encryption.

    Overall, this project aims to create practical and economically disruptive security solutions.
    Currently, every medical, financial, and governmental institution that must update and
    search confidential records has to have secure hardware, secure software, and secure staff.
    They are unable to take full advantage of the internetâ€sized economies of scale
    that drive our modern economy. The central technological hurdle is creating practical
    security schemes that allow untrusted machines to perform queries and
    updates on encrypted data. Until very recently this was considered
    impossible, but in the last few years theoretical, yet infeasible, schemes have been devised.
    This project aims to push the boundaries of cryptographic applications.
    From blockchain, to an untrusted cloud, into our post-quantum future.
    We will need both technological and political breakthroughs to progress.
    `}
   , {"title":"KEY ELEMENTS",
    "content":`
Computational  Mathematics,  Management  Information  Systems,  Healthcare  IT,  Highâ€Performance  Computing,

Cryptography, Quantum Computing, ATM Security, Biometrics, Pen Testing, Cryptographic Currencies
    `}
   , {"title":"RESEARCH ISSUES",
    "content":`
Latticeâ€based  Cryptography,  Homomorphic  Encryption,  Postâ€quantum  Security,  Security  Proofs,  Sideâ€channel

Attacks,  Dynamic  Message  Authentication,  Confidential  Querying,  Network  Security,  Massively  Parallel

Computation, Blockchain
    `}
   , {"title":"ADVISOR",
    "content":`Andy Novocin (ECE)`}
   , {"title":"MAJORS, PREPARATION, INTERESTS",
    "content":`
  Mathematics  â€“  Algebraic  Number  Theory,  Lattice  Invariants,  Diophantine  System  Solving,  Probabilistic

  Analysis, Modular Interval Arithmetic

  CSI â€“ Complexity Analysis, Proofs of Security, Penetration Testing

  CmpE,  CS  â€“  Optimizations,  High  Performance  Implementations,  Parallel  Algorithms,  Logic  circuit

  obfuscation, FPGAs, GPUs

  MIS â€“ Bringing these solutions to market, distributed record management, confidentiality preservation, secure dataâ€mining
    `}
 ]
}

class Project extends Component {

  componentDidMount() {
    console.log(data);
  }


  render() {
    let topics = data.topics.map((topics) =>
      <li>{topics}</li>
    )
    let sections = data.sections.map((sections) =>
      <div>
        <h4>{sections.title}</h4>
        <p>{sections.content}</p>
      </div>
    )
    return (
      <div className = "row">
        <MuiThemeProvider>
          <div>
            <h1 className = "title"> {data.title} </h1>
            <h3 className = "title"> {data.subtitle} </h3>
            <h3>Research Areas</h3>
            <div>{topics}</div>
            <div>{sections}</div>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <RaisedButton label = "apply" id = "applyButton" backgroundColor = "#ffc425" style = {{float: "right", margin:"10"}}/>
            </MuiThemeProvider>
          </div>
      </MuiThemeProvider>
      </div>
  );
  }
}

export default Project;
