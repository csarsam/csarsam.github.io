define(function(){
    /**
     * Creates a new SnowFlake inside the give parent
     *
     * @classdesc
     * A pretty SVG snowflake
     * 
     * @name Snowflake
     *
     * @constructor
     *
     * @param {HTMLElement} parent
     *        The element to construct the snowflake in.
     *
     * @param {Object} options
     *        Options for configuring the snowflake generation
     * 
     * @param {integer} options.minBranches
     *
     * @param {integer} options.maxBranches
     *
     * @param {String}  options.color
     *        The color of the snowflake
     *
     **/

    var SnowFlake = function(parent, options) {
        if (options) {
            this._minBranches = options.minBranches ? options.minBranches : 4;
            this._maxBranches = options.maxBranches ? options.minBranches : 10;
            this._color = options.color ? options.color : "rgb(145,238,250)";
        }
        else {
            this._minBranches = 4;
            this._maxBranches = 10;
            this._color = "rgb(145,238,250)";
        }

        this._svg = d3.select(parent).append('svg');

        this._init = { x: 125, y: 125, a: 45, l: 90};

        this._miniBranches = [];

        this._branches = [];

        for (var i = 0; i < 12; i++) {
            var line = this._svg.append('line').attr('x1', this._init.x).attr('y1', this._init.y);
            if (i % 2 === 0) {
                line.attr('class', 'even');
                line.attr('x2', this._xendpt(this._init, this._init.l, Math.PI*i/6)).attr('y2', this._yendpt(this._init, this._init.l,  Math.PI*i/6)).style("stroke", this._color).attr('stroke-width', 2);
            }
            else {
                line.attr('class', 'odd');
                line.attr('x2', this._xendpt(this._init, 0.6 * this._init.l,  Math.PI*i/6)).attr('y2', this._yendpt(this._init, 0.6 * this._init.l,  Math.PI*i/6)).style("stroke", this._color).attr('stroke-width', 2);
            }
        }

        this._genBranchData();

        this._placeBranches();
    };

    SnowFlake.prototype = {
        _xendpt: function (start_point, length, rad) {
            return start_point.x + length * Math.sin(rad);
        },

        _yendpt: function (start_point, length, rad) {
            return (start_point.y + length * Math.cos(rad));
        },

        _branch_xstartpt: function (i, line, length) {
            return parseInt(line.attributes.x1.nodeValue) + length * Math.sin( Math.PI*i/6);
        },

        _branch_ystartpt: function (i, line, length) {
            return parseInt(line.attributes.y1.nodeValue) + length * Math.cos( Math.PI*i/6);
        },

        _genBranchData: function () {
            var numBranches = Math.round(Math.random() *
                              (this._maxBranches - this._minBranches) + this._minBranches);
            var miniNumBranches = Math.round(Math.random() * (this._maxBranches/2));
            var length, angle, position, thickness;
            var circle;
            
            for (var i = 0; i < numBranches; i++) {
                position = Math.random();
                angle = Math.random() * (Math.PI - 0);
                length = Math.random() * (60 * position);
                thickness = Math.random() * (8 - 1);
                circle = Math.random() < .15;
                this._branches[i] = {
                    position: position,
                    angle: angle,
                    length: length,
                    thickness: thickness,
                    circle: circle
                };
            }
            
            for (var i = 0; i < miniNumBranches; i++) {
                position = Math.random();
                angle = Math.random() * (Math.PI - 0);
                length = Math.random() * (30 * position);
                thickness = Math.random() * (5 - 1);
                this._miniBranches[i] = {
                    position: position,
                    angle: angle,
                    length: length,
                    thickness: thickness
                };
            }
        },

        _placeBranches: function () {
            var even = this._svg.selectAll('.even')[0];
            for (var i = 0; i < even.length; i++) {
                var line = even[i];
                for ( var j = 0; j < this._branches.length; j++) {
                    var startX = this._branch_xstartpt(i * 2, line, this._branches[j].position * 100);
                    var startY = this._branch_ystartpt(i * 2, line, this._branches[j].position * 100);
                    var endX = this._xendpt({x: startX}, this._branches[j].length, this._branches[j].angle + Math.PI*i/3);
                    var endY = this._yendpt({y: startY}, this._branches[j].length, this._branches[j].angle + Math.PI*i/3);
                    this._svg.append('line').attr('x1', startX).attr('y1', startY).attr('x2', endX).attr('y2', endY).style("stroke", this._color).attr('stroke-width', this._branches[j].thickness);
                    var endX_2 = this._xendpt({x: startX}, this._branches[j].length, - (this._branches[j].angle - Math.PI*i/3));
                    var endY_2 = this._yendpt({y: startY}, this._branches[j].length, - (this._branches[j].angle - Math.PI*i/3));
                    this._svg.append('line').attr('x1', startX).attr('y1', startY).attr('x2', endX_2).attr('y2', endY_2).style("stroke", this._color).attr('stroke-width', this._branches[j].thickness);
                    
                    if (this._branches[j].circle) {
                        this._svg.append('circle').attr('cx', endX).attr('cy', endY).attr('r', this._branches[j].thickness * 1).attr('fill', this._color);
                        this._svg.append('circle').attr('cx', endX_2).attr('cy', endY_2).attr('r', this._branches[j].thickness * 1).attr('fill', this._color);
                    }
                }
            }
            var odd = this._svg.selectAll('.odd')[0];
            for (var i = 0; i < odd.length; i++) {
                var line = odd[i];
                for ( var j = 0; j < this._miniBranches.length; j++) {
                    var startX = this._branch_xstartpt(i * 2+1, line, this._miniBranches[j].position * 60);
                    var startY = this._branch_ystartpt(i * 2+1, line, this._miniBranches[j].position * 60);
                    var endX = this._xendpt({x: startX}, this._miniBranches[j].length, this._miniBranches[j].angle + (Math.PI*(i * 2 + 1)/6));
                    var endY = this._yendpt({y: startY}, this._miniBranches[j].length, this._miniBranches[j].angle + (Math.PI*(i * 2 + 1)/6));
                    this._svg.append('line').attr('x1', startX).attr('y1', startY).attr('x2', endX).attr('y2', endY).style("stroke", this._color).attr('stroke-width', this._miniBranches[j].thickness);
                    var endX_2 = this._xendpt({x: startX}, this._miniBranches[j].length, - (this._miniBranches[j].angle - Math.PI*(2 * i + 1)/6));
                    var endY_2 = this._yendpt({y: startY}, this._miniBranches[j].length, - (this._miniBranches[j].angle - Math.PI*(2 * i + 1)/6));
                    this._svg.append('line').attr('x1', startX).attr('y1', startY).attr('x2', endX_2).attr('y2', endY_2).style("stroke", this._color).attr('stroke-width', this._miniBranches[j].thickness);
                }
            }
        }
    };

    return SnowFlake;
});