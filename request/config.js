let config_url = ""
if(process.env.NODE_ENV === 'development'){
    // 开发环境
    config_url = 'https://dj.gxsentu.net/'
}else{
    // 生产环境
    config_url = 'https://dj.gxsentu.net/'
}
export default config_url