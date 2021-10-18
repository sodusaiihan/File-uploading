import React from 'react'
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import styled from 'styled-components'

const AntCarousel: React.FC = () => {
  return(
    <Carousel autoplay>
        <div>
          <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1415&q=80" alt=""/>
        </div>
        <div>
          <Image src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />
        </div>
        <div>
          <Image src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80" alt="" />
        </div>
        <div>
          <Image src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" alt="" />
        </div>
    </Carousel>
  )
} 

const Image = styled.img`
  height: 300px;
  width: 100%;
  object-fit: cover;
`


export default AntCarousel