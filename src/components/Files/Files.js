import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import FilesList from "./FilesList/FilesList";
import './Files.css';
import * as $ from "jquery";
import bootbox from 'bootbox';

const DropZone = require('react-dropzone');

class Files extends Component {

  constructor() {
    super();
    this.state = {
      files: [],
      loadEnabled: true,
      errorMessage: "",
      successMessage: "",
      loadProgress: 0
    }
  }

  onDrop(files) {
    if (!this.state.loadEnabled) {
      return;
    }

    this.setState({
      files: files
    })
  }

  /**
   * Загрузка файлов на сервер
   */
  startLoad() {
    this.setState({
      loadEnabled: false,
      loadProgress: 0
    });

    let formData = new FormData();
    this.state.files.forEach((file) => {
      formData.append('file', file);
    });

    $.ajax({
      type: 'PUT',
      url: '/api/upload',
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
        this.refs['filesList'].loadFilesList();
      },
      error: (data) => {
        this.setState({
          loadEnabled: true,
          successMessage: "",
          errorMessage: "Не удалось загрузить файлы. (" + data.status + ")"
        })
      }
    })
  }

  /**
   * Проверка конфликтов имен загружаемых файлов
   * @param callback Вызывается после решения конфликтов в пользу новых файлов
   */
  checkOverwrite(callback) {
    this.refs['filesList'].loadFilesList((error) => {
      if (error) {

        this.setState({
          successMessage: "",
          errorMessage: "Не удалось загрузить файлы. (" + error + ")",
        })

      } else {
        if (this.state.files.some(file => this.refs['filesList'].state.files.includes(file.name))) {

          bootbox.confirm({
            message: 'На сервере уже есть файлы с таким названием.<br>Перезаписать?',
            buttons: {
              confirm: {
                label: 'Да',
                className: 'btn-danger'
              },
              cancel: {
                label: 'Отмена'
              }
            },
            callback: (result) => {
              if (result === true) {
                callback();
              }
            }
          })

        } else {
          callback();
        }
      }
    })
  }

  onClickLoad() {
    this.checkOverwrite(() => {
      this.startLoad();
    })
  }

  render() {
    return (
      <div>

        <Helmet>
          <title>Files</title>
        </Helmet>

        <div className="upload-container container">
          <form>
            {this.state.successMessage ?
              <div className="alert-message alert alert-success" role="alert">
                {this.state.successMessage}
              </div>
              : null}
            {this.state.errorMessage ?
              <div className="alert-message alert alert-danger" role="alert">
                <strong>Ошибка!</strong> {this.state.errorMessage}
              </div>
              : null}

            <DropZone onDrop={this.onDrop.bind(this)} disableClick={!this.state.loadEnabled} className='dropzone'
                      activeClassName='dropzone dropzone-active'>{
              this.state.files.length > 0 ?
                <div style={{display: 'inline-block'}}>
                  Выбранные файлы:
                  <ul>
                    {this.state.files.map((file, key) => <li key={key}>{file.name}</li>)}
                  </ul>
                </div>
                : <div>Загрузить файл</div>}
            </DropZone>

            <div className="progress progress-load">
              <div className="progress-bar progress-bar-striped" role="progressbar"
                   style={{width: this.state.loadProgress + '%'}} aria-valuenow={this.state.loadProgress.toString()}
                   aria-valuemin="0" aria-valuemax="100"/>
            </div>

            <button ref="myButton" type="button" className="btn btn-primary btn-upload"
                    onClick={this.onClickLoad.bind(this)}
                    disabled={this.state.files.length === 0 || !this.state.loadEnabled}>
              Загрузить на сервер
            </button>

          </form>
        </div>
        <FilesList ref="filesList"/>
      </div>

    )
  }

}

export default Files;