import { Component, Input } from '@angular/core';
import { ColorType, IChartApi, createChart } from 'lightweight-charts';
import { HistoricalBars } from '../../../shared/interfaces/bars';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
})
export class ChartCardComponent {
  @Input() HistoricalBars?: HistoricalBars;

  private chart: IChartApi;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.chart = createChart(document.getElementById('chart') as HTMLElement, {
      // width: 600,
      // height: 300,
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
        textColor: '#333',
      },
      grid: {
        vertLines: {
          color: '#eee',
        },
        horzLines: {
          color: '#eee',
        },
      },
    });

    const areaSeries = this.chart.addAreaSeries({
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    });

    areaSeries.setData([
      { time: '2018-12-22', value: 32.51 },
      { time: '2018-12-23', value: 31.11 },
      { time: '2018-12-24', value: 27.02 },
      { time: '2018-12-25', value: 27.32 },
      { time: '2018-12-26', value: 25.17 },
      { time: '2018-12-27', value: 28.89 },
      { time: '2018-12-28', value: 25.46 },
      { time: '2018-12-29', value: 23.92 },
      { time: '2018-12-30', value: 22.68 },
      { time: '2018-12-31', value: 22.67 },
    ]);

    // const lineSeries = this.chart.addLineSeries();

    // const data: LineData[] = [
    //   { time: '2023-01-01', value: 110 },
    //   { time: '2023-01-02', value: 120 },
    //   { time: '2023-01-03', value: 125 },
    //   { time: '2023-01-04', value: 130 },
    //   { time: '2023-01-05', value: 115 },
    // ];

    // lineSeries.setData(data);
  }
}
