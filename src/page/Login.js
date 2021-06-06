import { Form, Input, Button, Typography, Divider ,Space, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useState, useContext} from "react"
import {useHistory, Link } from "react-router-dom";
import {UserContext} from "../context/UserContext";
import {login,check} from "../controllers/authControllers";
const {Title} = Typography;

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
    },
};
const Login = () =>{
    let {setUser} = useContext(UserContext)
    const [input,] = useState({
        password:"",
        username:""
    })
    let history = useHistory();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const result = await login(values);
            const token = result.data.token
            const resultCheck = await check(token);
            setUser(resultCheck)
            localStorage.setItem("user", JSON.stringify(resultCheck))
            history.push(`/`);
            form.resetFields();

        } catch (error) {
            warning("login failed")
        }
        
    };
    const warning = (message) =>{
        Modal.error({
            title: 'Error',
            content: message,
          });
    }
    return (
            <div style={{margin:'auto',textAlign:'center',width:'50%'}}>  
                <Title>Login</Title>
                <Divider style={{width:'50%'}}></Divider>
                <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={input}
                onFinish={onFinish}
                >
                        <Form.Item
                        name='username'
                        rules={[
                        {
                            required: true
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" style={{width:'50%'}} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        style={{width:'50%'}}
                        />
                    </Form.Item>
    
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in 
                            </Button>
                            Or 
                            <Link to="/Register">  register now!</Link> 
                        </Space>
                    </Form.Item>
                </Form>
            </div>
    );
}

export default Login;