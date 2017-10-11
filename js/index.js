var info;
var data;

function MakeChart(data) {
  // console.log(data);
  var svgWidth = $(window).width();
  svgWidth = svgWidth - 30;
  var barWidth = svgWidth / 275;
var height = 420;
  var width = svgWidth;
  var scales = d3.scale
    .linear()
    .domain([0, 18000])
    .range([0, 420]);
  
  //axis
  
  

  
  //console.log(d3.max(oneDarray))
  var converter = function(ymd, amm) {
    var month = ymd.slice(5, 7);
    var year = ymd.toString().slice(0, 4);

    var monthly = {
      "01": "January",
      "02": "Febuary",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    };
    month = monthly[month];
    var done = month + " of " + year;
    done = done + " ~ $" + amm + "0 Billion";
    return done;
  };

  var svg = d3
    .select(".charty")
    .append("svg")
    .attr("height", height)
    .attr("width", width + "px");
  
  
    svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("year", function(d, i) {
      
      return d[0];
    })
    .attr("money", function(d, i) {
      return d[1];
    })
    .attr("class", "bar")
    .attr("height", function(d, i) {
      return scales(d[1]);
    })
    .attr("width", barWidth + "px")
    .attr("x", function(d, i) {
      return (i + 1) * barWidth + barWidth;
    })
    .attr("y", function(d, i) {
      return 420 - scales(d[1]);
    })
    .attr("id", function(d, i) {
      return d[i];
    })
    .append("title")
    .text(function(d) {
      return converter(d[0], d[1]);
    
    });
  $(".bar").on('click', function(e){
     var monthly = {
      "01": "January",
      "02": "Febuary",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    };
    let year = e.target.attributes[0].value;
    let month = year.slice(5, 7);
    year = year.slice(0, 4);
    let ammount = e.target.attributes[1].value;
   
    $("#stats").html(monthly[month] + " of " + year + " The GDP was  $" + ammount + " billion");
});

}
$.getJSON(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  function(response) {
    data = response.data;
 info = data;
    MakeChart(data);
  }
);

var resizeTimer;

$(window).on('resize', function(e) {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
$(".charty").empty();
    MakeChart(data);
    
    
            
  }, 250);

});