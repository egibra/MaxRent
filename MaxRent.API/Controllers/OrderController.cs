using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MaxRent.API.Dtos;
using MaxRent.API.Helpers;
using MaxRent.API.Models;
using MaxRent.API.Services.AssetAvailabilityService;
using MaxRent.API.Services.OrderService;
using MaxRent.API.Services.ProductService;
using MaxRent.API.Services.UserService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MaxRent.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ILogger<OrderController> _logger;
        private readonly IOrderService _orderService;
        private readonly IAssetAvailabilityService _assetAvailabilityService;
        private readonly IUserService _userService;
        public OrderController(IOrderService orderService, IMapper mapper, IUserService userService,
         ILogger<OrderController> logger, IAssetAvailabilityService assetAvailabilityService)
        {
            _logger = logger;
            _mapper = mapper;
            _orderService = orderService;
            _assetAvailabilityService = assetAvailabilityService;
            _userService = userService;
        }
        [HttpPost("AddOrder")]
        public async Task<IActionResult> AddOrder(OrderForCreationDto orderForCreationDto)
        {
            var order =  await _orderService.AddOrder(orderForCreationDto);
            if (await _orderService.SaveAll())
            {
                return Ok(order);
            }
            return NotFound();
        }
        
        [HttpGet("GetAvailableAssetsCount")]
        public async Task<IActionResult> GetAvailableAssetsCount([FromQuery]int productId,[FromQuery] DateTime dateFrom,
                [FromQuery]DateTime dateTo)
        {
            var availableAssets = await _assetAvailabilityService.GetAvailableAssetsCount(productId, dateFrom, dateTo);
            return Ok(availableAssets);
        }
        [HttpGet("GetUserOrders")]
        public async Task<IActionResult> GetUserOrders([FromQuery]UserParams userParams)
        {
            var ordersForUser = await _orderService.GetUserOrders(userParams);
            Response.AddPagination(ordersForUser.CurrentPage, ordersForUser.PageSize, 
            ordersForUser.TotalCount, ordersForUser.TotalPages);

            return Ok(ordersForUser);
        }

         [HttpGet("GetOrdersForAdmin")]
        public async Task<IActionResult> GetOrdersForAdmin([FromQuery]UserParams userParams)
        {
            var ordersForAdmin = await _orderService.GetOrdersForAdmin(userParams);
            Response.AddPagination(ordersForAdmin.CurrentPage, ordersForAdmin.PageSize, 
            ordersForAdmin.TotalCount, ordersForAdmin.TotalPages);

            return Ok(ordersForAdmin);
        }

        [HttpPut("UpdateOrderState")]
        public async Task<IActionResult> UpdateOrderState([FromQuery]int id, [FromQuery]int state)
        {
            var order = await _orderService.GetOrderById(id);
            if (order == null)
                return NotFound();

            order.OrderState = (OrderStateEnum)state;
            await _orderService.SaveAll();

            return Ok(order);
        }
    }
}