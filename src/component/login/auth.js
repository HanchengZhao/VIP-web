import firebase from '../../firebase';
import appStore from '../../stores/AppStore';
import userStore from '../../stores/UserStore';

export const fetchRole = (email) => {
  return new Promise((resolve, reject) => {
    firebase.database().ref("Users").orderByChild('email').equalTo(email).once('value', (snapshot) => {
      if (snapshot.val() !== null) {
        snapshot.forEach(child => {
          resolve(child.val().role);
        })
      } else {
        reject("not_found");
      }
    })
  })
  
}