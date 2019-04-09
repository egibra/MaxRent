using System;

namespace MaxRent.API.Dtos
{
    public class OrderForAssetDetailDto
    {
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public string OrderCode { get; set; }
        public string UserName { get; set; }
        public double TotalSum { get; set; }
        public string OrderState { get; set; }
        
    }
}