var functions = require('firebase-functions');
const admin = require('firebase-admin');
const secureCompare = require('secure-compare');
var sg = require('sendgrid')(functions.config().sendgrid.key);
//init
admin.initializeApp(functions.config().firebase);
//configurations
const Announcement_Raw_Data = "Announcement_Raw_Data";
const Announcement_Path = "Announcement/admin";
const Announcement_Sunset = "Announcement_Sunset";
// Send emails to contacts when a student application is submitted
exports.studentApplicationNotice = functions.database.ref('/StudentApplication_Raw_Data/{applyId}')
  .onWrite(event => {
    if(!event.data.val()) {
      throw "this is not an onCreate event"
    }
    const applyId = event.params.applyId;
    const application = event.data.val();
    const teamName = application.teamName;
    let emailList;
    let nameList;
    return admin.database().ref("StudentApplication/" + applyId).set(
          application
      ).then(() => { //copy application to "StudentApplication"
        return admin.database().ref().child("Teams").orderByChild('teamName').equalTo(teamName).once("value").then((snap) => {
          let matchteam = snap.val() // contactList: {"-KpsvBfEJm0uvEL3bacU":{"advisor":"","contactEmail":"chancidy@gmail.com","contactPerson":"Henry Zhao",
          // console.log('matchteam: ', matchteam)
          Object.keys(matchteam).forEach((key) => {
            emailList = matchteam[key].leadFacultyEmail.split(",")
            nameList = matchteam[key].leadFacultyName.split(",")
          })
            console.log("contactList: "+ emailList + nameList)
          })
      }).then(() => {
        let formatted = putJsonInTable(application);
        for(let i = 0; i < emailList.length; i++){
          let request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: {
              personalizations: [{
                to: [{ email: emailList[i] }],
                'substitutions': {
                  '-name-': nameList[i],
                },
                subject: 'A new student application is submitted'
              }],
              from: {
                email: 'noreply@em.hzhao.me'
              },
              content: [{
                type: 'text/html',
                value: `<p>Applicaiton information:</p> ${formatted.join("")}`
              }],
              'template_id': functions.config().sendgrid.studentapplicationid,
            }
          });
          // With promise
          sg.API(request)
            .then(function(response) {
              console.log(response.statusCode);
              console.log(response.body);
              console.log(response.headers);
            })
            .catch(function(error) {
              console.log(error.response.statusCode);
            });
        }
      })
  });
// Send emails to admins when a team application is submitted
exports.teamApplicationNotice = functions.database.ref('/TeamApplication_Raw_Data/{applyId}')
  .onWrite(event => {
    if(!event.data.val()) {
      throw "this is not an onCreate event"
    }
    const applyId = event.params.applyId;
    const application = event.data.val();
    //application:{"desc":"","email":"Mirotznik@udel.edu","logo":"","members":"","name":"Mark Mirotznik","sections":[{"content":"EE, CE and BME â€“ Electronic material design, biosensing, additive manufacturing of electronic components, RF component design, testing and validation EE, CE and CS â€“ Embedded computing and wireless communication","title":"Major"},{"content":"","title":"Requirements"},{"content":"Mark Mirotznik (ECE)","title":"Advisor"}],"status":"","subtitle":"Continuous health monitoring","title":"E-Textiles","topics":["\"Biosignal Processing\""," \"Additive Manufacturing\""," \"Electronic Materials\""," \"RF Communication\""]}
    console.log("application: " + application);
    let adminLists;
    return admin.database().ref("Admin").once("value").then((snap) => {
        adminLists = snap.val()
          // adminList: { uuid123: { email: 'chancidy@gmail.com', name: 'Henry Zhao' },
          // uuid234514: { email: 'hzhao0329@gmail.com', name: 'Hzzzz' } }
      }).then(() => { //copy application to "TeamApplication"
        return admin.database().ref("TeamApplication/" + applyId).set(
          application
        )
      }).then(() => {
        let formatted = putJsonInTable(application);
        Object.keys(adminLists).forEach((uuid) => {
          let request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: {
              personalizations: [{
                to: [{ email: adminLists[uuid].email }],
                'substitutions': {
                  '-name-': adminLists[uuid].name,
                },
                subject: 'A new team application is submitted'
              }],
              from: {
                email: 'noreply@em.hzhao.me'
              },
              content: [{
                type: 'text/html',
                value: `<p>Applicaiton information:</p> ${formatted.join("")}`
              }],
              'template_id': functions.config().sendgrid.templateid,
            }
          });
          // With promise
          sg.API(request)
            .then(function(response) {
              console.log(response.statusCode);
              console.log(response.body);
              console.log(response.headers);
            })
            .catch(function(error) {
              // error is an instance of SendGridError
              // The full response is attached to error.response
              console.log(error.response.statusCode);
            });
        });

      })
      // .then(() => { // remove the data from "Raw data" key after sending the email to save space
      //   return admin.database().ref("TeamApplication_Raw_Data/"+ applyId).remove()
      // })
  });

