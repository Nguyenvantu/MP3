import React, { Component, Fragment } from "react";
import { Modal, Upload, Icon, message, Progress } from "antd";
import axios from "axios";
import { ROOT_URL } from "../../settings";
import { compress } from "../../helpers/utility";

class Uploads extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    isLoading: false,
    progressUpload: -1
  };

  static defaultProps = {
    folder: "guest",
    width: 700,
    fileList: [],
    multiple: true,
    compressOptions: { maxWidth: 568, maxHeight: 568 }
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = ({ url }) => {
    this.setState({
      previewImage: url,
      previewVisible: true
    });
  };

  removeImage = ({ uid }) => {
    const { fileList, onChange } = this.props;
    onChange(fileList.filter(i => i.uid !== uid));
  };

  customRequest = ({ file }) => {
    this.setState({ progressUpload: 0 });
    const { compressOptions } = this.props;
    compress(file, compressOptions).then(newFile => {
      const formData = new FormData();
      formData.append("file", newFile);
      axios
        .post(`${ROOT_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // authorization: getToken()
          },
          onUploadProgress: ({ loaded, total }) => {
            const percent = (loaded / total) * 100;
            this.setState({ progressUpload: percent });
            if (percent === 100) {
              setTimeout(() => {
                this.setState({ progressUpload: -1 });
              }, 200);
            }
          }
        })
        .then(({ data }) => {
          if (data.error_code === 0) {
            const { onChange, fileList, single } = this.props;
            onChange(
              single
                ? [
                    {
                      uid: Date.now(),
                      url: ROOT_URL + data.data
                    }
                  ]
                : [
                    ...fileList,
                    {
                      uid: Date.now(),
                      url: ROOT_URL + data.data
                    }
                  ]
            );
          } else {
            message.error("Lỗi! " + data.error_msg);
          }
        })
        .catch(() => {
          message.error("Không thể kết nối với server!");
        });
    });
  };

  render() {
    const { previewVisible, previewImage, progressUpload } = this.state;
    const { width, fileList, multiple = false, disabled } = this.props;
    console.log(fileList)
    return (
      <Fragment>
        <Upload
          listType="picture-card"
          accept=".jpg, .jpeg, .png, .svg"
          onRemove={this.removeImage}
          fileList={fileList}
          onPreview={this.handlePreview}
          customRequest={this.customRequest}
          multiple={multiple}
        >
          {!disabled &&
            (progressUpload > -1 ? (
              <Progress percent={progressUpload} showInfo={false} />
            ) : (
              <Fragment>
                <Icon type="plus" />
                <div>Tải lên</div>
              </Fragment>
            ))}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
          width={width}
        >
          <img alt="" className="w-100" src={previewImage} />
        </Modal>
      </Fragment>
    );
  }
}

export default Uploads;
