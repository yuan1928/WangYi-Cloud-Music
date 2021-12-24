import request from "./request";

export function getValid(phone:string){
    return request({
        url:"/captcha/sent?phone="+phone,
        method:"get",
    })
}

export function loginByValid(phone:string,valid:string){
    return request({
        url:"/captcha/verify?phone="+phone+"&captcha="+valid,
        method:"get",
    })
}

export function loginByPassword(phone:string,password:string){
    return request({
        url:"/login/cellphone?phone="+phone+"&password="+password,
        method:"get"
    })
}

export function logout(){
    return request({
        url:"/logout",
        method:"get",
    })
}

export function isLogin(){
    return request({
        url:"/login/status",
        method:"get",
    })
}

export function getAccountInfo(){
    return request({
        url:"/user/account",
        method:"get",
    })
}

export function getUserInfo(uid:string|null){
    return request({
        url:'/user/detail?uid='+uid,
        method:"get"
    })
}

export function getUserSongs(uid:string|null,cookie:string|null){
    return request({
        url:"/user/playlist?uid="+uid+"&cookie"+cookie,
        method:'get'
    })
}

export function getUserSongList(uid:string|null){
    return request({
        url:"/user/record?uid="+uid+"&type=0",
        method:'get'
    })
}
