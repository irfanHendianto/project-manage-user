import {Layout, Space, Table, Row,Col, Input,Modal, Button } from 'antd';
import {UserContext} from "../context/UserContext";
import {useContext} from "react";
import {useEffect, useState} from "react";
import {getAllUser,handleAssignUser} from "../controllers/userController";



const Listuser = () =>{
    const {user} = useContext(UserContext)
    const [listUser, setListUser] = useState([]);
    const [assign,setAssign] = useState("");
    const [fetch,setFetch] = useState(true);
    const [username,setUsername] = useState("");
    const columns = [
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
          sorter: (a, b) => a.username.length - b.username.length,
          sortDirections: ['descend','ascend'],
        },
        {
          title: 'Admin',
          dataIndex: 'admin',
          key: 'admin'
        }
      ];
      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
      useEffect(()=>{
        const fetchDataUser = async ()=>{
            const result = await getAllUser(user.token)
            setListUser(result.data.users.map((el,index)=>{
                const {_id,username} = el;
                let admin;
                (el.admin === true)? admin = "Admin" : admin = "Not Admin";
                const key = index + 1;
                return {key,_id,username,admin}
            }))
        
        }
        if(fetch){
            setFetch(false)
            fetchDataUser()

        }
    },[fetch])
    const searchFilter = (datas)=>{
        if(username !== ""){
            return datas.filter(data=>{
                return data.username.toLowerCase().match(username.toLocaleLowerCase())
            })
        }else{
            return datas
        }
    }
    const handleAssign = async ()=>{
        if(assign !== ""){
            try {
                const a = await handleAssignUser(assign,user.token);
                console.log(a)
                setFetch(true);
            } catch (error) {
                warning("Failed Assign")
            }
        }

    }


    const warning = (message) =>{
        Modal.error({
            title: 'Error',
            content: message,
          });
    }
    return (
        <Layout>
        <Space direction="vertical" size={10} style={{backgroundColor:'white',padding:'24px'}}>
            <Row>
                <Col span={5}>
                    <Input placeholder="Search Title" style={{ width: '80%' }} value={username} onChange={(e)=>{setUsername(e.target.value)}}></Input>
                </Col>
                <Col span={12}>
                     <Input placeholder="Assign Admin" style={{ width: '50%' }} value={assign} onChange={(e)=>{setAssign(e.target.value)}}></Input>
                     <Button type="primary" style={{marginLeft:"10px"}} onClick={handleAssign}>
                         Submit
                     </Button>
                </Col>
            </Row>
            <Table dataSource={searchFilter(listUser)} onChange={onChange} columns={columns} size={10} pagination={{ defaultPageSize: 5}} style={{backgroundColor:'white'}}>
            </Table>
        </Space>
        </Layout>
    );
}   

export default Listuser;