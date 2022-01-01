import request from "./request";

export function getAccountInfo(id:number){
    return request({
        url:"/user/detail?uid="+id,
        method:"get",
    })
}

export function getAccountSongList(id:number){
    return request({
        url:"/user/playlist?uid="+id,
        method:"get",
    })
}

export function getAreaCode(){
    return request({
        url:"/countries/code/list",
        method:"get"
    })
}