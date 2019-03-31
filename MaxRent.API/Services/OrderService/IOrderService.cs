using System.Threading.Tasks;
using MaxRent.API.Dtos;
using MaxRent.API.Models;

namespace MaxRent.API.Services.OrderService
{
    public interface IOrderService
    {
         Task<Order> AddOrder(OrderForCreationDto orderForCreationDto);
         Task<bool> SaveAll();

    }
}