import React, { useState, useEffect } from 'react';
import { List, Avatar } from 'antd';
import styled from 'styled-components';

// Import Axios
import useAxios from 'axios-hooks';

 // Import types
import { FileInfo } from '../types';

// Import Image
import  User  from '../images/User-1.png'

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const StyledList = styled(List)`
  margin: 1rem;
`;

// const StyledImage = styled(Image)`
//   width: 200px;
//   height: 150px;
//   object-fit: cover;
// `;

const StyledListItem = styled(List.Item)`
  margin: 1rem 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// props: { isHighlighted: boolean }

const Music: React.FC = () => {
  const [{ data }] = useAxios<FileInfo[]>('http://localhost:5000/all/music');
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
              <audio controls>
                <source src={`http://localhost:5000/music/${(item as FileInfo).filename}`}  type="audio/mpeg"/>
              </audio>
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

export default Music;