using System.Threading.Tasks;
using MaxRent.API.Models;

namespace MaxRent.API.Data.ExpenseRepository
{
    public interface IExpenseRepository
    {
        Task AddExpense(Expense expense);
        Task<bool> SaveAll();
         
    }
}