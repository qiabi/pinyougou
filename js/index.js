window.addEventListener('load', function() {
    // 先获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清楚定时器变量
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000);
    })
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (i = 0; i < ul.children.length; i++) {
        // 根据ul里面li的个数动态生成ol里的li（小圆圈）的个数
        var li = document.createElement('li');
        // 通过自定义属性为生成的小圆圈添加索引号
        li.setAttribute('index', i);
        ol.appendChild(li);
        // 生成小圆圈的同时绑定点击事件
        li.addEventListener('click', function() {
            // 排他思想
            for (i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆圈时使图像一起移动 注意此处移动的对象是ul不是li
            // ul的移动距离为：小圆圈的索引号 * 图片的宽度 移动距离为负值
            var index = this.getAttribute('index');
            animate(ul, -index * focusWidth);
            // 当我们点击某个小li，要把li的索引号给到num和circle
            num = index;
            circle = index;
        })
    }
    // 把ol的第一个小li类名设置为current
    ol.children[0].className = 'current';
    // 克隆第一张图片放在ul的最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右边的箭头图片跳转
    var num = 0;
    var circle = 0;
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 点击右侧按钮小圆圈随着一起变化
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChang();
        }
    })
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                ul.style.left = (ul.children.length - 1) * focusWidth;
                num = ul.children.length - 1;
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });

            // 点击左侧按钮小圆圈随着一起变化
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChang();
        }
    })
    var circleChang = function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
        // 自动播放轮播图
    var timer = this.setInterval(function() {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
})