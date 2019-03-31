using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MaxRent.API.Helpers;
using MaxRent.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MaxRent.API.Data.OrderRepository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _dataContext;
        public OrderRepository(DataContext dataContext)
        {
            _dataContext = dataContext;

        }
        public async Task AddOrder(Order order)
        {
            await _dataContext.Orders.AddAsync(order);
        }

        public async Task DeleteOrder(int id)
        {
            var order = await _dataContext.Orders.FirstOrDefaultAsync(p => p.Id == id);
            _dataContext.Orders.Remove(order);
        }

        public async Task<PagedList<Order>> GetAllOrders(UserParams userParams)
        {
           var orders = _dataContext.Orders.Include(p => p.OrderItems);

           return await PagedList<Order>.CreateAsync(orders, userParams.PageNumber, userParams.PageSize);
         }

        public async Task<PagedList<Order>> GetAllOrdersWithPagination(UserParams userParams, bool forUser)
        {
            var orders = forUser ? _dataContext.Orders
            .Where(order => order.UserId == userParams.UserId)
            .Include(order => order.OrderItems) :
            _dataContext.Orders.Include(p => p.OrderItems);

            return await PagedList<Order>.CreateAsync(orders, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<Order> GetOrder(int id)
        {
            var order = await _dataContext.Orders.Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id);

            return order;       
        }

        public async Task<PagedList<Order>> GetOrdersForProduct(int productId, UserParams userParams)
        {
            var ordersForProduct = _dataContext.Orders
            .Where(order => order.OrderItems
            .FirstOrDefault(o => o.OrderItemAssets.
            FirstOrDefault(asset => asset.Asset.ProductId == productId) != null) != null)
            .Include(order => order.OrderItems);

            return await PagedList<Order>.CreateAsync(ordersForProduct, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}