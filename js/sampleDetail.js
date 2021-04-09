
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

SampleDetail.prototype.update = function(genotype, fastq_simplename){
    var self = this;
    console.log("in sample detail, need to display igv shot")

    var igv_img_div_obj = [
                           {file:genotype+'.png', div:"#perturbed-igv"},
                           {file:"NAT.png", div:"#nat-igv"},
                           {file:"G418.png",div:"#g418-igv"},
                           {file: genotype+'_control.png', div: "#wt-igv"}
                         ];

    igv_img_div_obj.forEach((igv_img_info, i) => {
        $(igv_img_info.div).empty();
        $(".igv-heading").removeClass("disable");
        $(igv_img_info.div).append(createIframeElement(fastq_simplename,igv_img_info.file ));
    });


    function createIframeElement(fastq_simplename, img_filepath){
      var path = 'data/igv/'+fastq_simplename+'/'+img_filepath

      return '<iframe src="'+path+'" width="400" height="500"></iframe>'

    }



};
