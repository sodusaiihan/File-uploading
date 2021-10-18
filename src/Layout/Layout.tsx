// Import React
import React from 'react';

// Import React router dom
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Import Antd css
import 'antd/dist/antd.css';

// Import Antd components
import { Layout, Menu } from 'antd';

// Import Icons
import {
  CustomerServiceOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  ReadOutlined,
} from '@ant-design/icons';

// Import Styled-Components
import styled from 'styled-components';

// Import components
import DragDrop from '../components/DragDrop';
import Carousel from '../components/Carousel';
import AntCards from '../components/Card';
import AntAvatar from 'src/components/Avatar';
import AntList from 'src/components/List';
import Logo from '../components/Logo';

// Import PAGES
import Pdf from '../Pages/Pdf';
import Video from '../Pages/Video';
import Music from '../Pages/Music';

interface Props{
  color: string
}

const { Header, Content, Sider } = Layout;

const GridLayout: React.FC<Props> = ({ color }) => {
  return (
    <Router>
      <Layout>
        <Sider
          style={{
            textAlign: 'center',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} color={color}>
            <Logo />
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Нүүр</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/video">Бичлэг</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CustomerServiceOutlined />}>
              <Link to="/music">Дуу</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ReadOutlined />}>
              <Link to="/pdf">Баримт бичиг</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <AntHeader>
            <AntAvatar />
          </AntHeader>
          <Content style={{ margin: '10px 10px', overflow: 'initial', height: '85vh' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
              <Carousel />
              <AntCards color={true}/>
              <DragDrop />
              <Switch>
                <Route path="/" exact component={AntList} />
                <Route path="/pdf" component={Pdf} />
                <Route path="/video" component={Video} />
                <Route path="/music" component={Music} />
              </Switch>
              {/* <BackToTop /> */}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const AntHeader = styled(Header)`
  height: 8vh;
  background: rgba(255, 255, 255, 0.6);
`;

export default GridLayout;
