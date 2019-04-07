using System.Collections.Generic;
using MaxRent.API.Models;

namespace MaxRent.API.Services.AssetProfitCalculationService
{
    public class AssetProfitCalculationService : IAssetProfitCalculationService
    {
        public double GetAssetExpensesSum(List<Expense> expenses)
        {
            double sum = 0; 
            foreach (var expense in expenses)
            {
                sum += expense.Sum;
            }
            return sum;
        }

        public double GetAssetPaidOffPercent(double profitSum, double expensesSum, double initialPrice)
        {
            double paidOffPercent = 0;
            var realProfit = profitSum - expensesSum; 
            
            if (realProfit <= 0)
                return 0;
            
            paidOffPercent =100 - ((initialPrice - realProfit) / initialPrice * 100);

            if (paidOffPercent > 100)
                paidOffPercent = 100;
            
            return paidOffPercent;
        }

        public double GetAssetProfitSum(List<OrderItemAsset> orderItems)
        {
            double totalAssetProfit = 0;
            foreach(var orderItem in orderItems)
            {
                totalAssetProfit += orderItem.OrderItem.TotalPrice / orderItem.OrderItem.OrderItemAssets.Count;
            }
            return totalAssetProfit;
        }
    }
}