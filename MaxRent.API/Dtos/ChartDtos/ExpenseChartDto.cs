using System.Collections.Generic;

namespace MaxRent.API.Dtos.ChartDtos
{
    public class ExpenseChartDto
    {
        public string Name { get; set;}
        public double TotalSum { get; set; }
        public List<PieItem> Pie { get; set; }
    }
    public class PieItem {
        public string Title { get; set; }
        public double Value { get; set; }
    }
}