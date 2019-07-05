$(document).ready(function() {

    // declare variables
    var $links = $(".UserLeftTitle,.UserLeftLink,.UserLeftBotLink");
    var agent = {
        value: navigator.userAgent,
        ifPhone: function() {
            return (this.value.indexOf("Android") + this.value.indexOf("iPhone") + this.value.indexOf("Windows Phone") + this.value.indexOf("SymbianOS") + this.value.indexOf("iPod") > 0);
        },
        isPhone: true,
        reloaded: function() {
            if(this.isPhone) {
                $("body").css("font-size", "15px");
                $("pre").each(function() {
                    $(this).removeClass("line-numbers");
                    $(this).css("line-height", "1.2");
                    $(this).after("<p class=\"ReloadedContent\"><small>Please access this page with a computer's browser for better experience as line numbers are disabled on the phone.</small></p>");
                });
            } else {
                $("body").css("font-size", "20px");
            }
        }
    };
    var selected = {
        $cell: null,
        load: function(href) {
            $("#dynamic").load("subpages/basics/" + href, function() {
                translate.view();
                agent.reloaded();
            });
            this.change();
        },
        change: function() {
            $links.css("background-color", "#ffffff");
            $links.css("color", "#000000");
            this.$cell.css("background-color", "#00b7ff");
            this.$cell.css("color", "#ffffff");
        }
    };
    var translate = {
        value: false,
        view: function() {
            $("#TranslateOn").css("text-decoration", (this.value ? "underline" : "none"));
            $("#TranslateOff").css("text-decoration", (this.value ? "none" : "underline"));
            $(".Chinese,.ReloadedChinese")[this.value ? "show" : "hide"]();
        }
    };

    // initializing variables
    agent.isPhone = agent.ifPhone();
    console.log(agent.isPhone);
    selected.$cell = $("#wlcm");

    // set left bar bottom
    if(agent.isPhone) {
        $("#botline").css("margin", (600 - $(".UserLeftTitle").length * 43 - $(".UserLeftLink").length * 28 - $(".UserLeftBotLink").length * 28 - $(".UserLeftBreak").length) + "px 0 0");
    } else {
        $("#botline").css("margin", (600 - $(".UserLeftTitle").length * 51 - $(".UserLeftLink").length * 34 - $(".UserLeftBotLink").length * 34 - $(".UserLeftBreak").length) + "px 0 0");
    }

    // set translation on function
    $("#TranslateOn").click(function() {
        translate.value = true;
        translate.view();
    });

    // set translation off function
    $("#TranslateOff").click(function() {
        translate.value = false;
        translate.view();
    });

    // init translation
    // translate.view();

    // init highlight cell
    selected.load("Welcome.html");

    // func for welcome
    $("#wlcm").click(function() {
        selected.$cell = $(this);
        selected.load("Welcome.html");
    });

    // func for introduction
    $("#intro").click(function() {
        selected.$cell = $(this);
        selected.load("Introduction.html");
    });

    // func for first program
    $("#fst-prgm").click(function() {
        selected.$cell = $(this);
        selected.load("FirstProgram.html");
    });

    // func for comments
    $("#cmt").click(function() {
        selected.$cell = $(this);
        selected.load("Comments.html");
    });

    // func for data types
    $("#dt-tp").click(function() {
        selected.$cell = $(this);
        selected.load("DataTypes.html");
    });

    $("#var").click(function() {
        selected.$cell = $(this);
        $("#dynamic").load("subpages/basics/Variables.html", function() {
            translate.view();
            var $CharDetail = $(".ReloadedCharDetail");
            $CharDetail.hide();
            $("#ToggleCharDetail").click(function() {
                $CharDetail.toggle("normal");
            });
            agent.reloaded();
        });
        selected.change();
    });

    $("#oprt").click(function() {
        selected.$cell = $(this);
        selected.load("Operators.html");
    });

    $("#func").click(function() {
        selected.$cell = $(this);
        selected.load("Function.html");
    });

    $("#clg-func").click(function() {
        selected.$cell = $(this);
        selected.load("CallingFunctions.html");
    });

    $("#selec").click(function() {
        selected.$cell = $(this);
        selected.load("Selection.html");
    });

    $("#rpt").click(function() {
        selected.$cell = $(this);
        selected.load("Repetition.html");
    });

    $("#ary").click(function() {
        selected.$cell = $(this);
        selected.load("Array.html");
    });

    $("#oprtlst").click(function() {
        selected.$cell = $(this);
        selected.load("OperatorList.html");
    });

    $("#rfak").click(function() {
        selected.$cell = $(this);
        selected.load("References.html");
    });

});
