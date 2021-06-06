import { Form, Input, Button,Typography, Divider, Modal  } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {register} from "../controllers/authControllers";
import {useState, useContext} from "react";
import {useHistory } from "react-router-dom";
import {UserContext} from "../context/UserContext";

const { Title} = Typography;

const validateMessages = {
    required: '${name} is required!',
    types: {
        email: '${name} is not a valid email!',
    },
};

const Register = ()=>{
    let {setLocationMenu} = useContext(UserContext);
    const [input,] = useState({
        username:'',
        password:""
    })
    let history = useHistory();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const result = await register(values);
            console.log(result.data.message);
            success(result.data.message)
        } catch (error) {
            warning("username exists")
        }
    };

    const success =(message)=> {
        Modal.success({
          content: message,
          onOk() {
            setLocationMenu("login")
            history.push(`/Login`);
            form.resetFields();
          },
        });
    }

    const warning = (message) =>{
        Modal.error({
            title: 'Error',
            content: message,
          });
    }
    return (
        <div style={{margin:'auto',textAlign:'center',width:'50%'}}>  
            <Title>Register</Title>
            <Divider></Divider>
            <Form
            form={form}
            name="normal_login"
            className="login-form"
            validateMessages={validateMessages}
            initialValues={input}
            onFinish={onFinish}
            >
                <Form.Item
                    name='username'
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} style={{width:"50%"}} placeholder="Username *"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password *"
                    style={{width:'50%'}}
                    />
                </Form.Item>
                <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                        </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;