import React from "react";
import Header from "../Header/Header";
import {withRouter} from "react-router";
import {getSingerDescription} from "../../../../../apis/singerDetailPage";

interface Paragraph{
    title:string,
    txt:string[]
}
interface State{
    id:number,
    description:Paragraph[]
}
class Description extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        description:[]
    }

    componentDidMount() {
        getSingerDescription(this.state.id).then(res=>{
            this.state.description.push({
                title:"个人简介",
                txt:res.data.briefDesc.split("\n")
            })
            for(let item of res.data.introduction)
            {
                this.state.description.push({
                    title:item.ti,
                    txt:item.txt.split("\n")
                })
            }
            this.forceUpdate()
        })
    }

    render() {
        return (
            <div>
                <Header current="3"/>
                {
                    this.state.description.map(item=>(
                        <div style={{margin:'10px'}}>
                            <div style={{fontSize:"15px",fontWeight:'bolder',textAlign:"start",marginBottom:"10px"}}>{item.title}</div>
                            {item.txt.map(txt=>(
                                <p style={{textIndent:'2em',textAlign:"justify"}}>
                                    {txt}
                                </p>))}
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default withRouter(Description)