exports.teamApproval = functions.database.ref('/Teams/{uuid}')
  .onWrite(event => {
    if(!event.data.val()) {
      throw "this is not an onCreate event"
    }
    const uuid = event.params.uuid;
    const teaminfo = event.data.val();
    console.log(teaminfo)
    const teamName = teaminfo.title
    let emailList = teaminfo.email.split(",")
    let nameList = teaminfo.advisor.split(",")
    for(let i = 0; i < emailList.length; i++){
      let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
          personalizations: [{
            to: [{ email: emailList[i] }],
            'substitutions': {
              '-name-': nameList[i],
              '-team-': teamName
            },
            subject: 'Your team application is approved'
          }],
          from: {
            email: 'noreply@em.hzhao.me'
          },
          // content: [{
          //   type: 'text/html',
          //   value: `<p>Applicaiton information:</p> ${formatted.join("")}`
          // }],
          'template_id': functions.config().sendgrid.teamapprovalid,
        }
      });
      // With promise
      sg.API(request)
        .then(function(response) {
          console.log(response.statusCode);
          console.log(response.body);
          console.log(response.headers);
        })
        .catch(function(error) {
          console.log(error.response.statusCode);
        });
      }
    })

  

exports.dailyAnnouncementCron = functions.https.onRequest((req, res) => {
  const key = req.query.key;
  // Exit if the keys don't match
  if (!secureCompare(key, functions.config().cron.key)) {
    console.log('The key provided in the request does not match the key set in the environment. Check that', key,
      'matches the cron.key attribute in `firebase env:get`');
    res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the ' +
      'cron.key environment variable.');
    return;
  }
  const currentTime = new Date().getTime();
  let newAnnouncement;
  let sunset;
  //check startDate in raw data 
  let addWaitedList = admin.database().ref().child(Announcement_Raw_Data).orderByChild('startDate').endAt(currentTime).once("value")
    .then(snap => {
      newAnnouncement = snap.val();
      console.log(newAnnouncement)
      if (newAnnouncement) {
        return admin.database().ref().child(Announcement_Path).update(newAnnouncement)
      }
    }).then(() => {
      let update = {}
      Object.keys(newAnnouncement).forEach((uuid) => {
        update[uuid] = null;
      });
      console.log(Object.keys(newAnnouncement).length + " announcements have been updated");
      admin.database().ref(Announcement_Raw_Data).update(update);
    }).catch(err => {
      res.send(err)
    })
    //check endDate in announcements
  let deleteOverDue = admin.database().ref().child(Announcement_Path).orderByChild('endDate').endAt(currentTime).once("value")
    .then(snap => {
      sunset = snap.val()
      console.log(sunset)
      if (sunset) {
        return admin.database().ref().child(Announcement_Sunset).update(sunset)
      }
    }).then(() => {
      if (sunset) {
        let update = {}
        Object.keys(sunset).forEach((uuid) => {
          update[uuid] = null;
        });
        console.log(Object.keys(sunset).length + " announcements have been sunset");
        return admin.database().ref().child(Announcement_Path).update(update);
      } else {
        console.log("No announcements need to be sunset")
      }

    }).catch(err => {
      res.send(err)
    })
  Promise.all([addWaitedList, deleteOverDue]).then(value => {
    console.log(`Cron job for ${new Date()} has been completed`)
  });
})

exports.studentAddPending = functions.database.ref('/Student_Add_Pending/{teamname}/{semester}/{uuid}')
  .onWrite(event => {
    if(!event.data.val()) {
      throw "no student is added under student add pending";
    }
    const studentinfo = event.data.val();
    const teamname = event.params.teamname;
    const semester = event.params.semester;
    const uuid = event.params.uuid;
    console.log(teamname, semester,uuid,studentinfo)
    return admin.database().ref().child(`Students/${teamname}/${semester}/${uuid}`).update(studentinfo)// move to students key
    .then(() => {
      return admin.database().ref().child(`Users/${uuid}`).update({ // add student to the user
        email: studentinfo.email,
        role: 'student'
      })
    }).then(() => { // send an email to the student
      let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
          personalizations: [{
            to: [{ email: studentinfo.email }],
            'substitutions': {
              '-name-': studentinfo.name,
              '-teamname-': teamname,
              '-sitelink-': 'http://peer-review-25758.firebaseapp.com'
            },
            subject: `Your application of team ${teamname} is approved`
          }],
          from: {
            email: 'noreply@em.hzhao.me'
          },
          'template_id': functions.config().sendgrid.student_accept_notice,
        }
      })
      sg.API(request)
        .then(function(response) {
          console.log(response.statusCode);
          console.log(response.body);
          console.log(response.headers);
        })
        .catch(function(error) {
          console.log(error.response.statusCode);
        });
    }).then(() => { // remove the pending data
      return admin.database().ref().child(`Student_Add_Pending/${teamname}/${semester}/${uuid}`).remove();
    })
  })

