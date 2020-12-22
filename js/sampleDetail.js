
/**
 * Constructor for the a visualization
 *
 * replace all "VisTemplate" with name of object
 */
function SampleDetail(){

    var self = this;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
SampleDetail.prototype.init = function(){
    var self = this;
    self.margin = {top: 30, right: 20, bottom: 30, left: 50};

    // var divelectoralVotes = d3.select("#electoral-vote").classed("content", true);
    // self.svgBounds = divelectoralVotes.node().getBoundingClientRect();
    // self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    // self.svgHeight = 150;
    //
    // //creates svg element within the div
    // self.svg = divVisTemplate.append("svg")
    //     .attr("width",self.svgWidth)
    //     .attr("height",self.svgHeight);


};



/**
 * Creates the stacked bar chart, text content and tool tips for electoral vote chart
 *
 * @param
 * @param
 */

SampleDetail.prototype.update = function(){
    var self = this;


};
