import React, { } from 'react';
import 'antd/dist/antd.css';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

 
const props = {
  name: 'file',
  multiple: true,
  action: 'http://localhost:5000/multiple-upload/',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      document.dispatchEvent(new CustomEvent('file_uploaded'));
      message.success(`${info.file.name} Файл амжилттай байршуулж дууслаа.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} Файл байршуулахад алдаа гарлаа.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const DragDrop: React.FC = () => {

  // useEffect(() => {
  //   const eventBus = {
  //     on(event, callback) {
  //       document.addEventListener(event, (e) => callback(e.detail));
  //     },
  //     dispatch(event, data) {
  //       document.dispatchEvent(new CustomEvent(event, { detail: data }));
  //     },
  //     remove(event, callback) {
  //       document.removeEventListener(event, callback);
  //     },
  //   };
  // })

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Файлаа дарж мөн чирж оруулна уу</p>
      </Dragger>
    </>
  );
};

export default DragDrop;
