using System;
using System.Collections.Generic;

namespace MaxRent.API.Dtos
{
    public class OrderItemForUserViewDto
    {
        public int AssetsCount { get; set; }
        public double TotalPrice { get; set; }
        public string ProductName { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}