exports.studentRemovePending = functions.database.ref('/Student_Remove_Pending/{teamname}/{semester}/{uuid}')
.onWrite(event => {
  if(!event.data.val()) {
    throw "no student is removed under student remove pending";
  }
  const studentinfo = event.data.val();
  const teamname = event.params.teamname;
  const semester = event.params.semester;
  const uuid = event.params.uuid;
  console.log('removed student: ', studentinfo)
  return admin.database().ref().child(`Students/${teamname}/${semester}/${uuid}`).remove()// move to students key
  .then(() => {
    return admin.database().ref().child(`Users/${uuid}`).remove()
  }).then(() => { // remove the pending data
    return admin.database().ref().child(`Student_Remove_Pending/${teamname}/${semester}/${uuid}`).remove();
  })
})

exports.advisorAddPending = functions.database.ref('/Advisor_Add_Pending/{uuid}')
.onWrite(event => {
  if(!event.data.val()) {
    throw "no advisor is added under advisor add pending";
  }
  const advisorinfo = event.data.val();
  const uuid = event.params.uuid;
  console.log('added advisor: ',advisorinfo)
  return admin.database().ref().child(`Advisor/${uuid}`).update(advisorinfo)// move to advisor key
  .then(() => {
    return admin.database().ref().child(`Users/${uuid}`).update({ // add advisor to the user
      email: advisorinfo.email,
      role: 'advisor'
    })
  }).then(() => { // remove the pending data
    return admin.database().ref().child(`Advisor_Add_Pending/${uuid}`).remove();
  })
})

exports.advisorRemovePending = functions.database.ref('/Advisor_Remove_Pending/{uuid}')
.onWrite(event => {
  if(!event.data.val()) {
    throw "no advisor is removed under advisor remove pending";
  }
  const advisorinfo = event.data.val();
  const uuid = event.params.uuid;
  console.log('removed advisor: ', advisorinfo)
  return admin.database().ref().child(`Advisor/${uuid}`).remove()// move to students key
  .then(() => {
    return admin.database().ref().child(`Users/${uuid}`).remove()
  }).then(() => { // remove the pending data
    return admin.database().ref().child(`Advisor_Remove_Pending/${uuid}`).remove();
  })
})


exports.adminAddPending = functions.database.ref('/Admin_Add_Pending/{uuid}')
.onWrite(event => {
  if(!event.data.val()) {
    throw "no admin is added under admin add pending";
  }
  const admininfo = event.data.val();
  const uuid = event.params.uuid;
  console.log('added admin: ',admininfo)
  return admin.database().ref().child(`Admin/${uuid}`).update(admininfo)// move to admin key
  .then(() => {
    return admin.database().ref().child(`Users/${uuid}`).update({ // add admin to the user
      email: admininfo.email,
      role: 'admin'
    })
  }).then(() => { // remove the pending data
    return admin.database().ref().child(`Admin_Add_Pending/${uuid}`).remove();
  })
})

exports.adminRemovePending = functions.database.ref('/Admin_Remove_Pending/{uuid}')
.onWrite(event => {
  if(!event.data.val()) {
    throw "no Admin is removed under Admin remove pending";
  }
  const admininfo = event.data.val();
  const uuid = event.params.uuid;
  console.log('removed Admin: ', admininfo)
  return admin.database().ref().child(`Admin/${uuid}`).remove()
  .then(() => {
    return admin.database().ref().child(`Users/${uuid}`).remove()
  }).then(() => { // remove the pending data
    return admin.database().ref().child(`Admin_Remove_Pending/${uuid}`).remove();
  })
})

//utils
let putJsonInTable = (json) => {
  let formatted = ["<table>"];
  Object.keys(json).forEach((key) => {
    formatted.push(`<tr><td>${key} : </td><td> ${JSON.stringify(json[key])}</td></tr>`)
  })
  formatted.push("</table>")
  return formatted;
}

