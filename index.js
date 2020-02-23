var x_points = [];
var y_points = [];

var chart_size = 50;

var p_layout = {
    xaxis: {range: [-1, chart_size+1]},
    yaxis: {range: [-1, chart_size+1]}
};

function reset_chart(){
    var chart = document.getElementById('chart');

    var data = [{
        x: [],
        y: [],
        mode: 'markers'
      }];

    Plotly.newPlot(chart, data, p_layout);

    x_points = [];
    y_points = [];
}

function on_start(){
    reset_chart();
}

function plot_next_point(){
    var last_x = x_points[x_points.length - 1];
    var last_y = y_points[y_points.length - 1];

    n_of_starting_points = document.getElementById("form1").elements[0].value;

    var r = Math.floor(Math.random() * n_of_starting_points);

    var target_x = x_points[r];
    var target_y = y_points[r];

    var nx = last_x + (target_x - last_x)/2;
    var ny = last_y + (target_y - last_y)/2;

    draw_point(nx, ny);
}

function plot_the_next_n_points(n){
    var i = 0;

    var interval = setInterval(function() {
        plot_next_point();
        i = i + 1;
        if (i == n){
            clearInterval(interval);
        }
    }, 1);
}

function draw_point(xp, yp){
    x_points.push(xp);
    y_points.push(yp);

    var chart = document.getElementById('chart');

    /*var data = [{
        x: x_points,
        y: y_points,
        mode: 'markers'
      }];

    Plotly.newPlot(chart, data, p_layout);*/

    Plotly.extendTraces(chart, {
        x: [[xp]], y: [[yp]]
      }, [0]);

}

function draw_n_points(n){
    for(i = 0; i < n; i++){
        draw_point(Math.floor(Math.random() * chart_size), Math.floor(Math.random() * chart_size));
    }
}

function draw_n_starting_points(){
    reset_chart();

    n = document.getElementById("form1").elements[0].value;

    draw_n_points(n);
}

function generate_starting_points_form(){
    n = document.getElementById("form1").elements[0].value;

    for(i = 0; i < n; i++){
        var inp = document.createElement("INPUT");
        inp.setAttribute("type", "number");
        inp.setAttribute("name", "x");

        inp = document.createElement("INPUT");
        inp.setAttribute("type", "number");
        inp.setAttribute("name", "y");
    }
}

/*function draw_3_points_on_borders(){
    reset_chart();

    draw_point(0, Math.floor(Math.random() * chart_size));
    draw_point(50, Math.floor(Math.random() * chart_size));
    draw_point(Math.floor(Math.random() * chart_size), 50);
}*/
