import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { AssetsService } from 'src/app/_services/assets/assets.service';

@Component ({
  selector: 'app-profit-chart',
  templateUrl: './profit-chart.component.html',
  styleUrls: ['./profit-chart.component.scss']
})
export class ProfitChartComponent implements OnInit {

  constructor(private _assetsService: AssetsService) { }

  ngOnInit() {
    const chart = am4core.create('chartdiv', am4charts.XYChart);
chart.scrollbarX = new am4core.Scrollbar();

  this._assetsService.getAssetsForProfitChart().subscribe((response: any) => {
    chart.data = response;
  });
// Create axes
const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = 'name';
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 30;
categoryAxis.renderer.labels.template.horizontalCenter = 'right';
categoryAxis.renderer.labels.template.verticalCenter = 'middle';
categoryAxis.renderer.labels.template.rotation = 270;
categoryAxis.tooltip.disabled = true;
categoryAxis.renderer.minHeight = 110;

const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.minWidth = 50;

// Create series
const series = chart.series.push(new am4charts.ColumnSeries());
series.sequencedInterpolation = true;
series.dataFields.valueY = 'sum';
series.dataFields.categoryX = 'name';
series.tooltipText = '[{categoryX}: bold]{valueY}[/]';
series.columns.template.strokeWidth = 0;

series.tooltip.pointerOrientation = 'vertical';

series.columns.template.column.cornerRadiusTopLeft = 10;
series.columns.template.column.cornerRadiusTopRight = 10;
series.columns.template.column.fillOpacity = 0.8;

// on hover, make corner radiuses bigger
const hoverState = series.columns.template.column.states.create('hover');
hoverState.properties.cornerRadiusTopLeft = 0;
hoverState.properties.cornerRadiusTopRight = 0;
hoverState.properties.fillOpacity = 1;

series.columns.template.adapter.add('fill', (fill, target) => {
  return chart.colors.getIndex(target.dataItem.index);
});

// Cursor
chart.cursor = new am4charts.XYCursor();
  }

}
