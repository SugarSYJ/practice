var basePath = 'http://192.168.185.250:10275'
var error_page = "http://117.136.240.59:8080/miyoufm/error/error.html" ;
var error_page_timeout = "http://117.136.240.59:8080/miyoufm/error/error_timeout.html";

var Api = {
  getUserType: basePath + '/invitPrize/relation/userType',   // 端外页判断是不是新用户的接口
  getCode: basePath + '/invitPrize/relation/code',   // 端外页获取短信验证码的接口	
  validateCode: basePath + '/invitPrize/relation/bang/',   // 端外页获取短信验证码的接口	
}

/**
 * validatePhone 验证手机号码
 */
function validatePhone(phone){
	if(!(/^1[34578]\d{9}$/.test(phone))){ 
		return false; 
	}else{
		return true;
	} 
}

/**
 * getUrlParam   获取url传参
 */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
  var r = window.location.search.substr(1).match(reg);  
  if (r != null) return r[2];
  return null; 
}

$.ajaxSetup({
  dataType: "json",
  cache: false,
  timeout : 1000*10, 
  xhrFields: {
    withCredentials: true
  },
　complete : function(XMLHttpRequest,status){ 
　　if(status=='timeout'){
　　　window.location.href = error_page_timeout
　　}
　}
});
