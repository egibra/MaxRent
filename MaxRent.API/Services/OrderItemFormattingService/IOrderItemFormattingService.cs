using System.Threading.Tasks;
using MaxRent.API.Dtos;
using MaxRent.API.Models;

namespace MaxRent.API.Services.OrderItemFormattingService
{
    public interface IOrderItemFormattingService
    {
         Task<OrderItem> BuildOrderItem(OrderItemForCreationDto orderItemForCreationDto);
    }
}