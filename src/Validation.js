import React from 'react';
import Primary, {university, validDomain} from './Theme';

export const Validation = (rawEmail) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
    let email = rawEmail.split('@');
    return(email[1] === validDomain && re.test(rawEmail));
}

export const checkEmpty = (error, project, email, notIncluded) => {
    let temp = [];
    let emailMessage = '';
    Object.keys(project).forEach((i) =>{
      if(!notIncluded.includes(i)){
      if(!(project[i])) {
        error[i] = 'This Field is Required';
        temp.push(false);
      }else{
        error[i] = '';
        temp.push(true);
      }
      }
    });
    if(!Validation(email)){
        emailMessage = "Please Enter A Valid " + university + " Email";
        temp.push(false);
    }
    return([!temp.includes(false), error, emailMessage]);
  }