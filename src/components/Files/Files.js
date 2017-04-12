import React, {Component} from 'react';
import './Files.css';
const Dropzone = require('react-dropzone');

class Files extends Component {

  constructor() {
    super();
    this.state = {
      files: [],
      loadEnabled: true
    };
  }

  onDrop(files) {
    if (!this.state.loadEnabled) {
      return;
    }

    console.log('Received files: ', files);
    this.setState({
      files: files
    });
  }

  startLoad() {
    this.setState({
      loadEnabled: false
    });


  }

  onClickLoad() {
    this.startLoad();
  }

  render() {
    return (
      <div>
        <form>
          <Dropzone onDrop={this.onDrop.bind(this)} disableClick={!this.state.loadEnabled} className='dropZone' activeClassName='dropZoneActive'>
            {
              this.state.files.length > 0 ?
                <div style={{display: 'inline-block'}}>
                  Выбранные файлы:
                  <ul>
                    {this.state.files.map((file, key) => <li key={key}>{file.name}</li>)}
                  </ul>
                </div>
                :
                <div>Загрузить файл</div>
            }

          </Dropzone>
          <button type="button" className="btn btn-primary btn-upload" onClick={this.onClickLoad.bind(this)}
                  disabled={this.state.files.length === 0 || !this.state.loadEnabled}>Загрузить на сервер
          </button>


        </form>
      </div>
    )
  }

}

export default Files;