function animate(obj, target, callback) {
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长值必须写到定时器的里面 每次调用时重新赋值
        // 把步长值改为整数 防止出现小数的问题导致移动不到指定位置
        var step = (target - obj.offsetLeft) / 10;
        // 步长值为正值时需向上取证，步长值为负值时需向下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            callback && callback();
        }
        // 调整每次的步长值使每次的移动距离慢慢减少 动画看起来更舒服  步长公式：(目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 15);
}