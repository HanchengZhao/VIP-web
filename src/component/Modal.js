import React, { Component } from 'react';

class Modal extends Component{

	render(){
		return (
      <div className="container">
          <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
              <div className="modal-content">
              <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                  <h4>{this.props.message}</h4>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
              </div>

          </div>
          </div>
      </div>

		)
	}
}



export default Modal;