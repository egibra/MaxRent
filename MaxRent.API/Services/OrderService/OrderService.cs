using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Data.OrderRepository;
using MaxRent.API.Dtos;
using MaxRent.API.Models;
using MaxRent.API.Services.OrderFormattingService;

namespace MaxRent.API.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderFormattingService _orderFormattingService;
        public OrderService(IOrderRepository orderRepository,
                 IOrderFormattingService orderFormattingService)
        {
           _orderRepository = orderRepository;
           _orderFormattingService = orderFormattingService;
        }
        public async Task AddOrder(OrderForCreationDto orderForCreationDto)
        {
            var order = await _orderFormattingService.BuildOrder(orderForCreationDto);
            await _orderRepository.AddOrder(order);
        }

        public async Task<bool> SaveAll()
        {
            return await _orderRepository.SaveAll();
        }
    }
}