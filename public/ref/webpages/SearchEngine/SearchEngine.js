$(document).ready(function() {

    // declare variables
    var $links = $(".UserLeftTitle,.UserLeftLink,.UserLeftBotLink");
    var selected = {
        $cell: null,
        load: function(href) {
            $("#dynamic").load("subpages/" + href);
            this.change();
        },
        change: function() {
            $links.css("background-color", "#ffffff");
            $links.css("color", "#000000");
            this.$cell.css("background-color", "#00b7ff");
            this.$cell.css("color", "#ffffff");
        }
    };

    // init highlight cell
    selected.$cell = $("#intro");

    // init dynamic part
    selected.load("intro.html");

    // func for introduction
    $("#intro").click(function() {
        selected.$cell = $(this);
        selected.load("intro.html");
    });

    // func for crawl
    $("#crl").click(function() {
        selected.$cell = $(this);
        selected.load("crl.html");
    });

    // func for crawl
    $("#idx").click(function() {
        selected.$cell = $(this);
        selected.load("idx.html");
    });

    // func for crawl
    $("#srh").click(function() {
        selected.$cell = $(this);
        selected.load("srh.html");
    });

    // func for reference
    $("#rfc").click(function() {
        selected.$cell = $(this);
        selected.load("rfc.html");
    });

});
