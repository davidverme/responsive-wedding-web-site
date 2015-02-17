Pace.on("start", function(){

})

Pace.on("done", function(e) {
    $(".main-content").fadeIn(2000);
    $(".fittext1").fitText(1, {
        minFontSize: "15px",
        maxFontSize: "30px"
    });
    $(".fittext2").fitText(.4, {
        minFontSize: "30px",
        maxFontSize: "86px"
    });
    $(".fittext3").fitText(.4, {
        minFontSize: "30px",
        maxFontSize: "86px"
    });
    $(".fittext4").fitText(1.5, {
        minFontSize: "15px",
        maxFontSize: "24px"
    });
});

jQuery("html").removeClass("no-js").addClass("js");
if (navigator.appVersion.indexOf("Mac") !== -1) {
    jQuery("html").addClass("osx")
}
jQuery(document).ready(function(e) {
    e("a[data-rel]").each(function() {
        e(this).attr("rel", e(this).data("rel"))
    });
    e("a[rel^='prettyPhoto']").prettyPhoto({
        animation_speed: "normal",
        slideshow: 5e3,
        autoplay_slideshow: false,
        social_tools: false
    });
    (function() {
        e(window).load(function() {
            e("a[rel=external]").attr("target", "_blank")
        })
    })();
    e("nav").sticky({
        topSpacing: 0
    });
    e("nav").localScroll({
        duration: 600,
        offset: {
            top: 0,
            left: 0
        }
    });
    e(".select-menu").change(function() {
        e("html, body").animate({
            scrollTop: e(e(this).find("option:selected").val()).offset().top
        }, 1e3, function() {
            window.location.hash = e(this).find("option:selected").val()
        })
    });
    e("<option />", {
        selected: "selected",
        value: "",
        text: "Navigation"
    }).appendTo(".select-menu");
    e(".navi a").each(function() {
        var t = e(this);
        e("<option />", {
            value: t.attr("href"),
            text: t.attr("title")
        }).appendTo(".select-menu")
    });
    e(window).scroll(function() {
        var t = e(window).scrollTop();
        e('.navi a[href*="home"]').addClass("active");
        e('.navi a[href*="about"]').removeClass("active");
        e('.navi a[href*="location"]').removeClass("active");
        e('.navi a[href*="gifts"]').removeClass("active");
        e('.navi a[href*="tableware"]').removeClass("active");
        e('.navi a[href*="gallery"]').removeClass("active");
        e('.navi a[href*="contact"]').removeClass("active");
        if (t >= e("#home").height() + e("#slide").height() - 60) {
            e('.navi a[href*="home"]').removeClass("active");
            e('.navi a[href*="about"]').addClass("active")
        }
        if (t >= e("#home").height() + e("#slide").height() + e("#about").height()) {
            e('.navi a[href*="home"]').removeClass("active");
            e('.navi a[href*="about"]').removeClass("active");
            e('.navi a[href*="location"]').addClass("active")
        }
        if (t >= e("#home").height() + e("#slide").height() + e("#about").height() + e("#location").height()) {
            e('.navi a[href*="home"]').removeClass("active");
            e('.navi a[href*="about"]').removeClass("active");
            e('.navi a[href*="location"]').removeClass("active");
            e('.navi a[href*="gifts"]').addClass("active")
        }
        if (t >= e("#home").height() + e("#slide").height() + e("#about").height() + e("#location").height() + e("#gifts").height()) {
            e('.navi a[href*="home"]').removeClass("active");
            e('.navi a[href*="about"]').removeClass("active");
            e('.navi a[href*="location"]').removeClass("active");
            e('.navi a[href*="gifts"]').removeClass("active");
            e('.navi a[href*="tableware"]').addClass("active")
        }
        if (t >= e("#home").height() + e("#slide").height() + e("#about").height() + e("#location").height() + e("#gifts").height() + e("#tableware").height()) {
            e('.navi a[href*="home"]').removeClass("active");
            e('.navi a[href*="about"]').removeClass("active");
            e('.navi a[href*="location"]').removeClass("active");
            e('.navi a[href*="gifts"]').removeClass("active");
            e('.navi a[href*="tableware"]').removeClass("active");
            e('.navi a[href*="gallery"]').addClass("active")
        }
        if (t >= e("#home").height() + e("#slide").height() + e("#about").height() + e("#location").height() + e("#gifts").height() + e("#tableware").height() + e("#gallery").height()) {
            e('.navi a[href*="home"]').removeClass("active");
            e('.navi a[href*="about"]').removeClass("active");
            e('.navi a[href*="location"]').removeClass("active");
            e('.navi a[href*="gifts"]').removeClass("active");
            e('.navi a[href*="tableware"]').removeClass("active");
            e('.navi a[href*="gallery"]').removeClass("active");
            e('.navi a[href*="contact"]').addClass("active")
        }
    });
    $("header").css("height", $(window).height());
    //$("#my-background").css("background-size", "auto " + ($(window).height() * 1.5).toString() + "px");

    $.getJSON("img/collage.js", function(data) {
        //$("#my-fancy-collage").fancyCollage(data);
    });
});