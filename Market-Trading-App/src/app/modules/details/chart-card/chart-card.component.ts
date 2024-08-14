import { Component, HostListener, Input } from '@angular/core';
import {
  ColorType,
  IChartApi,
  UTCTimestamp,
  createChart,
} from 'lightweight-charts';
import { FormattedHistoricalBar } from '../../../shared/interfaces/bars';
import { Stock } from '../../../shared/interfaces/stock';
import { Data } from '../../../shared/interfaces/data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-card.component.html',
  styleUrl: './chart-card.component.scss',
})
export class ChartCardComponent {
  @Input() historicalBars?: FormattedHistoricalBar[];
  @Input() stockQuote?: Stock;
  @Input() stockData?: Data;
  @Input() logo?: string;

  private chart: IChartApi;
  private initialRange;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createChart(window.innerWidth >= 500);

    let barsLength: number = this.historicalBars.length;
    let chartStart = new Date(this.historicalBars[0].time);
    let chartEnd = new Date(this.historicalBars[barsLength - 1].time);

    let startUtcTimestamp = Math.floor(
      chartStart.getTime() / 1000
    ) as UTCTimestamp;
    let endUtcTimestamp = Math.floor(chartEnd.getTime() / 1000) as UTCTimestamp;

    console.log(startUtcTimestamp, endUtcTimestamp);

    const areaSeries = this.chart.addAreaSeries({
      // lineColor: '#2962FF',
      // topColor: '#2962FF',
      // bottomColor: 'rgba(41, 98, 255, 0.28)',
      lineColor: '#bc2dff',
      topColor: '#bc2dff',
      bottomColor: '#efceff',
    });

    console.log(this.historicalBars);
    areaSeries.setData(this.historicalBars);

    this.initialRange = { from: startUtcTimestamp, to: endUtcTimestamp };

    this.chart.timeScale().setVisibleRange(this.initialRange);

    this.chart.timeScale().subscribeVisibleTimeRangeChange((newRange) => {
      const minDate = new Date(this.initialRange.from as string).getTime();
      const maxDate = new Date(this.initialRange.to as string).getTime();
      const newFrom = new Date(newRange.from as string).getTime();
      const newTo = new Date(newRange.to as string).getTime();

      if (newFrom < minDate || newTo > maxDate) {
        this.chart.timeScale().setVisibleRange(this.initialRange);
      }
    });

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

  private createChart(showPriceScale: boolean): void {
    if (this.chart) {
      this.chart.remove();
    }
    this.chart = createChart(document.getElementById('chart') as HTMLElement, {
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
      rightPriceScale: {
        visible: showPriceScale, // Show or hide the Y-axis based on the parameter
        borderVisible: false,
      },
      leftPriceScale: {
        visible: false, // Hide the Y-axis on the left side (if you are using it)
      },
    });
  }
}
