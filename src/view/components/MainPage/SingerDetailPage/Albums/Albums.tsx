import React from "react";
import Header from "../Header/Header";
import AlbumFrame from "./AlbumFrame/AlbumFrame";
import {withRouter} from "react-router";
import {getAlbums,getAlbum} from "../../../../../apis/singerDetailPage";
import {Pagination} from "antd";

interface Song{
    id:number,
    title:string,
    duration:string
}
interface Album{
    id:number,
    name:string,
    cover:string,
    songs:Song[]
}
interface State{
    id:number,
    curPage:number,
    total:number,
    albumsId:number[],
    albums:Album[]
}

class Albums extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        curPage:1,
        total:0,
        albumsId:[],
        albums:[]
    }

    componentDidMount() {
        this.getCurList()
    }

    getCurList=()=>{
        getAlbums(this.state.id,(this.state.curPage-1)*10).then(res=>{
                for(let album of res.data.hotAlbums)
                {this.state.albumsId.push(album.id)}
                this.setState({total:res.data.artist.albumSize})
            }
        ).then(()=>{
            for(let id of this.state.albumsId)
            {
                getAlbum(id).then(res=>{
                    const songs:Song[]=[]
                    for(let song of res.data.songs)
                    {
                        songs.push({
                            id:song.id,
                            title:song.name,
                            duration:this.getDuration(song.dt)
                        })
                    }
                    const data=res.data.album
                    this.state.albums.push({
                        id:data.id,
                        name:data.name,
                        cover:data.picUrl,
                        songs:songs
                    })
                    console.log("update");this.forceUpdate()
                })
            }
        }).then(()=>{})
    }

    getDuration=(time:number)=>{
        time=Math.floor(time/1000)
        const m=Math.floor(time/60)
        const s=time-m*60
        return String(m).padStart(2,"0")+":"+String(s).padStart(2,"0")
    }

    render() {
        console.log(this.state.albums.length);
        return (
            <div style={{width:"100%"}}>
                <Header current="1"/>
                {this.state.albums.map(item=>(<AlbumFrame album={item}/>))}
                <div style={{width:"100%"}}>
                    <Pagination
                        defaultCurrent={1}
                        total={this.state.total}
                        onChange={(page)=>{
                            this.setState(()=>({curPage:page,albums:[],albumsId:[]}),()=>{this.getCurList()})
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Albums)