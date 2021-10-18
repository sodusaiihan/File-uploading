// Import React
import React from 'react';

// Import Ant style
import 'antd/dist/antd.css';

// Import Card
import { Card } from 'antd';

// Import Styled-Components
import styled from 'styled-components';

// Import Data
import { CardData } from 'src/data/Card';

const { Meta } = Card;

interface Props {
  color: boolean
}

const AntCards: React.FC<Props> = ({ color }) => {
  return ( 
    <Wrapper>
      {CardData.map((data) => (
        <AntCard hoverable cover={<img src={data.img} alt="зураг"/>}>
          <Meta title={data.title} description={data.description}/>
          <p>{color}</p>
        </AntCard>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1rem;
  width: 100%;
  display: flex;
 
`;

const AntCard = styled(Card)`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover{
    border: 1px solid red;
  }
`;

export default AntCards;
