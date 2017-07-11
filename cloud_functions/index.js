var functions = require('firebase-functions');
const admin = require('firebase-admin');
var sg = require('sendgrid')(functions.config().sendgrid.key);
//init
admin.initializeApp(functions.config().firebase);
// Send emails to admins when a team application is submitted
exports.teamApplicationNotice = functions.database.ref('/TeamApplication_Raw_Data/{applyId}')
  .onWrite(event => {
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
      return admin.database().ref("TeamApplication/"+ applyId).set(
        application
      )
    }).then(()=> {
      Object.keys(adminLists).forEach((uuid) => {
        let request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: {
                personalizations: [
                  {
                    to: [{email: adminLists[uuid].email}],
                    'substitutions': {
                      '-name-': adminLists[uuid].name,
                    },
                    subject: 'A new team application is submitted'
                  }
                ],
                from: {
                  email: 'noreply@em.hzhao.me'
                },
                content: [
                  {
                      type: 'text/html',
                      value: `<p>Applicaiton information is ${JSON.stringify(application)}</p>`
                  }
                ],
                'template_id': 'c4513b47-8b42-40d0-9d22-3abaa173c417',
            }
            });
            // With promise
            sg.API(request)
            .then(function (response) {
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
            })
            .catch(function (error) {
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