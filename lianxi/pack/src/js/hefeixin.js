var picture = 0;
var textarea = $('.feedback-desc');
var count1_son = $('.count1_son')
var step = true;
var shuaxin = false;
var laynumber = 1;
var control = true;
var img_item = $('.img-item');
// 初始化
function init() {
    if (!($('.check-icon').hasClass('off'))) {
        $(this).removeClass('on').addClass('off')
    } else {}
    $('.check-icon.icon1').attr("problemStyle", "1");
    $('.check-icon.icon2').attr("problemStyle", "2");
    $('.check-icon.icon3').attr("problemStyle", "3");
}
// 意见类型必填
$('.check-icon').on('click', function(event) {
    if (($(this).hasClass('on'))) {
        $('.check-icon').empty();
        $('.check-icon').removeClass('on')
    } else {
        $('.check-icon').empty();
        $('.check-icon').removeClass('on')
        var iconradius = $('<i class="check-icon-radius"></i>');
        $(this).append(iconradius);
        $(this).addClass('on');
    };
    var that = $(this);
    submit(that);
})

// 限制文本框字数
function restriction() {
    if ($('.feedback-desc').val().length > 240) {
        var num = $('.feedback-desc').val().substr(0, 240);
        $('.feedback-desc').val(num);
    }
    // $('.count_1').html(240 - $('.feedback-desc').val().length + "/240")
    count1_son.html(240 - $('.feedback-desc').val().length);
};
// 上传图片功能
var numberp = 0;
var imgData = []
var uploadImage = {
    box: $("#fileBtn"),
    succeed: function(box, file, data) {
        //上传图片数量限制
        var upload_size = box.data("size");
        var image_length = box.find(".imgae-edit").length;
        if (image_length == upload_size && upload_size == 1) {
            box.find(".thumb").attr("src", data);
            box.find("input[type='hidden']").attr("value", encodeURIComponent(data));
            return false;
        } else if (image_length == upload_size) {
            alert("上传不能超过" + upload_size + "张图片");
            return false;
        }
        if (imagSize = file["files"][0].size > 10240000) {
            $('body').dailog({ type: 'default', title: '提示', discription: "上传图片大小不能超过10M", bottons: ['确定'] });
            return;
        }
        var newdata = data.split('base64,')[1]
        var len = $(".imgae-edit").length;
        if (imgData.length > 3) {
            return;
        }
        var _fileName = file["files"][0].name;
        if (_fileName) {
            if (_fileName.toLowerCase().slice(-3) !== 'jpg' && _fileName.toLowerCase().slice(-4) !== 'jpeg' && _fileName.toLowerCase().slice(-3) !== 'png' && _fileName.toLowerCase().slice(-3) !== 'gif') {
                this.error = '文件格式仅支付jpg、png和gif格式';
                return
            }
        }
        for (var i = 0; i < imgData.length; i++) {
            if (imgData[i].pic == newdata) {
                layer.open({
                    content: '不能上传同一张照片',
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                });
                return
            }
        }
        numberp++;
        // $('.count').html(numberp + "/4");
        $('.count').html(numberp + '/');
        var newfile = file.value.split('\\');
        var obj = {
            pic: newdata,
            picName: newfile[newfile.length - 1]
        };
        imgData.push(obj)
        if (imgData.length > 0) {
            img_item.css({ marginLeft: "5px" });
        }
        // 图片超出数量隐藏增加按钮
        addshow();
        //图片DOM添加
        var html = '<div class="imgae-edit"><img class="thumb" src=' + data + ' /><input type="hidden" name="image" value=' + encodeURIComponent(data) + '><a class="del"></a></div>';
        // var ele = $(file).parent();
        $(html).insertBefore($('.img-wrapper'));
        delremove();

    },
    error: function() {},
    remove: function() {
        $(this).parent().remove();
    },
    upload: function(box, file) {
        //标准浏览器,FF、谷歌
        if (file["files"] && file["files"][0]) {
            for (var i = 0; i < file["files"].length; i++) {
                var reader = new FileReader();
                reader.onload = function(evt) {
                    var data = evt.target.result;
                    uploadImage.succeed(box, file, data);
                }
                reader.readAsDataURL(file["files"][i]);
            }
        } else {
            file.select();
            var data = document.selection.createRange().text;
            uploadImage.succeed(box, file, data);
        }
        return file.vaule
           
    },
    init: function() {
        var _this = this;
        _this.box.each(function() {
            var box = $(this);
            box.on("click", ".del", _this.remove); //图片上传
            box.change(function() { //图片上传
                var file = $(this).get(0);
                _this.upload(box, file);
            });
        })
    }
};
// 图片超过数量，增加按钮隐藏
function addshow() {
    if (imgData.length > 3) {
        $('.img-item').css({
            display: "none"
        })
    } else if (imgData.length <= 3) {
        $('.img-item').css({
            display: "block"
        })
    }
}

