//获得参数的方法
var request = {
    QueryString : function(val) {
        var uri = window.location.search;
        var re = new RegExp("" +val+ "=([^&?]*)", "ig");
        return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
    }
}


//用于判断是否是正确的运单号
var isValidCode = function(val){
    var patten = /^[a-zA-Z0-9]+$/;
    return patten.test(val);
}

//用于动态添加div的函数，添加后，要把输入框清空；
//同时给最新添加的 div 绑定 keyup 事件（最好阻止冒泡）
var newDiv = function(val){
    var content = "<div class='div_mi_item' tabindex='-1'>" +
        "<div class='div_mi_item_content'>"+val+"</div>" +
        "<div class='div_mi_item_close'></div>" +
        "</div>";
    //var content = "<div class='div_mi_item' tabindex='-1'>"+val+"<a href='#' class='div_mi_item_close'><img src='img/chacha.png'></a></div>";
    $("#input_Code").before(content);

    $(".div_mi_item:last").bind("keydown",
        function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (evt.keyCode === 8) {
                $(this).remove();
                if ($(".div_mi_item").length > 0) {
                    $(".div_mi_item:last").addClass("div_mi_item_active").focus();
                }
                else {
                    $("#input_Code").focus();
                }
            }
        }
    );

    $(".div_mi_item_close").click(
        function(e){
            e.preventDefault();
            $(this).parent().remove();
        }
    );

    $("#input_Code").val("");
}

//处理输入框的键盘事件
var dealInputCodeKeyUp = function(evt){
    evt.stopPropagation();

    $(".div_mi_item").removeClass("div_mi_item_active");

    // 空格或者回车后，相当于新增一订单号
    if(evt.keyCode === 32 || evt.keyCode === 13){
        if(isValidCode($.trim($("#input_Code").val()))){
            //先判断是否是正常的字符串，如果是的话，执行添加，否则不为所动
            newDiv($.trim($("#input_Code").val()));
        }
        else{
            $("#input_Code").val("");
        }
    }

    //退格键，如果已经是空的，需要向前选择一个，同时输入框失去光标
    if(evt.keyCode === 8){
        if($("#input_Code").val() == "" &&  $(".div_mi_item").length > 0){
            $("#input_Code").blur();
            $(".div_mi_item:last").addClass("div_mi_item_active").focus();
        }
    }
}

function init(){
    //设置菜单的交互
    $(".Div_Menu").hover(
        function(){
            // 把两个下拉菜单都设置隐藏先
            $("#Div_List_KD").css("display","none");
            $("#Div_List_HY").css("display","none");

            if( $(this).is("#Div_Menu_ZZFW") || $(this).is("#Div_Menu_GYWM")){
                $(this).addClass("Div_Menu_Hover_Long");
            }
            else {
                $(this).addClass("Div_Menu_Hover");
            }

            if( $(this).is("#Div_Menu_KD") ){
                $("#Div_List_KD").css("display","block");
                $("#Div_List_KD").css("z-index","9");
            }
            if( $(this).is("#Div_Menu_HY") ){
                $("#Div_List_HY").css("display","block");
                $("#Div_List_HY").css("z-index","9");
            }
        },
        function(){
            if( $(this).is("#Div_Menu_ZZFW") || $(this).is("#Div_Menu_GYWM")){
                $(this).removeClass("Div_Menu_Hover_Long");
            }
            else {
                $(this).removeClass("Div_Menu_Hover");
            }
        }
    );

    $(".Div_Menu").click(
        function(){
            if($(this).is("#Div_Menu_SY")){
                window.location.href = "index.html";
            }else if($(this).is("#Div_Menu_KD")){
                window.location.href = "kd.html";
            }else if($(this).is("#Div_Menu_HY")){
                window.location.href = "hy.html";
            }else if($(this).is("#Div_Menu_CC")){
                window.location.href = "cc.html";
            }else if($(this).is("#Div_Menu_ZZFW")){
                window.location.href = "zzfw.html";
            }else if($(this).is("#Div_Menu_GYWM")){
                window.location.href = "gywm.html";
            }
        }
    );

    //快递下拉菜单的交互
    $("#Div_List_KD").hover(
        function(){
            $(this).css("display","block");
            $(this).css("z-index","9");

        },
        function(){
            $(this).css("display","none");
            $(this).css("z-index","-1");
        }
    );

    //货运下拉菜单的交互
    $("#Div_List_HY").hover(
        function(){
            $(this).css("display","block");
            $(this).css("z-index","9");

        },
        function(){
            $(this).css("display","none");
            $(this).css("z-index","-1");

        }
    );

    //设置下拉菜单中的超链接
    $("#link_jrd").attr("href","kd.html?type=jrd");
    $("#link_icon_jrd").attr("href","kd.html?type=jrd");
    $("#link_crd").attr("href","kd.html?type=crd");
    $("#link_icon_crd").attr("href","kd.html?type=crd");
    $("#link_jjkd").attr("href","kd.html?type=jjkd");
    $("#link_icon_jjkd").attr("href","kd.html?type=jjkd");
    $("#link_ly").attr("href","hy.html?type=ly");
    $("#link_icon_ly").attr("href","hy.html?type=ly");
    $("#link_ky").attr("href","hy.html?type=ky");
    $("#link_icon_ky").attr("href","hy.html?type=ky");


    $("#a_zxkf").attr("href","tencent://message/?uin=2043921468&Site=c-logistics.cn&Menu=yes");
    $("#a_zxkf_2").attr("href","tencent://message/?uin=2043921468&Site=c-logistics.cn&Menu=yes");

}


$(document).ready(init);

function goQuery(){
    alert("后台系统研发中，上线后会立即开放查询功能");
}