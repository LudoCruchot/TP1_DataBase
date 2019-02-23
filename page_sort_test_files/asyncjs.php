<html>
<head>
    <title>CyberGhost has blocked this content!</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

    <style>
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            display: table;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }

        img {
            max-width: 100%;
            height: auto;
        }

        #content {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
        }

        #data {
            display: none;
        }
    </style>
</head>
<body>
<div id="content">
    <div id="data">
        <img src="/img/transitional/protect/KnightGhostie.png"><br/>

        <h2>CyberGhost has protected you<br/>from malicious content!</h2>
        The requested url has been blocked
    </div>
</div>

<script>
    function getUrlVars() {
        var queries = {};
        $.each(document.location.search.substr(1).split('&'), function (c, q) {
            var i = q.split('=');

            if (i && i.length > 1)
                queries[i[0].toString()] = i[1].toString();
        });

        return queries;
    }

    function init() {
        var vars = getUrlVars();

        if (vars.reason === "malicious") {
            $("#data").show();
            $("body").css({backgroundColor: "#FFCC00"});
        }
    }

    init();
</script>
</body>
</html>