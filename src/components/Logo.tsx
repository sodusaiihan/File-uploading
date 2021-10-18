import React from 'react'
import 'antd/dist/antd.css';
import { Image } from 'antd'
import styled from 'styled-components'

// Import images
import PROJECT from '../images/PROJECT-A.png'

const Logo: React.FC = () => {
  return(
    <div>
      <AntImage
        width={100}
        src={PROJECT}
      />
    </div>
  )
}

const AntImage = styled(Image)`
  margin: 3rem;
`

export default Logo