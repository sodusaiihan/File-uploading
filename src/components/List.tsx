import React, { useState, useEffect } from 'react';
import { List, Avatar, Image } from 'antd';
import styled from 'styled-components';

// Import Axios
import useAxios from 'axios-hooks';

// Import types
import { FileInfo } from '../types';

// Import Image
import User from '../images/User-1.png';


const Wrapper = styled.div`
  margin: 2rem 0;
`;

const StyledList = styled(List)`
  margin: 1rem;
`;

const StyledImage = styled(Image)`
  width: 200px;
  height: 150px;
  object-fit: cover;
`;

const StyledListItem = styled(List.Item)`
  margin: 1rem 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const AntList: React.FC = () => {
  const [{ data }, refetch] = useAxios<FileInfo[]>('http://localhost:5000/all/images');
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

  useEffect(() => {
    const handler = () => {
      refetch();
    };

    document.addEventListener('file_uploaded', handler);

    return () => {
      document.removeEventListener('file_uploaded', handler);
    };
  }, []);

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
              <StyledImage src={`http://localhost:5000/image/${(item as FileInfo).filename}`} />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={User} />}
              title={(item as FileInfo).filename}
              description={(item as FileInfo).uploadDate.toLocaleString('en-US', {
                timeZone: 'UTC',
              })}
            />
          </StyledListItem>
        )}
      />
    </Wrapper>
  );
};

export default AntList;
