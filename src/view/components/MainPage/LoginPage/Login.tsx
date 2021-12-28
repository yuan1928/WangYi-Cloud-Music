import React from "react";
import {Button, Input, Tooltip,Checkbox} from "antd";
import {UserOutlined,EyeTwoTone,EyeInvisibleOutlined,CloseOutlined} from '@ant-design/icons';
import {getValid,loginByValid,loginByPassword} from "../../../../apis/LoginPage";
import {loginEvent} from "../MainPage";
import {isLogin} from "../MainPage";
import {withRouter} from "react-router-dom";
import './Login.css'
import BG from "../../../../assets/BG.svg"
import icon from "../../../../assets/login.svg"
import icon1 from "../../../../assets/title.svg"

//const BG=require("../../../../assets/BG.jpg")
interface State{
    phone:string,
    valid:string,
    password:string,
    byValid:boolean,
    isAgree:boolean,
    sendValid:boolean,
    resetPhoneRef:any,
    resetValidRef:any,
    resetPassRef:any
}
class Login extends React.Component<any, any>{
    state:State={
        phone:"",
        valid:"",
        password:"",
        byValid:false,
        isAgree:false,
        sendValid:false,
        resetPhoneRef:React.createRef(),
        resetValidRef:React.createRef(),
        resetPassRef:React.createRef()
    }

    getValidCode=()=>{
        getValid(this.state.phone).then(res=>{
            if(res.data.code===200)
            {
                this.setState(()=>({sendValid:true}),
                            ()=>{setTimeout(()=>{this.setState({sendValid:false})},60*1000)})
                alert("验证码已发送，1分钟后可重新获取")
            }
            else {alert("验证码发送失败，请重试")}
        })
    }

    storeAccount=(res:any)=>{
        window.localStorage.setItem("id",res.data.account.id)
        window.localStorage.setItem("token",res.data.token)
        window.localStorage.setItem("cookie",encodeURIComponent(res.data.cookie))
    }

    submit=()=>{
        if(isLogin){alert("当前账号已登录，请确认输入的账号是否正确")}
        /*logout().then(res=>{
            if(res.data.code===200)
            {
                console.log("log out");
                window.localStorage.removeItem("id")
                window.localStorage.removeItem("cookie")
                window.localStorage.removeItem("token")
            }
        })*/
        if(this.state.phone.length<11){alert("请正确填写手机号码")}
        if(!this.state.isAgree){alert("请同意相关服务条款")}
        if(this.state.byValid)
        {
            if(this.state.valid.length===0){alert("请填写验证码")}
            if(this.state.phone.length===11 && this.state.valid.length>0 && this.state.isAgree)
            {
                loginByValid(this.state.phone,this.state.valid).then(res=>{
                    if(res.data.code===200)
                    {
                        console.log(res);
                        loginEvent.emit("login")
                        this.props.history.push("/user")
                    }
                    else {alert("登录失败，请重试")}
                },()=>{alert("登录失败，请重试")})
            }
        }
        else
        {
            if(this.state.password.length===0){alert("请填写密码")}
            if(this.state.phone.length===11 && this.state.password.length>0 && this.state.isAgree)
            {
                loginByPassword(this.state.phone,this.state.password).then(res=>{
                    console.log(res);
                    if(res.data.code===200)
                    {
                        this.storeAccount(res)
                        loginEvent.emit("login")
                        this.props.history.push("/user")
                    }
                    else {alert("登录失败，请重试")}
                },()=>{alert("登录失败，请重试")})
            }
        }
    }

    render() {
        return (
            <div style={{width:'100%',display:"flex",justifyContent:"center",alignItems:"center"}}>
                <img src={BG} width="100%" height="100%" style={{zIndex:'-100',position:'absolute',left:0,top:0}} alt=""/>
                <div style={{width:'30%',padding:"50px",backgroundColor:"rgba(0,0,0,0.1)",borderRadius:"20px"}}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div style={{width:"60%",display:"flex",alignItems:"center"}}>
                            <img src={icon} style={{width:"50%",objectFit:"cover"}} alt=""/>
                            <img src={icon1} style={{width:"50%",objectFit:"cover"}} alt=""/>
                        </div>
                        <div id="loginBack" onClick={()=>{this.props.history.push("/user")}}>
                            <Tooltip title="回到主页">
                                <CloseOutlined/>
                            </Tooltip>
                        </div>
                    </div>
                    <div style={{margin:"10px 0 10px 0",display:"flex",alignItems:"center"}}>
                        <Input
                            placeholder="请输入手机号码"
                            prefix={<UserOutlined />}
                            onChange={(event)=>{this.setState({phone:event.target.value})}}
                            value={this.state.phone}
                        />
                        <div ref={this.state.resetPhoneRef}>
                            <Tooltip title="重置手机号码">
                                <Button
                                    icon={<CloseOutlined />}
                                    onClick={()=>{this.setState({phone:""})}}
                                    disabled={this.state.phone.length===0}
                                />
                            </Tooltip>
                        </div>
                    </div>
                    <div>
                        {
                            this.state.byValid?
                                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                    <div style={{display:"flex",alignItems:"center",width:"60%"}}>
                                        <Input.Password
                                            placeholder="请输入验证码"
                                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                            onChange={(e)=>{this.setState({valid:e.target.value})}}
                                            value={this.state.valid}
                                        />
                                        <div ref={this.state.resetValidRef}>
                                            <Tooltip title="重置验证码">
                                                <Button
                                                    icon={<CloseOutlined />}
                                                    onClick={()=>{this.setState({valid:""})}}
                                                    disabled={this.state.valid.length===0}
                                                />
                                            </Tooltip>
                                        </div>
                                    </div>
                                    {
                                        !this.state.sendValid?
                                            <Button onClick={this.getValidCode}>获取验证码</Button>:
                                            <Button disabled={true}>验证码已发送</Button>
                                    }
                                </div>
                                :
                                <div style={{display:"flex",alignItems:"center"}}>
                                    <Input.Password
                                        placeholder="请输入密码"
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        onChange={(e)=>{this.setState({password:e.target.value})}}
                                        value={this.state.password}
                                    />
                                    <div ref={this.state.resetPassRef}>
                                        <Tooltip title="重置密码">
                                            <Button
                                                icon={<CloseOutlined />}
                                                onClick={()=>{this.setState({password:""})}}
                                                disabled={this.state.password.length===0}
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                        }
                    </div>
                    <div style={{margin:"10px 0 10px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        {
                            this.state.byValid?
                                <div
                                    onClick={()=>{this.setState({byValid:false})}}
                                    style={{textAlign:"start",fontSize:"small",color:" rgba(0,0,0,0.6)",cursor:"pointer"}}
                                >
                                    密码登录
                                </div>:
                                <div
                                    onClick={()=>{this.setState({byValid:true})}}
                                    style={{textAlign:"start",fontSize:"small",color:" rgba(0,0,0,0.6)",cursor:"pointer"}}
                                >
                                    验证码登录
                                </div>
                        }
                        <Checkbox onChange={()=>{this.setState({isAgree:!this.state.isAgree})}}>
                            <div style={{fontSize:"small",color:" rgba(0,0,0,0.6)"}}>同意相关服务条款</div>
                        </Checkbox>
                    </div>
                    <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",
                                 fontSize:"8px",marginBottom:"10px",color:"rgba(0,0,0,0.4)"}}>
                        <div style={{color:"rgba(234,38,32)",fontWeight:"bolder"}}>请注意：</div>
                        由于接口限制，密码登录才能获取详细的账号信息
                    </div>
                    <div
                        onClick={this.submit}
                        id="login"
                    >
                        提              交
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)