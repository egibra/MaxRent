using System.Threading.Tasks;
using MaxRent.API.Dtos;
using MaxRent.API.Models;

namespace MaxRent.API.Services.OrderFormattingService
{
    public interface IOrderFormattingService
    {
         Task<Order> BuildOrder(OrderForCreationDto orderForCreationDto);
    }
}