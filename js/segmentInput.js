/**
 * Created by wucho on 2014/9/24.
 */


(function( $ ) {

    //private vars
    var itemTemplate = '<div class="div_mi_item" tabindex="-1">' +
        '<div class="div_mi_item_content">__input__</div>' +
        '<div class="div_mi_item_close" style="float:left;margin-left: 5px;border:0px solid blue;width: 12px;height: 12px;cursor:pointer;">×</div>' +
        '</div>'

    var userInputs=[]

    var rootHeigth=0;

    //private functions
    //新增一个项目
    var newItem = function(){
        var currentInput = $('#input_receiver').val().trim().toString()
        if(!currentInput) return
        var item = itemTemplate.replace('__input__', currentInput)
        //插入新的Item 并将当前输入框清空


        $(item).css({    'float':'left'
                        ,'margin-left': '3px'
                        ,'outline': 'none'
                        ,'vertical-align': 'middle'
                        ,'height': rootHeigth*0.9
                        ,'background-color': '#ffffff'
                        //,'line-height': '12px'
//                        ,'padding': '2% 2% 2% 2%'
                        ,'font-size': '12px'
                        ,'border':'1px solid #cccccc'
                        ,'border-radius': '2px'
                        ,'margin-top': '3px'})
            .insertBefore($("#input_receiver"))
            .find('.div_mi_item_content')
            .css({   "float":"left"
                    ,"font-size": "12px"
                    ,"border":"0px solid red"})

        $("#input_receiver").val("");
        //并将数据记录到userInputs中
        userInputs.push(currentInput);
    }
    //删除一个项目
    var removeItem = function(index){
        var items = $('#input_receiver').parent().find('.div_mi_item')
        index==-1 ? items[ items.length -1 ].remove() : items[ index ].remove()
        userInputs.splice(index,1)
        //userInputs.pop()
    }



    $.fn.segInput = function( options ) {
        //初始化参数
        var settings = $.extend({
            "placeholder": "请输入，用回车或空格分隔"
        }, options )
        //获取初始化节点的jQuery obj
        var $this = $(this)
        rootHeigth = $this.css('height');
        $('<input id="input_receiver"/>').appendTo($this).css({'background-color':'#ffffff','border':'0px','margin':'2'}).attr('placeholder',settings.placeholder);

        //绑定在item上的事件
        $this.on("keydown",'.div_mi_item',function(evt) {
                if (evt.keyCode == 8) removeItem($(this).prevAll().length) //如果点到item上并且用了退格键

            })


        //点击关闭按钮时的操作
        $this.on('click','.div_mi_item_close',function(e){
            //获取到item的位置，并干掉这个item
            removeItem($(this).parent().prevAll().length)
            e.preventDefault()
        })

        //输入框失去焦点的时候默认进行一次 newItem
        $("#input_receiver").bind("blur",function(){ newItem() });

        //监控输入框中的键盘事件
        $('#input_receiver').keydown(function(e){
            $(".div_mi_item").removeClass("div_mi_item_active");
            // 空格或者回车后，相当于新增一收件人
            if(e.keyCode === 32 || e.keyCode === 13) {
                newItem()
                e.preventDefault()
            }
            //退格键，如果已经是空的，需要向前选择一个，同时输入框失去光标
            if(e.keyCode === 8 && $(this).val() == "" &&  $this.find(".div_mi_item").length > 0) removeItem(-1)

        })

        return {
            getInputs:function(){
                return userInputs;
            }
        };
    };
}( jQuery ));