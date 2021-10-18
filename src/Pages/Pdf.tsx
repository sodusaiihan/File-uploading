import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'antd';
import styled from 'styled-components';

// Import Axios
import useAxios from 'axios-hooks';

// Import types
import { FileInfo } from '../types';

// Import Image
import User from '../images/User-1.png';

// Core viewer
import { Worker, Viewer, SpecialZoomLevel, ProgressBar } from '@react-pdf-viewer/core';

// Import PDF plugins
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { attachmentPlugin } from '@react-pdf-viewer/attachment';
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail';
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode';

// Import styles
import '@react-pdf-viewer/bookmark/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/attachment/lib/styles/index.css';
import '@react-pdf-viewer/thumbnail/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/scroll-mode/lib/styles/index.css';

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const StyledList = styled(List)`
  margin: 1rem;
`;

const StyledListItem = styled(List.Item)`
  margin: 1rem 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Pdf: React.FC = () => {
  const pdfVersion = '2.10.377';
  const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfVersion}/pdf.worker.js`;

  // Create new plugin instance
  const bookmarkPluginInstance = bookmarkPlugin();
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const attachmentPluginInstance = attachmentPlugin();
  const thumbnailPluginInstance = thumbnailPlugin();
  const scrollModePluginInstance = scrollModePlugin();

  const [{ data }] = useAxios<FileInfo[]>('http://localhost:5000/all/pdf');
  const [files, setFiles] = useState<FileInfo[]>([]);

  useEffect(() => {
    if (data) {
      setFiles(
        data.map(({ _id, uploadDate, filename, contentType }) => {
          return {
            _id,
            uploadDate,
            filename,
            contentType,
          };
        }),
      );
    }
  }, [data]);

  return (
    <Wrapper>
      <StyledList
        itemLayout="vertical"
        size="default"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={files}
        renderItem={(item) => (
          <StyledListItem
            key={(item as FileInfo).filename}
            extra={
              <Worker workerUrl={pdfWorkerUrl}>
                <div style={{ height: '720px', width: '720px' }}>
                  <Viewer
                    fileUrl={`http://localhost:5000/pdf/${(item as FileInfo).filename}`}
                    defaultScale={SpecialZoomLevel.ActualSize}
                    plugins={[
                      bookmarkPluginInstance,
                      defaultLayoutPluginInstance,
                      attachmentPluginInstance,
                      thumbnailPluginInstance,
                      scrollModePluginInstance,
                    ]}
                    renderLoader={(percentages: number) => (
                      <div style={{ width: '240px' }}>
                        <ProgressBar progress={Math.round(percentages)} />
                      </div>
                    )}
                  />
                </div>
              </Worker>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={User} />}
              title={(item as FileInfo).filename}
              description={(item as FileInfo).uploadDate}
            />
          </StyledListItem>
        )}
      />
    </Wrapper>
  );
};

export default Pdf;
