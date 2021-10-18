import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'antd';
import styled from 'styled-components';

// Import Axios
import useAxios from 'axios-hooks';

// Import types
import { FileInfo } from '../types';

// Import Image
import User from '../images/User-1.png';

// Import Player
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

const Video: React.FC = () => {
  const [{ data }] = useAxios<FileInfo[]>('http://localhost:5000/all/videos');
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
              <video
                height={500}
                width={500}
                controls
                poster="https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              >
                <source src={`http://localhost:5000/video/${(item as FileInfo).filename}`}  type="video/mp4"/>
              </video>
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

export default Video;
