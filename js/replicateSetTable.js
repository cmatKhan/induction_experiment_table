
/**
 * Constructor for the a visualization
 *
 * replace all "VisTemplate" with name of object
 */
function ReplicateSetTable(){

    var self = this;
    self.init();

}; // end constructor

/**
 * Initializes the svg elements required for this chart
 */
ReplicateSetTable.prototype.init = function(){
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


}; // end init()



/**
 * update table
 * Cite: http://bl.ocks.org/tompiler/8295e192447d4afb90046873dac98745
 * @param genotype: passed on click from tallyTable -- eg CNAG_12345. filename of a genotype in data/split_by_genotype
 */

ReplicateSetTable.prototype.update = function(genotype){
    var self = this;

    var highlighted_div = "#replicate-set-highlighted"
    var selected_div = "#replicate-set-selected"
    console.log(csv_path)
    var csv_path = "data/split_by_genotype/CNAG_00031.csv" // create from passed genotype, which is passed from tallyTable
    console.log(csv_path)
      // cite: http://bl.ocks.org/tompiler/8295e192447d4afb90046873dac98745
      d3.csv(csv_path, function(error, data) {
        if (error) {
          console.error("ERROR!");
          throw error;
        }
        console.log(data)
        var table_plot = self.makeTable()
                          .datum(data)
                          //.sortBy('pval', true)
                          .filterCols(['col', 'x', 'y']);

        d3.select('#replicate-set-table').call(table_plot);

        // this reacts to hovering
        table_plot.on('highlight', function(data, on_off){
          if(on_off){//if the data is highlighted
          	d3.select(highlighted_div).text(
          		'Oops, I just stepped over gene ' + data.genotype1
          	);
          }
        });
        // this reacts to clicking
        table_plot.on('select', function(data, on_off){
          if(on_off){//if the data is highlighted
          	d3.select(selected_div).text(
          		'And it was the chosen one ' + data.strain
          	);
          }
        });
      }); // end d3

}; // end update()

/**
 * helper functions for table. This entire table function is copied verbatim from the link below
 * Cite: http://bl.ocks.org/tompiler/8295e192447d4afb90046873dac98745
 * @param
 */

ReplicateSetTable.prototype.makeTable = function() {
	var data, sort_by, filter_cols; // Customizable variables

	var table; // A reference to the main DataTable object

	// This is a custom event dispatcher.
	var dispatcher = d3.dispatch('highlight', 'select');

	// Main function, where the actual plotting takes place.
	function _table(targetDiv) {
	  // Create and select table skeleton
	  var tableSelect = targetDiv.append("table")
	    .attr("class", "display compact")
			// Generally, hard-coding Ids is wrong, because then
			// you can't have 2 table plots in one page (both will have the same id).
			// I will leave it for now for simplicity. TODO: remove hard-coded id.
	    .attr("id", "change_to_var_input_rep")
	    .style("visibility", "hidden"); // Hide table until style loads;

	  // Set column names
	  var colnames = Object.keys(data[0]);
		if(typeof filter_cols !== 'undefined'){
			// If we have filtered cols, remove them.
			colnames = colnames.filter(function (e) {
				// An index of -1 indicate an element is not in the array.
				// If the col_name can't be found in the filter_col array, retain it.
				return filter_cols.indexOf(e) < 0;
			});
		}

		// Here I initialize the table and head only.
		// I will let DataTables handle the table body.
	  var headSelect = tableSelect.append("thead");
	  headSelect.append("tr")
	    .selectAll('td')
	    .data(colnames).enter()
		    .append('td')
		    .html(function(d) { return d; });

		if(typeof sort_by !== 'undefined'){
			// if we have a sort_by column, format it according to datatables.
			sort_by[0] = colnames.indexOf(sort_by[0]); //colname to col idx
			sort_by = [sort_by]; //wrap it in an array
		}

	  // Apply DataTable formatting: https://www.datatables.net/
	  $(document).ready(function() {
	    table = $('#change_to_var_input_rep').DataTable({
				// Here, I am supplying DataTable with the data to fill the table.
				// This is more efficient than supplying an already contructed table.
				// Refer to http://datatables.net/manual/data#Objects for details.
	      data: data,
	      columns: colnames.map(function(e) { return {data: e}; }),
	      "bLengthChange": false, // Disable page size change
	      "bDeferRender": true,
	      "order": sort_by,
	    });

	    tableSelect.style("visibility", "visible");
      $('#change_to_var_input_rep tbody')
        .on( 'mouseover', 'tr', function () { highlight(this, true); } )
        .on( 'mouseleave', 'tr', function () { highlight(this, false); } )
        .on('click', 'tr', function () { select(this); });
	  });

    // make the cells click-able
    $('#change_to_var_input_rep').on('click', 'tbody td', function() {
        //get textContent of the TD
        console.log('TD cell textContent : ', this.textContent)
        //get the value of the TD using the API
        console.log('value by API : ', table.cell({ row: this.parentNode.rowIndex, column : this.cellIndex }).data());
    })


	}

	/**** Helper functions to highlight and select data **************/
	function highlight(row, on_off) {
		if(typeof on_off === 'undefined'){
			// if on_off is not provided, just toggle class.
			on_off = !d3.select(row).classed('highlight');
		}
		// Set the row's class as highlighted if on==true,
		// Otherwise remove the 'highlighted' class attribute.
		// In DataTables, this is handled automatically for us.
		d3.select(row).classed('highlight', on_off);

		// Fire a highlight event, with the data and highlight status.
		dispatcher.call("highlight", this, table.rows(row).data()[0], on_off);
	}
	function select(row, on_off) {
		// Similar to highlight function.
		if(typeof on_off === 'undefined'){
			on_off = !d3.select(row).classed('selected');
		}

		d3.select(row).classed('selected', on_off);

		// Fire a select event, with the data and selected status.
		dispatcher.call("select", this, table.rows(row).data()[0], on_off);
	}

	_table.on = function() {
    var value = dispatcher.on.apply(dispatcher, arguments);
    return value === dispatcher ? _table : value;
  }

	/**** Setter / getters functions to customize the table plot *****/
	_table.datum = function(_){
    if (!arguments.length) {return data;}
    data = _;

    return _table;
	};
	_table.filterCols = function(_){
    if (!arguments.length) {return filter_cols;}
    filter_cols = _;

    return _table;
	};
	_table.sortBy = function(colname, ascending){
    if (!arguments.length) {return sort_by;}

		sort_by = [];
		sort_by[0] = colname;
		sort_by[1] = ascending ? 'asc': 'desc';

    return _table;
	};

	// This is the return of the main function 'makeTable'
	return _table;

}; // end makeTable()
