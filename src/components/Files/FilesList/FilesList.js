import React, {Component} from 'react';
import * as $ from "jquery";
import './FilesList.css';
import FileItem from "./FileItem/FileItem";

class FilesList extends Component {

  constructor() {
    super();
    this.state = {
      files: []
    }
  }

  componentDidMount() {
    this.loadFilesList();
  }

  loadFilesList(callback) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:9000/api/files',
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        if (data.status === 'success') {
          this.setState({
            files: data.files
          });
          if (callback)
            callback(null);
        } else {
          if (callback)
            callback(data.status);
        }
      },
      error: (data) => {
        if (callback)
          callback(data.status);
      }
    })
  }

  render() {
    return (
      <div className="container files-container">
        <ul className="list-group">
          {this.state.files.map((file, key) => <FileItem key={file} filename={file} updateHandler={this.loadFilesList.bind(this)}/>)}
        </ul>
      </div>
    )
  }
}

export default FilesList;