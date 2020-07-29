import { LightningElement, track } from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class LWCChartJsMixedChartStepScatterPlot extends LightningElement {
    @track isChartJsInitialized;
    chart;

    config = {
        type: 'line',
        data: {
            labels: ['10', '100', '1000', '1000'],
            datasets: [
                        {
                            type: 'line',
                            fill: false,
                            label: 'Line Dataset',
                            data: [50, 40, 30, 20],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)'
                            ],
                            pointBackgroundColor: 'rgba(255, 99, 132, 0.2)',
                            pointBorderColor: 'rgba(255, 99, 132, 1)',
                            steppedLine: true
                        },
                        {
                            type: 'scatter',
                            label: 'Scatter Plot',
                            data: [10, 20, 30, 40]
                        }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Line with Scatter plot'
            },
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
            const ctx = this.template.querySelector('canvas.linescatterplotchart').getContext('2d');
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