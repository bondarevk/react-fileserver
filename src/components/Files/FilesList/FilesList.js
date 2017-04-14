import React, {Component} from 'react';
import './FilesList.css';
import FileItem from "./FileItem/FileItem";

class FilesList extends Component {

  constructor() {
    super();
    this.state = {
      files: []
    }
  }

  render() {
    return (
      <div className="container files-container">
        <ul className="list-group">
          <FileItem filename="info1.txt"/>
          <FileItem filename="info2.txt"/>
        </ul>
      </div>
    )
  }
}

export default FilesList;