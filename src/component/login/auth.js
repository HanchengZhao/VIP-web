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
