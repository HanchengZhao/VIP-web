import React from 'react';
import Primary, {university, validDomain} from './Theme';

export const Validation = (rawEmail) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
    let email = rawEmail.split('@');
    return(email[1] === validDomain && re.test(rawEmail));
}