// 图片删除功能
function delremove() {
    $('.imgae-edit').off();
    $('.imgae-edit').on('click', '.del', function() {
        numberp--;
        $('.count').html(numberp + "/");
        $(this).parent().remove()
        var imgtumb = $(this).siblings()[0]
        var value = $(imgtumb).attr("src").split('base64,')[1];
        for (var i = 0; i < imgData.length; i++) {
            if (value == imgData[i].pic) {
                imgData.splice(i, 1);
                addshow();
            }
        }
        if (imgData.length <= 0) {
            img_item.css({ marginLeft: "9px" });
        }
    })
}

// 页面跳转，截图渲染功能
function getAppCollegeImageUrl(url) {
    var olddata = url;
    var oldobj = {
        pic: olddata,
        picName: "截图.jpg"
    };
    var newdata = olddata.split('base64,')[1]
    var obj = {
        pic: newdata,
        picName: "截图.jpg"
    }
    imgData.push(obj);
    main(oldobj)
}

function main(oldobj) {
    var img = document.createElement('img');
    var imagebox = $('<div class="imagebox"></div>')[0];
    var dela2 = $('<i class="dela2" onclick="delImg(this)"></i>')
    $(imagebox).css({ display: "block" });
    $(imagebox).insertBefore($('.img-wrapper'));
    img.classList.add('eximage');
    $(imagebox).append($(img));
    $(imagebox).append($(dela2));
    img.src = "" + oldobj.pic;
    numberp++;
    $('.count').html(numberp + "/");
}
// 删除截图
function delImg(obj) {
    $('.imagebox').off();
    numberp--;
    $('.count').html(numberp + "/4");
    $(obj).parent().remove();

    var eximage = $(this).siblings()[0]
    var value = $(eximage).attr("src").split('base64,')[1];
    for (var i = 0; i < imgData.length; i++) {
        if (value == imgData[i].pic) {
            imgData.splice(i, 1);
        }
    }
}
// $('.imagebox').live('click', '.dela2', function() {
//         $('.imagebox').off();
//         numberp--;
//         $('.count').html(numberp + "/4");
//         $(this).parent().remove();
//
//         var eximage = $(this).siblings()[0]
//         var value = $(eximage).attr("src").split('base64,')[1];
//         for (var i = 0; i < imgData.length; i++) {
//             if (value == imgData[i].pic) {
//                 imgData.splice(i, 1);
//             }
//         }
//     })
// 判断能否提交功能
function submit(that) {
    removeOn();
    // console.log($('.feedback-desc').val().length)
    if (!$('.check-icon').hasClass('on')) {
        $('.btn').css({ color: "#BBBBBB", backgroundColor: "#E9EBEC" });
        removeOn();
    } else {
        $('.btn').css({ color: "#ffffff", backgroundColor: "#0D6CF9" })
        btnClick(that);
    }
    // if (!$('.check-icon').hasClass('on') && $('.feedback-desc').val().length < 10) {
    //     $('.btn').css({ color: "#BBBBBB", backgroundColor: "#E9EBEC" });
    //     removeOn();
    // } else if ($('.check-icon').hasClass('on') && $('.feedback-desc').val().length >= 10) {
    //     $('.btn').css({ color: "#ffffff", backgroundColor: "#0D6CF9" })
    //     btnClick();
    // } else if ($('.check-icon').hasClass('on') && $('.feedback-desc').val().length < 10) {
    //     $('.btn').css({ color: "#BBBBBB", backgroundColor: "#E9EBEC" });
    //     removeOn();
    // } else if (!$('.check-icon').hasClass('on') && $('.feedback-desc').val().length > 10) {
    //     $('.btn').css({ color: "#BBBBBB", backgroundColor: "#E9EBEC" });
    //     removeOn();
    // }
};
//输入框监听判断是否能提交
$(document).on('input propertychange', '.feedback-desc', function(e) {
        // console.log(e.orignalEvent)
        if (e.type === "input" || e.orignalEvent.propertyName === "value") {
            submit()
        }
    })
    // 点击提交
