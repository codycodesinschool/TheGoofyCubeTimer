let startTime, endTime;
let isRunning = false;

let timeHeader = document.querySelector(".Heading");
let AO5Header = document.querySelector(".ao5");
let times = [];

try {
    if (localStorage.getItem('times').length > 3) {
        try {
            times = localStorage.getItem('times').split(",");

        } catch {
            console.log(localStorage.getItem('times').split(","));
            console.log(
                "times failed to load"
            )

            times = [];
        }
    }
} catch(err) {
    console.log("length error i think")
    console.log(err);
}



addEventListener('keyup', event => {
    key = event.key;
    console.log(key);
    if(key == " ") {
        console.log("space")
        if(isRunning) {
            isRunning = false;
            endTime = new Date();
            let timeDiff = endTime-startTime;
            timeHeader.innerHTML = timeDiff/1000;
            times.push(timeDiff/1000);
            updateSmarts();
        } else {
            startTime = new Date();
            isRunning = true;
        }
    }
});
function updateSmarts() {
    if(times.length >= 5) {
        averages = times.slice(-5);
        means = []
        let worstTime = Infinity;
        let worst;
        let bestTime = 0;
        let best;
        for(let i = 0; i < 5; i++) {
            if(averages[i] < worstTime) {
                worstTime = averages[i];
                worst = i;
            }
            if(averages[i] > bestTime) {
                bestTime = averages[i];
                best = i;
            }
        }
        means = averages;
        means.slice(worst,1);
        means.slice(best,1);
        AO5Header.innerHTML = means.reduce((a,b) => a+b, 0)/3;
        console.log(means.reduce((a,b) => a+b, 0)/3)

    }
    updateGraph();
}
let pChart;

function updateGraph() {
    if(pChart) {
        pChart.destroy();
    }
    const ctx = document.getElementById('timesChart');
    let timeData = [];
    let labelData = []
    for(let i = 0; i < times.length; i++) {
        timeData.push({x:i,y:times[i]}) 
        labelData.push("Solve #" + i)
    }
    const config = {
        type: 'line',
        data: {
            datasets: [{
                data: times,
              }],
            labels:labelData
        },
        options: {
            x: {
                type: 'linear',
                ticks: {
                  stepSize: 1 // remove this line to get autoscalling 
                }
              },
              y: {
                type: 'linear',
                ticks: {
                  stepSize: 1 // remove this line to get autoscalling 
                }
              }
        },
        plugins: []
      }

  pChart = new Chart(ctx, config);
  pChart.canvas.parentNode.style.height = '50%';
  pChart.canvas.parentNode.style.width = '50%';
  localStorage.setItem("times",times.toString())
    console.log("stored")
}

updateGraph();
