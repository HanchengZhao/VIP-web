import firebase from '../../firebase';
import appStore from '../../stores/AppStore';
import userStore from '../../stores/UserStore';

export const fetchRole = (email) => {

  firebase.database().ref("Users").orderByChild('email').equalTo(email).once('value', (snapshot) => {
    console.log(snapshot);
    snapshot.forEach(child => {
      userStore.fetchUserRole(child.val().role)
      window.role = child.val().role
      appStore.finishLoading()
    })
  });
}

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

