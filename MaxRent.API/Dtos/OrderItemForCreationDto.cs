using System;
using MaxRent.API.Models;

namespace MaxRent.API.Dtos
{
    public class OrderItemForCreationDto
    {
        public int ProductId { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public double TotalPrice { get; set; }  
        public int AssetsCount { get; set; }
    }
}