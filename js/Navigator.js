var NavigatorPlugin = (function () {
    var navWidth = 0;
    var isPercentage = false;
    var isHide = false;
    var isdropdown = false;
    var nav = document.querySelector(".nav");
    var hideBtn = document.createElement("button");
    var styleBtn = document.createElement("button");
    var allListItems = document.getElementsByTagName("li");
    var allDivItems = document.getElementsByTagName("div");
    var dropdownHead = document.querySelector(".dropdown-Head");
    var dropdownMenu = document.querySelector(".dropdown-Menu");
    function move(element) {
        var target = 0;
        if (isHide) {
            target = 0;
            target = Math.floor(window.screen.availWidth * target);
            hideBtn.style.background = "url('./css/icons/arrow-lift.png')";
            hideBtn.style.backgroundSize = "100%";
            hideBtn.style.backgroundColor = "transparent";
            hideBtn.style.backgroundPosition = "center";
            hideBtn.style.backgroundRepeat = "no-repeat";
        }
        else {
            if (isPercentage) target = -navWidth * 0.009;
            else target = -0.12;
            target = Math.floor(window.screen.availWidth * target);
            hideBtn.style.background = "url('./css/icons/arrow-right.png')";
            hideBtn.style.backgroundSize = "100%";
            hideBtn.style.backgroundColor = "transparent";
            hideBtn.style.backgroundPosition = "center";
            hideBtn.style.backgroundRepeat = "no-repeat";
        }
        isHide = !isHide;
        clearInterval(element.timeId);
        element.timeId = setInterval(function () {
            var current = element.offsetLeft;
            var step = (target - current) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            current += step;
            element.style.left = current + "px";
            if (current == target) {
                clearInterval(element.timeId);
            }
        }, 20);
    }
    function dropdown() {
        if (!isdropdown) {
            dropdownMenu.style.display = "block";
            dropdownHead.style.background = "url('./css/icons/arrow-up.png')";
            dropdownHead.style.backgroundSize = "10%";
            dropdownHead.style.backgroundPosition = "left";
            dropdownHead.style.backgroundRepeat = "no-repeat";
        }
        else {
            dropdownMenu.style.display = "none";
            dropdownHead.style.background = "url('./css/icons/arrow-down.png')";
            dropdownHead.style.backgroundSize = "10%";
            dropdownHead.style.backgroundPosition = "left";
            dropdownHead.style.backgroundRepeat = "no-repeat";
        }
        isdropdown = !isdropdown;
    }
    function addIcon() {
        for (var i = 0; i < allListItems.length; i++) {
            if (allListItems[i].getAttribute("data-icon") != null) {
                allListItems[i].style.background = "url('./css/icons/" + allListItems[i].getAttribute("data-icon") + ".png')";
                allListItems[i].style.backgroundSize = "10%";
                allListItems[i].style.backgroundPosition = "left";
                allListItems[i].style.backgroundRepeat = "no-repeat";
            }
        }
        for (var i = 0; i < allDivItems.length; i++) {
            if (allDivItems[i].getAttribute("data-icon-title") != null) {
                allDivItems[i].style.background = "url('./css/icons/" + allDivItems[i].getAttribute("data-icon-title") + ".png')";
                allDivItems[i].style.backgroundSize = "12%";
                allDivItems[i].style.backgroundPosition = "left";
                allDivItems[i].style.backgroundRepeat = "no-repeat";
            }
        }
    }
    function changeStyle() {

    }
    function _init() {
        var navWidthStr = nav.getAttribute("data-width");
        if (navWidthStr != null) {
            if (navWidthStr[navWidthStr.length - 1] == 'x') {
                isPercentage = false;
                navWidth = parseInt(navWidthStr.slice(0, length - 2));
            } else if (navWidthStr[navWidthStr.length - 1] == '%') {
                isPercentage = true;
                navWidth = parseInt(navWidthStr.slice(0, length - 1));
            }
            nav.style.width = navWidthStr;
            //console.log(navWidthStr);
        }
        nav.appendChild(hideBtn);
        nav.appendChild(styleBtn);
        hideBtn.id = "hideBtn";
        styleBtn.id = "styleBtn";
        hideBtn.onclick = function () { move(nav) };
        styleBtn.onclick = function () { changeStyle() };
        if (dropdownHead != null) dropdownHead.onclick = function () { dropdown() };
        addIcon();
    };
    return {
        init: _init,
    };
})();

NavigatorPlugin.init();