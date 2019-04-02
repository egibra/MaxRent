using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Dtos;
using MaxRent.API.Models;
using MaxRent.API.Services.OrderItemFormattingService;

namespace MaxRent.API.Services.OrderFormattingService
{
    public class OrderFormattingService : IOrderFormattingService
    {
        private readonly IOrderItemFormattingService _orderItemFormattingService;
        public OrderFormattingService(IOrderItemFormattingService orderItemFormattingService)
        {
            _orderItemFormattingService = orderItemFormattingService;
        }

        public async Task<Order> BuildOrder(OrderForCreationDto orderForCreationDto)
        {
            var order = new Order();
            order.UserId = orderForCreationDto.UserId;
            order.CustomerName = orderForCreationDto.CustomerName;
            order.CustomerAddress = orderForCreationDto.CustomerAddress;
            order.CustomerNumber = orderForCreationDto.CustomerNumber;
            order.OrderItems = new List<OrderItem>();
            int seed = (int)DateTime.Now.Ticks;
            order.OrderCode = "TRX000" + seed.ToString();
            foreach (var orderItemForCreation in orderForCreationDto.OrderItems)
            {
                var orderItem =  await _orderItemFormattingService
                    .BuildOrderItem(orderItemForCreation);
                
                order.OrderItems.Add(orderItem);
            }
            return order;
        }
    }
}