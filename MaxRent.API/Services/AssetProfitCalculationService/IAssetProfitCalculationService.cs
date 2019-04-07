using System.Collections.Generic;
using MaxRent.API.Models;

namespace MaxRent.API.Services.AssetProfitCalculationService
{
    public interface IAssetProfitCalculationService
    {
         double GetAssetProfitSum(List<OrderItemAsset> orderItems);
         double GetAssetPaidOffPercent(double profitSum, double expensesSum, double initialPrice);
         double GetAssetExpensesSum(List<Expense> expenses);
    }
}