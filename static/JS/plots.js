function init() {
    // d3.select() to select dropdown menu, which has an ID of #selDataset.
    // the dropdown menu is assigned var selector.
    var selector = d3.select("#selDataset");
    
    // Samples.json being read by d3.json. All the data is assigned to var data.
    // Inside the data object, the names array (as seen from console.log(data) 
    // contains the ID numbers of study participants. Var sampleNames is assigned
    // to this array. 
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

  // Function declared in plots.js, but not called. It's called by the onchange attribute
  // of the dropdown menu in index.html. Argument name, newSample, refers to the value of the
  // selected menu option. The index.html onchange = optionChanged(this.value) passes the menu 
  // option's value to the optionChanged() function. This function gives the info the argument 
  // name newSample. So this.value and newSample are equivalent. 

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  // Takes a sample (ID number) as argument. ID number passed as sample.
  function buildMetadata(sample) {

    // ds.json pulls in the entire dataset. Once read it refers to data as "data"
    d3.json("samples.json").then((data) => {

      // The metadata array in the dataset (data.metadata) is assigned variable metadata.
      var metadata = data.metadata;

      // Filter method called on metadata to filter for an object in the array whose ID proprey
      // matches the ID number passed into the buildMetadata() as sample. 
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      
      // Because the results of the filter are returned as array, the first item in the array (resultArray[0] is 
      // selected and assigned the variable result. 
      var result = resultArray[0];

      // The ID of the Demographic info panel is sample-metadata. The d3.select() method is used to 
      // select  this <div> and the variable panel is assigned to it
      var PANEL = d3.select("#sample-metadata");

      // Panel.html("") ensures that the contents of the panel are cleared when another ID is chosen  
      PANEL.html("");

      // append and text mothods are chained to append a H6 heading to the panel and print location of
      // volunteer to the panel, respectively. 
      Object.entries(result).forEach(([key,value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
      })
      
    });
  }

