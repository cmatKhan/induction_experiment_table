/*
 * Root file that handles instances of all the charts and loads the visualization
 */
(function(){
    var instance = null;

    /**
     * Creates instances for every chart (classes created to handle each chart;
     * the classes are defined in the respective javascript files.
     */
    function init() {
        //Creating instances for each visualization
        var sampleDetail = new SampleDetail();
        var replicateSetTable = new ReplicateSetTable(sampleDetail);
        var tallyTable = new TallyTable(replicateSetTable);

        tallyTable.update();
        // absMedEvDist.update();
        // scatter.update();
    } // end init()

    /**
     *
     * @constructor
     */
    function Main(){
        if(instance  !== null){
            throw new Error("Cannot instantiate more than one Class");
        }
    }

    /**
     *
     * @returns {Main singleton class |*}
     */
    Main.getInstance = function(){
        var self = this
        if(self.instance == null){
            self.instance = new Main();

            //called only once when the class is initialized
            init();
        }
        return instance;
    }

    Main.getInstance();
})();
