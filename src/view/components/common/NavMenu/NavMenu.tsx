import React from "react";
import 'antd/dist/antd.css'
import './NavMenu.css'
import {Menu} from "antd";

interface MenuItem{
    key:string,
    title:string,
    click:Function
}
interface State{
    current:string,
    menu:any
}
class NavMenu extends React.Component<any, any>{
    state:State={
        current:(this.props.current===undefined)?this.props.menu[0].key:this.props.current,
        menu:React.createRef()
    }

    componentDidMount() {
    }

    render() {
        const { current } = this.state;
        return (
            <div id="navMenuRoot">
                <Menu
                    onClick={(e)=>{this.setState({current:e.key})}}
                    selectedKeys={[current]}
                    mode="horizontal"
                    ref={this.state.menu}
                >
                    {
                        this.props.menu.map((item:MenuItem)=>(
                            <Menu.Item key={item.key}>
                                <div onClick={()=>{item.click()}}>{item.title}</div>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </div>
        )
    }
}

export {NavMenu};
export type { MenuItem };

