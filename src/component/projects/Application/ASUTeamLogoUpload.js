import React, { Component } from 'react';

import FileInput from 'react-file-input';

import firebase from 'firebase';


class ASUTeamLogoUpload extends Component{

  constructor(props) {
      super(props);
      this.state = {
            percent: 0,
            downloadUrl: '',
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
        var storageRef = firebase.storage().ref('TeamLogo/'+file.name);
        var task = storageRef.put(file);
        var that = this;


        task.on('state_changed',
          function progress(snapshot) {
                var percentage=(snapshot.bytesTransferred/snapshot.totalBytes) *100;
                that.showProgress(percentage);
            },
          function error(err){

            },
          function complete() {
            storageRef.getDownloadURL().then( (url) => {
                that.setState({
                  downloadUrl: url,
                });
                that.props.childdata(url);
            });
          }
        );
    }

	render(){
		return (
		    <div>
          <div className="progress">
            <div className="progress-bar progress-bar-striped active" role="progressbar"
               aria-valuemin="0" aria-valuemax="100" style={{width: `${this.state.percent}%`}}>{this.state.percent}%</div>
          </div>
              <FileInput name="myImage"
                         accept=".png,.gif,.jpg,.JPG,.jpeg"
                         placeholder="TeamLogo Uploader"
                         style={{backgroundColorcolor: '#ffc627'}}
                         onChange={this.handleChange} />
		    </div>
				)
	}
}



export default ASUTeamLogoUpload;