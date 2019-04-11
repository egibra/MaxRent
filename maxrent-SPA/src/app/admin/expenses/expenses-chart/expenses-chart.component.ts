import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../../_services/expenses/expenses.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component ({
  selector: 'app-expenses-chart',
  templateUrl: './expenses-chart.component.html',
  styleUrls: ['./expenses-chart.component.scss']
})
export class ExpensesChartComponent implements OnInit {

  constructor(private _expensesService: ExpensesService) { }
  data: any;

  ngOnInit() {


    // Create chart instance
    const chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    // Add data
    this._expensesService.getExpensesForChart().subscribe((response: any) => {
      chart.data = response;
   });
    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.renderer.grid.template.disabled = true;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Išleista, €';
    valueAxis.min = 0;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.grid.template.strokeOpacity = 0.07;

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'totalSum';
    series.dataFields.categoryX = 'name';
    series.tooltip.pointerOrientation = 'vertical';


    const columnTemplate = series.columns.template;
    // add tooltip on column, not template, so that slices could also have tooltip
    columnTemplate.column.tooltipText = 'Įranga: {name}\n Iš viso išleista: {valueY} €';
    columnTemplate.column.tooltipY = 0;
    columnTemplate.column.cornerRadiusTopLeft = 20;
    columnTemplate.column.cornerRadiusTopRight = 20;
    columnTemplate.strokeOpacity = 0;


    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    columnTemplate.adapter.add('fill', (fill, target) => {
      const color = chart.colors.getIndex(target.dataItem.index * 3);
      return color;
    });

    // create pie chart as a column child
    const pieChart = series.columns.template.createChild(am4charts.PieChart);
    pieChart.width = am4core.percent(80);
    pieChart.height = am4core.percent(80);
    pieChart.align = 'center';
    pieChart.valign = 'middle';
    pieChart.dataFields.data = 'pie';

    const pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'title';
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;
    pieSeries.slices.template.stroke = am4core.color('#ffffff');
    pieSeries.slices.template.strokeWidth = 1;
    pieSeries.slices.template.strokeOpacity = 0;

    pieSeries.slices.template.adapter.add('fill', (fill, target) => {
      return am4core.color('#ffffff');
    });

    pieSeries.slices.template.adapter.add('fillOpacity', (fillOpacity, target) => {
      return (target.dataItem.index + 1) * 0.2;
    });

    pieSeries.hiddenState.properties.startAngle = -90;
    pieSeries.hiddenState.properties.endAngle = 270;
  }

}
