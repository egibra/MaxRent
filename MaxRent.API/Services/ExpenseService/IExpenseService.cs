using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Dtos.ChartDtos;
using MaxRent.API.Dtos.ExpenseDtos;

namespace MaxRent.API.Services.ExpenseService
{
    public interface IExpenseService
    {
         Task<bool> AddExpense(ExpenseForCreationDto expenseForCreationDto);
         Task<List<ExpenseChartDto>> GetExpensesForChart();
    }
}