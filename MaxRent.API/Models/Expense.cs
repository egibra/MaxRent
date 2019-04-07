using System;

namespace MaxRent.API.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public double Sum { get; set; }
        public ExpenseTypeEnum ExpenseType { get; set; }
        public DateTime DateCreated { get; set; }
        public int AssetId { get; set; }
        public Asset Asset { get; set; }
    }
}