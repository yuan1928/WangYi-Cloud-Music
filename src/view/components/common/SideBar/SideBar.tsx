import React from "react";
import 'antd/dist/antd.css'
import {VerticalAlignBottomOutlined,FieldTimeOutlined,CaretDownOutlined,CaretUpOutlined,
    PlusOutlined,HeartOutlined,FireOutlined} from '@ant-design/icons'
import {Button,Tooltip} from "antd";
import './SideBar.css'
import {getUserSongs} from "../../../../apis/LoginPage";
import {withRouter} from "react-router";

interface IButton{
    title:string,
    class:string,
    href: string
    id:number
}
interface State{
    buttonGroup:IButton[]
    refs:any
    clicked:number
    isLogin:boolean
    isShowSongsList:boolean
    personalSongList:string[]
}
class SideBar extends React.Component<any, any>{
    private click: (cur:number) => void;
    constructor(props:any) {
        super(props);
        this.click = (cur) => {
            let clicked = this.state.refs.current.children[this.state.clicked]
            clicked.className = (this.state.clicked>=7)?"ableSpecial":"able"
            let newClicked = this.state.refs.current.children[cur]
            newClicked.className = (cur>=7)?"clickedSpecial":"clicked"
            this.setState({clicked:cur})
        }
    }

    state:State={
        buttonGroup:[
            {title:"播客",class:"able",href:"",id:2},
            {title:"视频",class:"able",href:"",id:3},
            {title:"朋友",class:"able",href:"",id:4},
            {title:"直播",class:"able",href:"",id:5},
            {title:"私人FM",class:"able",href:"",id:6},
        ],
        refs:React.createRef(),
        clicked:1,
        isLogin:false,
        isShowSongsList:true,
        personalSongList:[]
    }

    componentDidMount() {
        this.state.refs.current.focus()
        if(window.localStorage.getItem("id")!==null)
        {
            this.setState({isLogin:true})
            getUserSongs(window.localStorage.getItem("id"),window.localStorage.getItem("cookie")).then(res=>{
                const data=res.data.playlist
                for(let i=1; i<data.length; i++)
                {this.state.personalSongList.push(data[i].name)}
                this.forceUpdate()
            })
        }
    }

    render() {
        return (
            <div id='sideRoot' ref={this.state.refs}>
                <div
                    onClick={()=>{}}
                    style={{color:"white",fontSize:"1px"}}
                >
                    发现音乐
                </div>
                <div
                    className="clicked"
                    onClick={()=>{
                        this.click(1)
                        if(this.props.history.pathname!=="/user/user")
                        {this.props.history.push("/user")}
                    }}
                >
                    发现音乐
                </div>
                {
                    this.state.buttonGroup.map((item)=>(
                        <div className={item.class} key={item.id} onClick={()=>{this.click(item.id)}}>
                            {item.title}
                        </div>
                    ))
                }
                {
                    this.state.isLogin?
                    <div className="able" onClick={()=>{this.click(7)}}>我的音乐</div>:
                    <div className="disabled">我的音乐</div>
                }

                <div className="ableSpecial" onClick={()=>{this.click(8)}}>
                    <VerticalAlignBottomOutlined className="sideIcon"/>
                    <div>本地与下载</div>
                </div>
                <div
                    className="ableSpecial"
                    onClick={()=>{
                        this.click(9)
                        this.props.history.push("/play-history")
                    }}
                >
                    <FieldTimeOutlined className="sideIcon"/>
                    <div>最近播放</div>
                </div>
                <div className={this.state.isLogin?"ableSpecial":"disabled"}  id="songsList"
                     onClick={()=>{this.setState({isShowSongsList:!this.state.isShowSongsList})}}>
                    <div>创建的歌单</div>
                    {
                        this.state.isShowSongsList?
                            <CaretUpOutlined />:<CaretDownOutlined />
                    }
                    <PlusOutlined id="songsListIcon" onClick={(e)=>{e.stopPropagation()}}/>
                </div>
                {
                    this.state.isShowSongsList?
                        (
                            <div className="ableSpecial" onClick={()=>{this.click(11)}} id="sideLike">
                                <HeartOutlined className="sideIcon"/>
                                <div>我喜欢的音乐</div>
                                <Tooltip title="开启心动模式">
                                    <Button size="small" icon={<FireOutlined/>} id="sideLikeIcon" shape="circle"/>
                                </Tooltip>
                            </div>
                        )
                        :
                        null
                }
                {
                    this.state.personalSongList.map(item=>{
                        if(this.state.isShowSongsList)
                        {return (
                            <Tooltip title={item}>
                                <div
                                    style={{textAlign:"start",whiteSpace:"nowrap", overflow:"hidden",textOverflow:"ellipsis",cursor:"pointer"}}
                                    className="ableSpecial"
                                >
                                    <HeartOutlined className="sideIcon"/>
                                    {item}
                                </div>
                            </Tooltip>
                        )}
                        else {return null}
                    })
                }

            </div>
        )
    }
}

export default withRouter(SideBar)