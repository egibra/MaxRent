using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Helpers;
using MaxRent.API.Models;

namespace MaxRent.API.Data.OrderRepository
{
    public interface IOrderRepository
    {
        Task AddOrder(Order order);
        Task<PagedList<Order>> GetAllOrders(UserParams userParams);
        Task<PagedList<Order>> GetAllOrdersWithPagination(UserParams userParams, bool forUser);
        Task<PagedList<Order>> GetOrdersForProduct(int productId, UserParams userParams);
        Task<PagedList<Order>> GetOrdersForUser(UserParams userParams);
        Task<Order> GetOrder(int id);
        Task DeleteOrder(int id);
        Task<bool> SaveAll();
    }
}