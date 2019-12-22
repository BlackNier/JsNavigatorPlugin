var NavigatorPlugin = (function () {
    var isDark = false;
    var navWidth = 0;
    var isPercentage = false;
    var isHide = false;
    var isdropdown = false;
    var cssfile = document.createElement("link")
    var nav = document.querySelector(".nav");
    var hideBtn = document.createElement("button");
    var styleBtn = document.createElement("button");
    var allListItems = document.getElementsByTagName("li");
    var allDivItems = document.getElementsByTagName("div");
    var dropdownHead = document.querySelector(".dropdown-Head");
    var dropdownMenu = document.querySelector(".dropdown-Menu");
    var dropdownListHeight = "0";
    var isfirstDrop=true;
    function move(element) {
        var target = 0;
        if (isHide) {
            target = 0;
            target = Math.floor(window.screen.availWidth * target);
            if (isDark) hideBtn.style.background = "url('./css/icons_dark/arrow_left.png')";
            else hideBtn.style.background = "url('./css/icons_light/arrow-lift.png')";
            hideBtn.style.backgroundSize = "100%";
            hideBtn.style.backgroundColor = "transparent";
            hideBtn.style.backgroundPosition = "center";
            hideBtn.style.backgroundRepeat = "no-repeat";
        }
        else {
            if (isPercentage) target = -navWidth * 0.009;
            else target = -0.12;
            target = Math.floor(window.screen.availWidth * target);
            if (isDark) hideBtn.style.background = "url('./css/icons_dark/arrow_right.png')";
            else hideBtn.style.background = "url('./css/icons_light/arrow-right.png')";
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
            if(isfirstDrop){
            dropdownMenu.style.height = "auto";
            dropdownListHeight = dropdownMenu.offsetHeight;
            dropdownMenu.style.height="0";
            isfirstDrop=false;
            }
            dropdownMenu.style.height = dropdownListHeight + "px";
            if (isDark) dropdownHead.style.background = "url('./css/icons_dark/arrow_up.png')";
            else dropdownHead.style.background = "url('./css/icons_light/arrow-up.png')";
            dropdownHead.style.backgroundSize = "10%";
            dropdownHead.style.backgroundPosition = "left";
            dropdownHead.style.backgroundRepeat = "no-repeat";
        }
        else {
            dropdownMenu.style.height = "0";
            if (isDark) dropdownHead.style.background = "url('./css/icons_dark/arrow_down.png')";
            else dropdownHead.style.background = "url('./css/icons_light/arrow-down.png')";
            dropdownHead.style.backgroundSize = "10%";
            dropdownHead.style.backgroundPosition = "left";
            dropdownHead.style.backgroundRepeat = "no-repeat";
        }
        isdropdown = !isdropdown;
    }
    function addIcon() {
        for (var i = 0; i < allListItems.length; i++) {
            if (allListItems[i].getAttribute("data-icon") != null) {
                if (isDark) allListItems[i].style.background = "url('./css/icons_dark/" + allListItems[i].getAttribute("data-icon") + ".png')";
                else allListItems[i].style.background = "url('./css/icons_light/" + allListItems[i].getAttribute("data-icon") + ".png')";
                allListItems[i].style.backgroundSize = "10%";
                allListItems[i].style.backgroundPosition = "left";
                allListItems[i].style.backgroundRepeat = "no-repeat";
            }
        }
        for (var i = 0; i < allDivItems.length; i++) {
            if (allDivItems[i].getAttribute("data-icon-title") != null) {
                if (isDark) allDivItems[i].style.background = "url('./css/icons_dark/" + allDivItems[i].getAttribute("data-icon-title") + ".png')";
                else allDivItems[i].style.background = "url('./css/icons_light/" + allDivItems[i].getAttribute("data-icon-title") + ".png')";
                allDivItems[i].style.backgroundSize = "12%";
                allDivItems[i].style.backgroundPosition = "left";
                allDivItems[i].style.backgroundRepeat = "no-repeat";
            }
        }
    }
    function changeStyle() {
        if (isDark) {
            cssfile.setAttribute("href", "./css/style_light.css");
            if (!isdropdown) dropdownHead.style.background = "url('./css/icons_dark/arrow_down.png')";
            else dropdownHead.style.background = "url('./css/icons_dark/arrow_up.png')";
            if (isHide) hideBtn.style.background = "url('./css/icons_dark/arrow_right.png')";
            else hideBtn.style.background = "url('./css/icons_dark/arrow_left.png')";
        }
        else {
            cssfile.setAttribute("href", "./css/style_dark.css");
            if (!isdropdown) dropdownHead.style.background = "url('./css/icons_light/arrow-down.png')";
            else dropdownHead.style.background = "url('./css/icons_light/arrow-up.png')";
            if (isHide) hideBtn.style.background = "url('./css/icons_light/arrow-right.png')";
            else hideBtn.style.background = "url('./css/icons_light/arrow-lift.png')";
        }
        isDark = !isDark;
        addIcon();
    }
    function _init() {
        cssfile.setAttribute("rel", "stylesheet");
        cssfile.setAttribute("type", "text/css");
        if (isDark) cssfile.setAttribute("href", "./css/style_dark.css");
        else cssfile.setAttribute("href", "./css/style_light.css");
        document.getElementsByTagName("head")[0].appendChild(cssfile);
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
        }
        nav.appendChild(hideBtn);
        nav.appendChild(styleBtn);
        hideBtn.id = "hideBtn";
        styleBtn.id = "styleBtn";
        hideBtn.onclick = function () { move(nav) };
        styleBtn.onclick = function () { changeStyle() };
        if (dropdownHead != null) {
            dropdownHead.onclick = function () { dropdown() };
        }
        addIcon();
    };

    return {
        init: _init,
    };
})();

NavigatorPlugin.init();