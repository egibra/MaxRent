using System;
using System.Collections.Generic;

namespace MaxRent.API.Dtos
{
    public class AssetForDetailDto
    {
        public int AssetId { get; set; }
        public string ProductName { get; set; }
        public string AssetCode { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DatePurchased { get; set; }
        public double InitialPrice { get; set; }
        public double ExpensesSum { get; set;}
        public double ProfitSum { get; set; }
        public double PayOffPercent { get; set; }
        public bool IsAdvertismentNeeded { get; set; }              
    }
}