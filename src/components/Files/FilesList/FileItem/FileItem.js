import React, {Component} from 'react';
import './FileItem.css';

class FileItem extends Component {

  deleteFile() {

  }

  downloadFile() {

  }

  render() {
    return(
      <li className="list-group-item justify-content-between">
        {this.props.filename}
        <span className="btn-group">
          <button type="button" onClick={this.downloadFile.bind(this)} className="btn btn-secondary">Скачать</button>
          <button type="button" onClick={this.deleteFile.bind(this)} className="btn btn-danger">Удалить</button>
        </span>
      </li>
    )
  }

}

export default FileItem;