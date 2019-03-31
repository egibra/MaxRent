using MaxRent.API.Dtos;
using MaxRent.API.Models;

namespace MaxRent.API.Helpers
{
    public static class MapperHelper
    {
        public static Order GetOrderFromOrderForCreationDto(OrderForCreationDto orderForCreationDto) 
        {
            Order order = new Order();

            return order;
        }
    }
}