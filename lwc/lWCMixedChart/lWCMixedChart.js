import { LightningElement, track } from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class LWCMixedChart extends LightningElement {
    @track isChartJsInitialized;
    chart;

    config = {
        type: 'bar',
        data: {
          labels: ["1900", "1950", "1999", "2050"],
          datasets: [{
              label: "Europe",
              type: "line",
              borderColor: "#8e5ea2",
              data: [408,547,675,734],
              fill: false
            }, {
              label: "Africa",
              type: "line",
              borderColor: "#3e95cd",
              data: [133,221,783,2478],
              fill: false
            }, {
              label: "Europe",
              type: "bar",
              backgroundColor: "rgba(0,0,0,0.2)",
              data: [408,547,675,734],
            }, {
              label: "Africa",
              type: "bar",
              backgroundColor: "rgba(0,0,0,0.2)",
              backgroundColorHover: "#3e95cd",
              data: [133,221,783,2478]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Population growth (millions): Europe & Africa'
          },
          legend: { display: false }
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