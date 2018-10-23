$(function(){
// **********
  // ** params
  var pushStatus = false  // 防止重复点击

  function showTip(msg){
    $(".msg_box").css('display','block')
    $(".tip").text(msg)
    console.log(msg)
    setTimeout(function(){
      $(".msg_box").css('display','none')
      $(".tip").text('')
    },2000)
  }

  // ----------------------------首次进入-------------------------------- 

  var invitCode = getUrlParam('invitCode') || ''
  // alert(invitCode)
  var inviteeMobile = ''

  // 解决IOS点击无效
  document.addEventListener('touchstart', function () {});

  $(".first").css('display','block')

  // 点击提交领取300分钟
  $(".submit").on('click',function(){
    inviteeMobile = $(".number_input").val()
    if(!navigator.onLine){
      showTip('无网络链接，请检查网络设置')
    }else if(!inviteeMobile){
      showTip('手机号码不能为空')
    }else if(inviteeMobile.length < 11){
      showTip('号码格式错误')
    }else{
      !pushStatus && submitPhone()
    }

  })

  function submitPhone(){
    pushStatus = true
    var postData = {
      'invitCode': invitCode,
      'inviteeMobile': inviteeMobile
    }
    $.ajax({
      type: "post",
      url: Api.getUserType,
      data: JSON.stringify(postData),
      dataType: 'json',
      contentType: "application/json",
      success: function (res) {
        pushStatus = false
        res.code = 1
        // 0/新用户  1/已经绑定关系的新用户 2/老用户
        if(status=='timeout'){
          showTip('超时')
        }else if(res.code == 0){
          $(".first").css('display','none')
          $(".new").css('display','block')
        }else if(res.code == 1){
          $(".first").css('display','none')
          $(".new_second_box").css('display','block')
        }else if(res.code == 2){
          var old_inviteCode = res.invitCode
          $(".first").css('display','none')
          $(".old").css('display','block')

          if(isWeixin()){
            window.location.href = 'http://192.168.3.103/inviteReward/index.html?invitCode=' + old_inviteCode
          }
          history.pushState('','老用户邀请',"?invitCode=" + old_inviteCode)          
        }else{
          $(".first").css('display','none')
          $(".new").css('display','block')
        }
      },
      error: function (res) {
        pushStatus = false
        window.location.href = error_page
      }
    })
  }

  // ----------------------------老用户-------------------------------- 
  $(".invite_new").on('click',function(){
    $(".mask").fadeIn()
    $(".popup").css('display','block')
  })
 
  // -------------------------未注册新用户-----------------------------

  // 倒计时
  function countTime(){
    var num = 5
    var timer = setInterval(function(){
      num --;
      if(num < 0){
        codeStatus = false
        $(".get_code_btn").html("获取验证码")
        $(".get_code_btn").removeClass("get_code_btn_press")
        clearInterval(timer);
      }else{
        $(".get_code_btn").html(num+'s')
      }
    },1000);
  }

  var codeStatus = false
  // 获取验证码
  $(".get_code_btn").on('click',function(){
    if(!codeStatus){
      codeStatus = true
      $.ajax({
        type: "get",
        url: Api.getCode,
        dataType: 'json',
        success: function (res) {
          if(res.code == 0){
            showTip(res.msg)
            $(".get_code_btn").addClass("get_code_btn_press")
            countTime()
          }else{
            codeStatus = false
            showTip(res.msg)
          }
        },
        error: function (res) {
          codeStatus = false
          showTip(res.msg)
        }
      })
    }

  })

  $(".new_submit").on('click',function(){
    var authCode = $(".code_input").val()
    if(!navigator.onLine){
      showTip('无网络链接，请检查网络设置')
    }else if(!authCode){
      showTip('验证码不能为空')
    }else if(authCode.length < 6){
      showTip('验证码格式错误')
    }else{
      !pushStatus && validateCode(authCode)
    }
  })

  function validateCode(authCode){
    pushStatus = true
    $.ajax({
      type: "get",
      url: Api.validateCode + authCode,
      dataType: 'json',
      contentType: "application/json",
      success: function (res) {
        pushStatus = false
        if(res.code == 0){
          $(".mask").fadeIn()
          $(".popup").css('display','block')
        }else if(res.code == 1){
          showTip("验证码错误，请重新获取")
        }else{
          showTip(res.msg)
        }
      },
      error: function (res) {
        pushStatus = false
        window.location.href = error_page
      }
    })
  }
  // ----------------------------新用户二次----------------------------
  $(".new_second").on('click',function(){
    $(".mask").fadeIn()
    $(".popup").css('display','block')
  })
// **********
})

//埋点
function setpoint(type) {
  var device = DEVICE;
  var channel = CHANNEL;
  var phone = getPhone();
  var paramData = {
    "systemType": device,
    "channel": channel,
    "operatorType": type,
    "mobileNumber": phone
  };
  $.ajax({
    type: "get",
    url: "http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-record",
    data: $.param(paramData),
    dataType: 'json',
    success: function (res) {
    },
    error: function (res) {
    }
  });
}


/**
 * 判断手机类型
 */
function phonetype() {
  var ua = navigator.userAgent.toLowerCase();
  var DEVICE = "";
  if (/(iphone|ipod|ipad);?/i.test(ua)) {
    DEVICE = "ios";
  } else if (/android|adr/.test(ua) && !(/windows phone/.test(ua))) {
    DEVICE = "android";
  }
  return DEVICE;
}
//判断是安卓还是ios
function getDevice() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    // var url = 'http://221.176.34.113:9000/versionmanager/download/meetyou-release/' + CHANNEL;
    var url = 'http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-release/' + CHANNEL;
    $(".get_btn").attr('href', url);
  } else if (isiOS) {
    $(".get_btn").attr("href", 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"');
    // setpoint("download");
  }
}

//识别浏览器是否为微信
function isWeixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}
