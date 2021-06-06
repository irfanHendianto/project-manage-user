import React,{useState, useContext} from 'react';
import Listuser from './page/Listuser' ;
import Login from './page/Login';
import Register from './page/Register';
import HeaderMenu from './component/HeaderMenu';
import { Typography,Layout, Menu , Button, Row,Col} from 'antd';
import {UserContext} from "./context/UserContext";
import {ProtectedRouter, ProtectedRouterLogin,ProtectedRouterLogout} from "./ProtectedRouter";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined 
} from '@ant-design/icons';
const { Title } = Typography;
const { Header, Sider, Content,Footer } = Layout;

const Main = () =>{
    let {user} = useContext(UserContext)
    const [collapsed, setCollapsed] = useState(false);
    

    const toggle = () => {
    setCollapsed(!collapsed);
    };

    return(
    <Router>
    {
    <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}
            style={{
                overflow: 'auto',
                left: 0,
            }}
        >
          <Menu theme="dark" mode="inline"  style={{height:'100%'}} >
          <div className="logo" style={{
              height: '32px',
              margin: '16px',
              background: 'rgba(255, 255, 255, 0.3)'
          }}/>
            <Menu.Item key="home" icon={<HomeOutlined  />}>
                <Link to="/">
                    Home
                </Link>
            </Menu.Item>
              {user !== null &&
              <>
               {user.admin === true && 
                    <Menu.Item key="listuser" icon={<UserOutlined />}>
                        <Link to="/listuser">
                            List User
                        </Link>
                    </Menu.Item>
               }
               </>
            }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
                <Row style={{width:'100%'}}>
                    <Col span={12}>
                        <Button
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={toggle}
                            style={{border:'0px solid', textDecoration:'none'}}
                        >

                        </Button>
                    </Col>
                    <Col span={12} style={{paddingRight:'2%'}} >
                        <HeaderMenu/>
                    </Col>
                </Row>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Switch>
                <Route exact path="/"> 

                    <Title>Welcome  
                        {
                            user !==null &&
                        
                            <Title>  {user.username}</Title>
                        }
                    </Title>
                </Route>
                <ProtectedRouterLogin exact path="/Login"component={Login} user={user} />
                <ProtectedRouterLogin exact path="/Register"component={Register} user={user} />
                <ProtectedRouter exact path="/listuser" component={Listuser} user={user}/>
                <ProtectedRouterLogout exact path= "/Logout" user={user}/>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Project A ©2021 Created Irfan hendianto wijaya</Footer>
        </Layout>
    </Layout>
    }
    </Router>
    );

}

export default Main;