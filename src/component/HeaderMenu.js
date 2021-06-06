import { Menu } from 'antd';
import {useContext} from "react";
import { Link,useHistory } from "react-router-dom";
import {UserContext} from "../context/UserContext";

const HeaderMenu = ()=>{
    let {user,locationMenu} = useContext(UserContext);
    let history = useHistory();
    return (
        <Menu  mode="horizontal" style={{textAlign:'right'}} selectedKeys={[locationMenu]}>
        {
            user ===null &&
        <>
        <Menu.Item key="login">
            <Link to="/login">
                Login
            </Link>
        </Menu.Item>
        <Menu.Item key="register">
            <Link to="/register">
              Register
            </Link>
        </Menu.Item>
        </>
        }
        {
            user !==null &&
        
        <Menu.Item key="logout">
             <Link to="/Logout" onClick={()=>{
                localStorage.clear("user")
                history.push(`/`)
                window.location.reload()
             }}>Logout</Link>
        </Menu.Item>
        }
    </Menu>
    );
}
export default HeaderMenu;