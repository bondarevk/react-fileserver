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

  loadFilesList() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:9000/api/files',
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        if (data.status === 'success') {
          this.setState({
            files: data.files
          })
        }
      }
    })
  }

  componentDidMount() {
    this.loadFilesList();
    this.countdown = setInterval(this.loadFilesList.bind(this), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
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