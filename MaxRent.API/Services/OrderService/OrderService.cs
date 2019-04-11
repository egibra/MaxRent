using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MaxRent.API.Data.OrderRepository;
using MaxRent.API.Dtos;
using MaxRent.API.Helpers;
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
        public async Task<Order> AddOrder(OrderForCreationDto orderForCreationDto)
        {
            var order = await _orderFormattingService.BuildOrder(orderForCreationDto);
            await _orderRepository.AddOrder(order);

            return order;
        }

        public async Task<PagedList<OrderForUserViewDto>> GetUserOrders(UserParams userParams)
        {
            var orders = await _orderRepository.GetOrdersForUser(userParams);
            var ordersForUser = new List<OrderForUserViewDto>();
            foreach (var order in orders)
            { 
                ordersForUser.Add(MapperHelper.GetOrderForUserViewFromOrder(order));
            }
            ordersForUser = ordersForUser.Skip((userParams.PageNumber-1) * userParams.PageSize)
            .Take(userParams.PageSize).ToList();
            var pagedOrdersForUser = new PagedList<OrderForUserViewDto>(ordersForUser, orders.Count,
            userParams.PageNumber, userParams.PageSize);
            
            return pagedOrdersForUser;
        }
        public async Task<PagedList<OrderForUserViewDto>> GetOrdersForAdmin(UserParams userParams)
        {
            var orders = await _orderRepository.GetOrdersForAdmin(userParams);
            var ordersForAdmin = new List<OrderForUserViewDto>();
            foreach (var order in orders)
            { 
                ordersForAdmin.Add(MapperHelper.GetOrderForUserViewFromOrder(order));
            }
            ordersForAdmin = ordersForAdmin.Skip((userParams.PageNumber-1) * userParams.PageSize)
            .Take(userParams.PageSize).ToList();
            var pagedOrdersForAdmin = new PagedList<OrderForUserViewDto>(ordersForAdmin, orders.Count,
            userParams.PageNumber, userParams.PageSize);
            
            return pagedOrdersForAdmin;
        }

        public async Task<bool> SaveAll()
        {
            return await _orderRepository.SaveAll();
        }

        public async Task<Order> GetOrderById(int id)
        {
            return await _orderRepository.GetOrderById(id);
        }
    }
}