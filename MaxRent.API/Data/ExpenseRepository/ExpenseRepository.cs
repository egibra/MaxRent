using System.Threading.Tasks;
using MaxRent.API.Models;

namespace MaxRent.API.Data.ExpenseRepository
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly DataContext _dataContext;
        public ExpenseRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task AddExpense(Expense expense)
        {
           await _dataContext.Expenses.AddAsync(expense);
        }

        public async Task<bool> SaveAll()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}