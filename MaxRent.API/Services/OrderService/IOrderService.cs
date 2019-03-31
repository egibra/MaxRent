using System.Threading.Tasks;
using MaxRent.API.Dtos;

namespace MaxRent.API.Services.OrderService
{
    public interface IOrderService
    {
         Task AddOrder(OrderForCreationDto orderForCreationDto);
         Task<bool> SaveAll();

    }
}