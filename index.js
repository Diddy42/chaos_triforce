var x_points = [];
var y_points = [];

var p_layout = {
    xaxis: {range: [-1, 51]},
    yaxis: {range: [-1, 51]}
};

function on_start(){
    var chart = document.getElementById('chart');

    var data = [{
        x: [],
        y: [],
        mode: 'markers'
      }];

    Plotly.newPlot(chart, data, p_layout);
}

function plot_next_point(){
    var last_x = x_points[x_points.length - 1];
    var last_y = y_points[y_points.length - 1];

    var r = Math.floor(Math.random() * 3);

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
        draw_point(Math.floor(Math.random() * 50), Math.floor(Math.random() * 50));
    }
}
