// UTILITY FUNCTIONS

/* Return the x-coordinate of the endpoint of a line segment
   Params: start_point: {x}
           length: number
*/
function xendpt(start_point, length, rad) {
    return start_point.x + length * Math.sin(rad);
}
/* Return the y-coordinate of the endpoint of a line segment
   Params: start_point: {y}
           length: number
*/
function yendpt(start_point, length, rad) {
    return (start_point.y + length * Math.cos(rad));
}

function branch_xstartpt(i, line, length) {
    return parseInt(line.attributes.x1.nodeValue) + length * Math.sin( Math.PI*i/6);
}

function branch_ystartpt(i, line, length) {
    return parseInt(line.attributes.y1.nodeValue) + length * Math.cos( Math.PI*i/6);
}

// END UTILITY FUNCTIONS

var init = { x: 125, y: 125, a: 45, l: 90};

function generate() {

    for ( var z = 0; z < 9; z++) { 

        var svg = d3.select('.svg-container').append('svg');
        
        for (var i = 0; i < 12; i++) {
            var line = svg.append('line').attr('x1', init.x).attr('y1', init.y);
            if (i % 2 === 0) {
                line.attr('class', 'even');
                line.attr('x2', xendpt(init, init.l, Math.PI*i/6)).attr('y2', yendpt(init, init.l,  Math.PI*i/6)).style("stroke", "rgb(145,238,250)").attr('stroke-width', 2);
            }
            else {
                line.attr('class', 'odd');
                line.attr('x2', xendpt(init, 0.6 * init.l,  Math.PI*i/6)).attr('y2', yendpt(init, 0.6 * init.l,  Math.PI*i/6)).style("stroke", "rgb(145,238,250)").attr('stroke-width', 2);
            }
        }
        var min = 4, max = 10;
        var branches = [];
        var miniBranches = [];
        
        function genBranchData() {
            var numBranches = Math.round(Math.random() * (max - min) + min);
            var miniNumBranches = Math.round(Math.random() * (max/2));
            var length, angle, position, thickness;
            var circle;
            
            for (var i = 0; i < numBranches; i++) {
                position = Math.random();
                angle = Math.random() * (Math.PI - 0);
                length = Math.random() * (60 * position);
                thickness = Math.random() * (8 - 1);
                circle = Math.random() < .15;
                branches[i] = { position: position, angle: angle, length: length, thickness: thickness, circle: circle };
            }
            
            for (var i = 0; i < miniNumBranches; i++) {
                position = Math.random();
                angle = Math.random() * (Math.PI - 0);
                length = Math.random() * (30 * position);
                thickness = Math.random() * (5 - 1);
                miniBranches[i] = { position: position, angle: angle, length: length, thickness: thickness };
            }
        }
        
        genBranchData();
        
        function placeBranches() {
            var even = d3.selectAll('.even')[0];
            for (var i = 0; i < even.length; i++) {
                var line = even[i];
                for ( var j = 0; j < branches.length; j++) {
                    var startX = branch_xstartpt(i * 2, line, branches[j].position * 100);
                    var startY = branch_ystartpt(i * 2, line, branches[j].position * 100);
                    var endX = xendpt({x: startX}, branches[j].length, branches[j].angle + Math.PI*i/3);
                    var endY = yendpt({y: startY}, branches[j].length, branches[j].angle + Math.PI*i/3);
                    svg.append('line').attr('x1', startX).attr('y1', startY).attr('x2', endX).attr('y2', endY).style("stroke", "rgb(145,238,250)").attr('stroke-width', branches[j].thickness);
                    var endX_2 = xendpt({x: startX}, branches[j].length, - (branches[j].angle - Math.PI*i/3));
                    var endY_2 = yendpt({y: startY}, branches[j].length, - (branches[j].angle - Math.PI*i/3));
                    svg.append('line').attr('x1', startX).attr('y1', startY).attr('x2', endX_2).attr('y2', endY_2).style("stroke", "rgb(145,238,250)").attr('stroke-width', branches[j].thickness);
                    
                    if (branches[j].circle) {
                        svg.append('circle').attr('cx', endX).attr('cy', endY).attr('r', branches[j].thickness * 1).attr('fill', 'rgb(145,238,250)');
                        svg.append('circle').attr('cx', endX_2).attr('cy', endY_2).attr('r', branches[j].thickness * 1).attr('fill', 'rgb(145,238,250)');
                    }
                }
            }
            var odd = d3.selectAll('.odd')[0];
            for (var i = 0; i < odd.length; i++) {
                var line = odd[i];
                for ( var j = 0; j < miniBranches.length; j++) {
                    var startX = branch_xstartpt(i * 2+1, line, miniBranches[j].position * 60);
                    var startY = branch_ystartpt(i * 2+1, line, miniBranches[j].position * 60);
                    var endX = xendpt({x: startX}, miniBranches[j].length, miniBranches[j].angle + (Math.PI*(i * 2 + 1)/6));
                    var endY = yendpt({y: startY}, miniBranches[j].length, miniBranches[j].angle + (Math.PI*(i * 2 + 1)/6));
                    svg.append('line').attr('x1', startX).attr('y1', startY).attr('x2', endX).attr('y2', endY).style("stroke", "rgb(145,238,250)").attr('stroke-width', miniBranches[j].thickness);
                    var endX_2 = xendpt({x: startX}, miniBranches[j].length, - (miniBranches[j].angle - Math.PI*(2 * i + 1)/6));
                    var endY_2 = yendpt({y: startY}, miniBranches[j].length, - (miniBranches[j].angle - Math.PI*(2 * i + 1)/6));
                    svg.append('line').attr('x1', startX).attr('y1', startY).attr('x2', endX_2).attr('y2', endY_2).style("stroke", "rgb(145,238,250)").attr('stroke-width', miniBranches[j].thickness);
                }
            }
        }
        
        placeBranches();
    }
}

generate();

$('.regenerate').on('click', function () {
    $('svg').remove();
    generate();
});
