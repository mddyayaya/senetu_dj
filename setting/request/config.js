

let base_url = ""
if(process.env.NODE_ENV === 'development'){
    // 开发环境
    base_url = 'https://zyfxapp.5cy.com/'
}else{
    // 生产环境
    base_url = 'https://zyfxapp.5cy.com/'
}
export default base_url