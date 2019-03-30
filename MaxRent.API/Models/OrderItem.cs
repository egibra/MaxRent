using System;
using System.Collections.Generic;

namespace MaxRent.API.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public double TotalPrice { get; set; }
        public ICollection<OrderItemAsset> OrderItemAssets { get; set; }
        public Order Order { get; set; }
        public int OrderId { get; set; }
    }
}