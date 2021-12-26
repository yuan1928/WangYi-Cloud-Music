import React from "react";
import {withRouter} from "react-router";
import {getLyrics} from "../../../../../apis/searchPage";
import './Lyrics.css'
import {HeartOutlined, DownloadOutlined} from "@ant-design/icons";
import {Pagination, Progress} from "antd";

interface Lyric{
    idx:number,
    songId:number,
    songName:string,
    keyLyric:string[],
    allLyric:string[],
    singer:string,
    album:string,
    duration:string,
    hot:number,
    showAll:boolean
}
interface State{
    keyword:string,
    page:number,
    resNum:number,
    lyrics:Lyric[],
    maxHot:number,
    showAll:boolean[]
}
class Lyrics extends React.Component<any, any>{
    state:State={
        keyword:this.props.match.params.keyword,
        page:1,
        resNum:0,
        lyrics:[],
        maxHot:0,
        showAll:[]
    }

    getInfo=()=>{
        this.setState(()=>({lyrics:[],showAll:[]}),()=>{
            getLyrics(this.state.keyword,(this.state.page-1)*40).then(res=>{
                console.log(res);
                this.setState({resNum:res.data.result.songCount})
                let idx=(this.state.page-1)*40+1
                if(res.data.result.songs)
                {
                    for(let song of res.data.result.songs)
                    {
                        this.state.lyrics.push({
                            idx:idx,
                            songId:song.id,
                            songName:song.name,
                            keyLyric:this.getKeyLyric(song.lyrics.range[0].first,song.lyrics.range[0].second,song.lyrics.txt),
                            allLyric:song.lyrics.txt.split("\n"),
                            singer:song.artists[0].name,
                            album:song.album.name,
                            duration:this.getDuration(song.duration),
                            hot:song.mark,
                            showAll:false
                        })
                        if(song.mark>this.state.maxHot)
                        {this.setState({maxHot:song.mark})}
                        idx+=1
                    }
                    this.forceUpdate()
                }
            })
        })
    }

    getKeyLyric(start:number,end:number,txt:string){
        const head=(start-3>=0)?"..."+txt.slice(start-3,start):txt.slice(0,start)
        const tail=(end+2<=txt.length-1)?txt.slice(end,end+3)+"...":txt.slice(end)
        return [head,txt.slice(start,end),tail]
    }

    getDuration(time:number){
        time=Math.floor(time/1000)
        const min=Math.floor(time/60)
        const sec=time-min*60
        return String(min).padStart(2,"0")+":"+String(sec).padStart(2,"0")
    }

    componentDidMount() {
        this.getInfo()
    }

    showAllOrKeyLyric(idx:number){
        const row=this.state.lyrics[idx]
        row.showAll=!row.showAll
        this.forceUpdate()
    }

    copyLyric(idx:number){
        navigator.clipboard.writeText(this.state.lyrics[idx].allLyric.join().replace(/,/g,"\n"))
            .then(()=>{alert("复制成功！")})
    }

    switchPage=(page:number)=>{
        if(page<3) {this.setState(()=>({page:page}),()=>{this.getInfo()})}
        else {alert("无查看权限")}
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                <span style={{display:"flex",fontSize:'25px',fontWeight:"bolder",padding:"5px"}}>
                    找到{this.state.resNum}首歌词
                </span>
                <div className="searchPageLyricsRowOdd">
                    <div style={{width:'10%'}}/>
                    <div style={{width: "30%",textAlign:"start"}}>音乐标题</div>
                    <div style={{width: "10%",textAlign:"start"}}>歌手</div>
                    <div style={{width: "10%",textAlign:"start"}}>专辑</div>
                    <div style={{width: "10%"}}>时长</div>
                    <div style={{width: "5%"}}>热度</div>
                </div>
                {
                    this.state.lyrics.map((item,idx)=>(
                        <div className={idx%2===0?"searchPageLyricsRowEven":"searchPageLyricsRowOdd"} key={item.songId}>
                            <div style={{width:"10%",display:"flex",justifyContent:"space-evenly", color:"rgba(0,0,0,0.4)"}}>
                                {item.idx}
                                <div><HeartOutlined/></div>
                                <div><DownloadOutlined/></div>
                            </div>
                            <div style={{width:"30%"}}>
                                <div style={{textAlign:"start"}}>{item.songName}</div>
                                <div style={{display:"flex",alignItems:"center"}}>
                                    <div style={{color:"rgba(0,0,0,0.4)"}}>{item.keyLyric[0]}</div>
                                    <div style={{color:"cornflowerblue"}}>{item.keyLyric[1]}</div>
                                    <div style={{color:"rgba(0,0,0,0.4)"}}>{item.keyLyric[2]}</div>
                                </div>
                                {
                                    item.showAll?
                                        item.allLyric.map(str=>(<div style={{textAlign:"start"}}>{str}</div>))
                                        :null
                                }
                                <div style={{display:"none"}} className="copyLyric">{item.allLyric}</div>
                            </div>
                            <div style={{width:'10%',textAlign:"start",color:"rgba(0,0,0,0.4)"}}>{item.singer}</div>
                            <div style={{width:'10%',textAlign:"start",color:"rgba(0,0,0,0.4)"}}>{item.album}</div>
                            <div style={{width:'10%'}}>
                                <div style={{color:"rgba(0,0,0,0.4)"}}>{item.duration}</div>
                                <div className="searchPageLyricsButton" onClick={()=>{this.showAllOrKeyLyric(idx)}}>
                                    {item.showAll?'收起歌词':'展开歌词'}
                                </div>
                                <div className="searchPageLyricsButton" onClick={()=>{this.copyLyric(idx)}}>复制歌词</div>
                            </div>
                            <div style={{width:"5%"}}>
                                <Progress
                                    percent={Math.ceil(100*item.hot/this.state.maxHot)}
                                    showInfo={false}
                                    strokeColor="rgb(201,38,32)"
                                    trailColor="rgba(0,0,0,0.2)"
                                />
                            </div>
                        </div>
                    ))
                }
                <div style={{width:"100%",display:"flex",justifyContent:"center",margin:"20px 0 20px 0"}}>
                    <Pagination total={this.state.resNum} pageSize={40} onChange={this.switchPage}/>
                </div>
            </div>
        )
    }
}

export default withRouter(Lyrics)