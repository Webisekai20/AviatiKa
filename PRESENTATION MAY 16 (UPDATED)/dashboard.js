// fetch('https://cdn.jsdelivr.net/npm/chart.js');
// // Sample data with two datasets, each for a different Y-axis
// const data = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//   datasets: [
//     {
//       label: 'Sales',
//       data: [100, 200, 150, 300, 250],
//       borderColor: 'blue',
//       yAxisID: 'y'
//     },
//     {
//       label: 'Revenue',
//       data: [1000, 1500, 1200, 1800, 1600],
//       borderColor: 'green',
//       yAxisID: 'y1'
//     }
//   ]
// };

// // Your provided config object
// const config = {
//   type: 'line',
//   data: data,
//   options: {
//     responsive: true,
//     interaction: {
//       mode: 'index',
//       intersect: false,
//     },
//     stacked: false,
//     plugins: {
//       title: {
//         display: true,
//         text: 'Chart.js Line Chart - Multi Axis'
//       }
//     },
//     scales: {
//       y: {
//         type: 'linear',
//         display: true,
//         position: 'left',
//       },
//       y1: {
//         type: 'linear',
//         display: true,
//         position: 'right',
//         grid: {
//           drawOnChartArea: false,
//         },
//       },
//     }
//   },
// };

// // Render the chart
// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, config);


