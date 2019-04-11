using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MaxRent.API.Dtos;
using MaxRent.API.Dtos.ExpenseDtos;
using MaxRent.API.Helpers;
using MaxRent.API.Models;
using MaxRent.API.Services.AssetAvailabilityService;
using MaxRent.API.Services.ExpenseService;
using MaxRent.API.Services.OrderService;
using MaxRent.API.Services.ProductService;
using MaxRent.API.Services.UserService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MaxRent.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;
        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }
        [HttpPost("AddExpense")]
        public async Task<IActionResult> AddExpense(ExpenseForCreationDto expenseForCreationDto)
        {
            var success = await _expenseService.AddExpense(expenseForCreationDto);
            if (success)
            {
                return Ok();
            }
            return NotFound();
        }
        [HttpGet("GetExpensesForChart")]
        public async Task<IActionResult> GetExpensesForChart()
        {
            var expenses = await _expenseService.GetExpensesForChart();
            
            return Ok(expenses);
        }

    }
}