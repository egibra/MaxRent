using System;
using System.Collections.Generic;

namespace MaxRent.API.Models
{
    public class Asset
    {
        public int Id { get; set; }
        public string AssetCode { get; set; }
        public DateTime DatePurchased { get; set; }
        public int ProductId { get; set; }
        public Product AssignedProduct { get; set; }
        public ICollection<OrderItemAsset> OrderItemAssets { get; set; }
    }
}