import React, {Component} from 'react';
import * as $ from "jquery";
import './FileItem.css';

class FileItem extends Component {

  deleteFile() {
    $.ajax({
      type: 'DELETE',
      url: 'http://localhost:9000/api/delete/' + this.props.filename,
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        if (data.status === 'success') {
          if (this.props.updateHandler) {
            this.props.updateHandler();
          }
        }
      },
      error: (data) => {
        alert('Ошибка удаления файла: ' + data.status)
      }
    })
  }

  downloadFile() {
    let link = document.createElement('a');
    link.setAttribute('href', '/uploads/' + this.props.filename);
    link.setAttribute('download', this.props.filename);
    link.click();
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