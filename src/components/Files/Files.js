import React, {Component} from 'react';
import './Files.css';
import * as $ from "jquery";
const Dropzone = require('react-dropzone');

class Files extends Component {

  constructor() {
    super();
    this.state = {
      files: [],
      loadEnabled: true,
      errorMessage: "",
      successMessage: "",
      loadProgress: 0
    };
  }

  onDrop(files) {
    if (!this.state.loadEnabled) {
      return;
    }

    this.setState({
      files: files
    });
  }

  startLoad() {
    this.setState({
      loadEnabled: false
    });

    let formData = new FormData();
    this.state.files.forEach((file) => {
      formData.append('file', file);
    });

    $.ajax({
      type: 'POST',
      url: 'api/upload',
      data: formData,
      xhr: () => {
        let xhr = $.ajaxSettings.xhr();
        if (xhr.upload) {
          xhr.upload.addEventListener('progress', (event) => {
            this.setState({
              loadProgress: (event.loaded / event.total) * 100
            });
          }, false);
        }
        return xhr;
      },
      cashe: false,
      contentType: false,
      processData: false,
      success: (data) => {
        this.setState({
          files: [],
          loadEnabled: true,
          successMessage: "Загрузка успешно завершена.",
          errorMessage: ""
        });
        console.log('success: ', data);
      },
      error: (data) => {
        this.setState({
          loadEnabled: true,
          successMessage: "",
          errorMessage: "Не удалось загрузить файлы. (" + data.status + ")",
          loadProgress: 0
        });
        console.log('error: ', data);
      }
    });

  }

  checkOverwrite(callback) {
    if (true) {
      callback();
    }
  }

  onClickLoad() {
    this.checkOverwrite(() => {
      this.startLoad();
    });
  }

  render() {
    return (
      <div className="upload-container container">
        <form>
          {this.state.successMessage ?
            <div className="alert-message alert alert-success" role="alert">
              <strong>Успех!</strong> {this.state.successMessage}
            </div>
            : null}
          {this.state.errorMessage ?
            <div className="alert-message alert alert-danger" role="alert">
              <strong>Ошибка!</strong> {this.state.errorMessage}
            </div>
            : null}

          <Dropzone onDrop={this.onDrop.bind(this)} disableClick={!this.state.loadEnabled} className='dropzone'
                    activeClassName='dropzone dropzone-active'>{
            this.state.files.length > 0 ?
              <div style={{display: 'inline-block'}}>
                Выбранные файлы:
                <ul>
                  {this.state.files.map((file, key) => <li key={key}>{file.name}</li>)}
                </ul>
              </div>
              : <div>Загрузить файл</div>}
          </Dropzone>

          <div className="progress progress-load">
            <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: this.state.loadProgress + '%'}} aria-valuenow={this.state.loadProgress.toString()} aria-valuemin="0" aria-valuemax="100"/>
          </div>

          <button ref="myButton" type="button" className="btn btn-primary btn-upload" onClick={this.onClickLoad.bind(this)}
                  disabled={this.state.files.length === 0 || !this.state.loadEnabled}>
            Загрузить на сервер
          </button>

        </form>
      </div>
    )
  }

}

export default Files;