using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Dtos;
using MaxRent.API.Helpers;
using MaxRent.API.Models;

namespace MaxRent.API.Services.OrderService
{
    public interface IOrderService
    {
         Task<Order> AddOrder(OrderForCreationDto orderForCreationDto);
         Task<bool> SaveAll();
         Task<PagedList<OrderForUserViewDto>> GetUserOrders(UserParams userParams);
         Task<PagedList<OrderForUserViewDto>> GetOrdersForAdmin(UserParams userParams);
         Task<Order> GetOrderById(int id);
    }
}