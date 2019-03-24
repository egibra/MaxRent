using System.Collections.Generic;

namespace MaxRent.API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ProductCode { get; set; }
        public string GroupCode { get; set; }
        public string Description { get; set; }
        public double InitialPrice { get; set; }
        public double PriceForDay { get; set; }
        public double PriceForWeekend { get; set; }
        public double PriceForWeek { get; set; }
        public string YoutubeUrl { get; set; }
        public ICollection<ProductPhoto> Photos { get; set; }
    }
}