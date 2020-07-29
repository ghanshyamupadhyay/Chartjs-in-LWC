import { LightningElement, track } from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class LWCBubbleChart extends LightningElement {
    @track isChartJsInitialized;
    chart;

    config = {
        type: 'bubble',
        data: {
          labels: "Africa",
          datasets: [
            {
              label: ["China"],
              backgroundColor: "rgba(255,221,50,0.2)",
              borderColor: "rgba(255,221,50,1)",
              data: [{
                x: 21269017,
                y: 5.245,
                r: 15
              }]
            }, {
              label: ["Denmark"],
              backgroundColor: "rgba(60,186,159,0.2)",
              borderColor: "rgba(60,186,159,1)",
              data: [{
                x: 258702,
                y: 7.526,
                r: 10
              }]
            }, {
              label: ["Germany"],
              backgroundColor: "rgba(0,0,0,0.2)",
              borderColor: "#000",
              data: [{
                x: 3979083,
                y: 6.994,
                r: 15
              }]
            }, {
              label: ["Japan"],
              backgroundColor: "rgba(193,46,12,0.2)",
              borderColor: "rgba(193,46,12,1)",
              data: [{
                x: 4931877,
                y: 5.921,
                r: 15
              }]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Predicted world population (millions) in 2050'
          }, scales: {
            yAxes: [{ 
              scaleLabel: {
                display: true,
                labelString: "Happiness"
              }
            }],
            xAxes: [{ 
              scaleLabel: {
                display: true,
                labelString: "GDP (PPP)"
              }
            }]
          }
        }
    };

    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;

        Promise.all([
            loadScript(this, chartjs)
        ]).then(() => {
            const ctx = this.template.querySelector('canvas.chartplot').getContext('2d');
            this.chart = new window.Chart(ctx, this.config);
            this.chart.canvas.parentNode.style.height = '100%';
            this.chart.canvas.parentNode.style.width = '100%';
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading ChartJS',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
    }
}