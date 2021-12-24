import React from "react";
import {getUserSongList} from "../../../../apis/LoginPage";
import {getSongUrl, isSongValid} from "../../../../apis/songListDetailPage";
import './PlayHistoryPage.css'
import {replayEvent} from "../MainPage";
import {Tooltip} from "antd";

interface Song{
    id:number,
    idx:number,
    name:string,
    singer:string,
    album:string,
    duration:string
}
interface State{
    songs:Song[],
    selectedRow:number,
    rows:any
}
class PlayHistoryPage extends React.Component<any, any>{
    state:State={
        songs:[],
        selectedRow:-1,
        rows:React.createRef()
    }

    componentDidMount() {
        if(window.localStorage.getItem("id")!==null)
        {
            getUserSongList(window.localStorage.getItem("id")).then(res=>{
                console.log("play history",res);
                let song
                let idx=1
                for(let item of res.data.allData)
                {
                    song=item.song
                    this.state.songs.push({
                        id:song.id,
                        idx:idx,
                        name:song.name,
                        singer:song.ar[0].name,
                        album:song.al.name,
                        duration:this.getDuration(song.dt)
                    })
                    idx+=1
                }
                console.log(this.state.songs);
                this.forceUpdate()
            })
        }
    }

    getDuration=(time:number)=>{
        time=Math.floor(time/1000)
        const min=Math.floor(time/60)
        const sec=time-min*60
        return String(min).padStart(2,"0")+":"+String(sec).padStart(2,"0")
    }

    playMusic=(id:number,idx:number)=>{
        isSongValid(id).then(()=>{
            getSongUrl(id).then(res=>{
                //选中行改变样式
                if(this.state.selectedRow!==-1)
                {
                    const last=this.state.rows.current.children[this.state.selectedRow]
                    last.style.backgroundColor=(this.state.selectedRow%2===0)?"rgba(0,0,0,0.05)":"white"
                }
                this.setState(()=>({selectedRow:idx}),()=>{
                    const cur=this.state.rows.current.children[this.state.selectedRow]
                    cur.style.backgroundColor="rgba(0,0,0,0.15)"
                })
                //播放
                replayEvent.emit("play",id,res.data.data[0].url)
            })
        },()=>{alert("暂无播放源")})
    }

    render() {
        return (
            <div style={{width:"100%", height:"80vh", position:"relative",overflowY:"scroll",padding:'20px'}}>
                <div style={{fontSize:"20px", fontWeight:"bolder", width:"100%", display:"flex",marginBottom:"20px"}}>
                    最近播放
                </div>
                <div style={{width:"100%",display:"flex",alignItems:"center"}}>
                    <div style={{width:"3%",textAlign:"start",marginLeft:"5px",color:"dimgray"}}/>
                    <div style={{width:"35%",textAlign:"start",color:"dimgray"}}>音乐标题</div>
                    <div style={{width:"20%",textAlign:"start",color:"dimgray"}}>歌手</div>
                    <div style={{width:"35%",textAlign:"start",color:"dimgray"}}>专辑</div>
                    <div style={{width:"7%",textAlign:"start",color:"dimgray"}}>时长</div>
                </div>
                <div ref={this.state.rows} style={{width:"100%"}}>
                    {
                        this.state.songs.map((item,idx)=>(
                            <div
                                className={idx%2===0?"PlayHistoryPageSongsEvenRow":"PlayHistoryPageSongsOddRow"}
                                onClick={()=>{this.playMusic(item.id,idx)}}
                            >
                                <div style={{width:"3%",color:"dimgray",display:"flex",marginLeft:"5px"}}>
                                    {item.idx}
                                </div>
                                <Tooltip title={item.name}>
                                    <div style={{width:"35%",color:"dimgray",display:"flex"}}  className="emit">
                                        {item.name}
                                    </div>
                                </Tooltip>
                                <Tooltip title={item.singer}>
                                    <div style={{width:"20%",color:"dimgray",display:"flex"}}  className="emit">
                                        {item.singer}
                                    </div>
                                </Tooltip>
                                <Tooltip title={item.album}>
                                    <div style={{width:"35%",color:"dimgray",display:"flex"}}  className="emit">
                                        {item.album}
                                    </div>
                                </Tooltip>
                                <div style={{width:"7%",color:"dimgray",display:"flex"}}>
                                    {item.duration}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default PlayHistoryPage