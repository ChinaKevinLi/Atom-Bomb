// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

function serializeXmlNode(xmlNode) {
    if (typeof window.XMLSerializer != "undefined") {
        return (new window.XMLSerializer()).serializeToString(xmlNode);
    } else if (typeof xmlNode.xml != "undefined") {
        return xmlNode.xml;
    }
    return "";
}

function simulatePathDrawing(path) {
    // var path = document.querySelector('.squiggle-animated path');
    var length = path.getTotalLength();
    // Clear any previous transition
    path.style.transition = path.style.WebkitTransition =
        'none';
    // Set up the starting positions
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.getBoundingClientRect();
    // Define our transition
    path.style.transition = path.style.WebkitTransition =
        'stroke-dashoffset ' + (Math.random() * 3 + 1) + 's ease-in-out .4s';
    // Go!
    path.style.strokeDashoffset = '0';
    path.style.stroke = stroke;
    path.style.strokeWidth = '1px';
    // path.style.fill = 'rgba(255,255,0,.12)';
}

var distort, corners, r, minR, lines, rotateEach, offset = 0;
var stroke = "black";

function draw() {
    stroke = getCol();
    rotateEach = (typeof rotateEach !== "undefined") ? rotateEach : 0;
    var count = (typeof lines !== "undefined") ? lines : 6;
    var add = (r - minR) / count;

    var step = 360 / corners;
    var cx = 100;
    var cy = 100;
    var pi = 22 / 7;
    var cordeg = -6;
    var p = ""
    var figures = "";
    var fill = getCol();
    var base = '<?xml version="1.0"?>\n<svg width="200" height="200" viewPort="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" id="polygons">';
    base += '\n%d%%l%';
    base += '</svg>';
    var polygon = '\t<polygon style="stroke: ' + stroke + ';fill:transparent;stroke-width: 1px;" points="%p%"></polygon>\n';
    var path = '\t<path style="stroke: ' + stroke + ';fill:transparent;stroke-width: 1px;" d="%p%"></path>\n';
    var rotate = rotateEach;
    var lines2 = [];
    var iL = 0;
    for (var g = 0; g < 360; g += step) {
        lines2[iL++] = [];
    }
    var iLines = iL--;

    for (var m = 0; m < count; m++) {
        p = "";
        var c = "";
        iL = 0;
        for (var g = 0; g < 360; g += step) {
            var d = 1;
            if (!!distort) {
                d = (Math.random() * .08) - (Math.random() * .08);
            }
            var y = Math.round(Math.sin((g + cordeg + (rotateEach * d) * m) / 180 * pi) * r, 2) + cx;
            var x = Math.round(Math.cos((g + cordeg + (rotateEach * d) * m) / 180 * pi) * r, 2) + cy;
            var sCoor = x + "," + y + " ";
            p += sCoor;
            lines2[iL] = lines2[iL] + ((m === 0) ? "M " : "L ") + sCoor;
            iL++;
        };
        r -= add;
        figures += polygon.replace("%p%", p) + c
    }
    base = base.replace("%d%", figures);
    var sLines = "";
    for (var i = 0; i < iLines; i++) {
        sLines += path.replace("%p%", lines2[i] + " ");
    }
    base = base.replace("%l%", sLines);

    $("div.svg").html(base);

    $("svg path").each(function() {
        simulatePathDrawing(this)
    })
}

function prepearDraw() {
    distort = false;
    corners = 4;
    r = 78;
    minR = 43;
    lines = 14;
    rotateEach = 11;
    $("#corners").val(corners);
    $("#r").val(r);
    $("#minR").val(minR);
    $("#lines").val(lines);
    $("#rotateEach").val(rotateEach);
    draw();
}

function getCol() {
    var c = "black";
    return c;
}

prepearDraw();