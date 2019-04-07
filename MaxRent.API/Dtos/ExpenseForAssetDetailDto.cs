using System;

namespace MaxRent.API.Dtos
{
    public class ExpenseForAssetDetailDto
    {
        public DateTime DateCreated { get; set; }
        public string ExpenseType { get; set; }
        public double Amount { get; set; }
    }
}