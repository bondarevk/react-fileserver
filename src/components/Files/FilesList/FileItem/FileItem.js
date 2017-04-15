import React, {Component} from 'react';
import './FileItem.css';

class FileItem extends Component {

  deleteFile() {
    console.log('api/delete/' + this.props.filename);
  }

  downloadFile() {
    console.log('/uploads/' + this.props.filename);
  }

  render() {
    return(
      <li className="list-group-item justify-content-between">
        {this.props.filename}
        <span className="btn-group">
          <button type="button" onClick={this.downloadFile.bind(this)} className="btn btn-sm btn-outline-secondary">Скачать</button>
          <button type="button" onClick={this.deleteFile.bind(this)} className="btn btn-sm btn-outline-danger">Удалить</button>
        </span>
      </li>
    )
  }

}

export default FileItem;