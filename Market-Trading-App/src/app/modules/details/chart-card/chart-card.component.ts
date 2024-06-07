import { Component, Input } from '@angular/core';
import {
  ColorType,
  IChartApi,
  UTCTimestamp,
  createChart,
} from 'lightweight-charts';
import { FormattedHistoricalBar } from '../../../shared/interfaces/bars';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
})
export class ChartCardComponent {
  @Input() historicalBars?: FormattedHistoricalBar[];

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

    let barsLength: number = this.historicalBars.length;
    let chartStart = new Date(this.historicalBars[0].time);
    let chartEnd = new Date(this.historicalBars[barsLength - 1].time);

    let startUtcTimestamp = Math.floor(
      chartStart.getTime() / 1000
    ) as UTCTimestamp;
    let endUtcTimestamp = Math.floor(chartEnd.getTime() / 1000) as UTCTimestamp;

    console.log(startUtcTimestamp, endUtcTimestamp);

    const areaSeries = this.chart.addAreaSeries({
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    });

    console.log(this.historicalBars);
    areaSeries.setData(this.historicalBars);

    this.chart
      .timeScale()
      .setVisibleRange({ from: startUtcTimestamp, to: endUtcTimestamp });

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
