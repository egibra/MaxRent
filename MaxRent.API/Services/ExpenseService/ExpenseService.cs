using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MaxRent.API.Data.AssetRepository;
using MaxRent.API.Data.ExpenseRepository;
using MaxRent.API.Dtos.ChartDtos;
using MaxRent.API.Dtos.ExpenseDtos;
using MaxRent.API.Models;

namespace MaxRent.API.Services.ExpenseService
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _expenseRepository;
        private readonly IAssetRepository _assetRepository;
        public ExpenseService(IExpenseRepository expenseRepository, IAssetRepository assetRepository)
        {
            _expenseRepository = expenseRepository;
            _assetRepository = assetRepository;
        }

        public Task<bool> AddExpense(ExpenseForCreationDto expenseForCreationDto)
        {
            foreach(var assetId in expenseForCreationDto.AssetIds)
            {
                var expense = new Expense();
                expense.AssetId = assetId;
                expense.DateCreated = expenseForCreationDto.ExpenseDate;
                expense.Description = expenseForCreationDto.Description;
                expense.ExpenseType = (ExpenseTypeEnum)expenseForCreationDto.ExpenseType;
                expense.Sum = expenseForCreationDto.Amount / expenseForCreationDto.AssetIds.Count;
                _expenseRepository.AddExpense(expense);
            }
            return _expenseRepository.SaveAll();
        }

        public async Task<List<ExpenseChartDto>> GetExpensesForChart()
        {
            var assets = await _assetRepository.GetAllAssets();
            var expenseChartItems = new List<ExpenseChartDto>();

            foreach(var asset in assets)
            {
                var chartItem = new ExpenseChartDto();
                chartItem.Name = asset.AssetCode;
                chartItem.Pie = new List<PieItem>();

                var pieItemFacebook = new PieItem();
                var pieItemInstagram = new PieItem();
                var pieItemOthers = new PieItem();

                pieItemFacebook.Title = "Facebook";
                pieItemFacebook.Value = asset.Expenses
                .Where(expense => expense.ExpenseType == ExpenseTypeEnum.Facebook).Sum(expense => expense.Sum);
                
                pieItemInstagram.Title = "Instagram";
                pieItemInstagram.Value = asset.Expenses
                .Where(expense => expense.ExpenseType == ExpenseTypeEnum.Instagram).Sum(expense => expense.Sum);

                pieItemOthers.Title = "Kita";
                pieItemOthers.Value = asset.Expenses
                .Where(expense => expense.ExpenseType == ExpenseTypeEnum.Other).Sum(expense => expense.Sum);


                chartItem.TotalSum = pieItemFacebook.Value + pieItemInstagram.Value
                 + pieItemOthers.Value;
                 
                chartItem.Pie.Add(pieItemFacebook);
                chartItem.Pie.Add(pieItemInstagram);
                chartItem.Pie.Add(pieItemOthers);
                if(chartItem.TotalSum > 0)
                    expenseChartItems.Add(chartItem);
            }

            return expenseChartItems;
        }
    }
}