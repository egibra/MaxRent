using System;
using System.Collections.Generic;

namespace MaxRent.API.Dtos.ExpenseDtos
{
    public class ExpenseForCreationDto
    {
        public string Description { get; set; }
        public int ExpenseType { get; set; }
        public double Amount { get; set; }
        public DateTime ExpenseDate { get; set; }
        public List<int> AssetIds { get; set; }
    }
}