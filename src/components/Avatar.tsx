import React from 'react'
import 'antd/dist/antd.css';
import { Avatar, Image } from 'antd';
import styled from 'styled-components'
// import Search from '../components/Search'


// Import images

const AntAvatar: React.FC = () => {
  return (
    <Wrapper>
      {/* <Search/> */}
      <StyledAvatar
      src={<StyledImage src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1631&q=80'/>}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`

const StyledAvatar = styled(Avatar)`
  width: 50px;
  height: 50px;
  position: absolute;
  margin: 1rem 2.5rem;
  right: 0;
`

const StyledImage = styled(Image)`
  width: 50px;
  height: 50px;
  object-fit: cover;
`

export default AntAvatar