function btnClick(that) {
    $('.btn').on('click', function() {
        var textarea = $('.feedback-desc').val();
        // for (var i = 0; i < $('.check-icon').length; i++) {
        //     if ($('.check-icon').eq(i).hasClass('on')) {
        //         var problemstyles = $('.check-icon').eq(i).attr("problemStyle")
        //     }
        // }
        // var problemstyles = $('.check-icon').hasClass('on').attr("problemStyle");
        var problemstyles = $(that).attr("problemStyle");
        var postData = {
            "questionType": problemstyles,
            "advice": textarea,
            "images": imgData
        };
        $.ajax({
            type: 'POST',
            url: './saveFeedback',
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(postData),
            timeout: 100000,
            beforeSend: function() { //开始loading
                layer.open({
                    type: 2,
                    content: '正在提交，请耐心等待',
                    shadeClose: false,
                });
            },
            success: function(data) {
                layer.closeAll();
                $('body').dailog({ type: 'default', title: '提示', discription: '感谢你的反馈，我们将不断改善产品，提升体验！', bottons: ['确定'] },
                    function(ret) {
                        imgData = [];
                        window.location.reload();
                    });
            },
            complete: function() {
                layer.closeAll();
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                layer.closeAll();
                if (!window.navigator.onLine) {
                    $('body').dailog({ type: 'default', title: '提示', discription: '当前网络未连接，请检查网络！', bottons: ['确定'] });
                } else {
                    if (textStatus == 'timeout') {
                        // mui.alert('页面加载超时，请刷新重试！', '提示',function () {
                        //     window.location.reload();
                        // });
                        $('body').dailog({ type: 'default', title: '系统错误', discription: "页面加载超时，请刷新重试！", bottons: ['确定'] });
                    }
                    $('body').dailog({ type: 'default', title: '系统错误', discription: '服务器异常，请耐心等待', bottons: ['确定'] });
                }
            }
        })
    })

}



// 解除点击
function removeOn() {
    $('.btn').off("click");
}

// submit();
init();
uploadImage.init(); //调用
uploadImage.remove();

//防html注入
//换行符
function Text2Html(str) {
    if (str == null) {
        return "";
    }
    str = str.split("\n").join("<br />");;
    return str;
}
// 判断是否含html标签
function checkHtml(htmlStr) {
    var reg = /<[^>]+>/g;
    return reg.test(htmlStr);
}
//防html注入
function htmlEncodeJQ(str) {
    if (checkHtml(str)) {
        return $('<span/>').text(str).html();
    } else {
        return Text2Html(str);
    }

}

function tips() {
    $('#fileBtn')[0].value = '' // 每次点击是重置input
    if (
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.getCameraAndPhotoLibStatus
    ) {
        param = { backid: "getStatusValues" }
        window.webkit.messageHandlers.getCameraAndPhotoLibStatus.postMessage(param)
        window.getStatusValues =  function (res) {
            if( res.camera == '1' || res.photo == '1') {
                uploadImage.box.click()
            }
        }
    } else {
        uploadImage.box.click()   
    }
    
}