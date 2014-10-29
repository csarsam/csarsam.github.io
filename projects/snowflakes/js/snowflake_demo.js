define(function(require) {
    var SnowFlake = require('snowflakes');
    var parent;
    for (var i = 0; i < 15; i++) {
        parent = d3.select('body').append('div')[0];
        parent[0].className = "snowflake";
        new SnowFlake(parent[0], {color: "white"});
    }
    document.getElementsByClassName('regenerate')[0].onclick = function() {
        [].forEach.call(document.querySelectorAll('.snowflake'),function(e){
          e.parentNode.removeChild(e);
        });
        for (var i = 0; i < 15; i++) {
            parent = d3.select('body').append('div')[0];
            parent[0].className = "snowflake";
            new SnowFlake(parent[0], {color: "white"});
        } 
    };
});