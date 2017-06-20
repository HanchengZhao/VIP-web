import React, { Component } from 'react';
import FileInput from 'react-file-input';
import Progress from 'react-progressbar';
import * as firebase from 'firebase';


class UploadCsvComponent extends Component{

  constructor(props) {
      super(props);
      this.state = {
            percent: 0,
      };
      this.showProgress = this.showProgress.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

   showProgress(x){
     this.setState({
       percent: x
     });
   }



   handleChange = (event) => {
        var file =event.target.files[0];
        var storageRef = firebase.storage().ref('CSV/'+file.name);
        var task = storageRef.put(file);
        var that = this;

        task.on('state_changed',
          function progress(snapshot){
                var percentage=(snapshot.bytesTransferred/snapshot.totalBytes) *100;
                that.showProgress(percentage);
            },
          function error(err){

            },
          function complete(){

                   storageRef.getDownloadURL().then(function(url) {
                       const rootRef = firebase.database().ref().child('CSVFile');
                       rootRef.push({
                         CsvURL : url
                       });

            }).catch(function(error) {
       // Handle any errors
            });
          }
        );
    }

	render(){
		return (
		    <div>
        <progress value="0" max="100" id="uploader" value={this.state.percent}></progress>
        <FileInput name="upload"
                   accept=".csv"
                   placeholder="CSV Upload"
                   onChange={this.handleChange}  />
		    </div>
				)
	}
}



export default UploadCsvComponent;
