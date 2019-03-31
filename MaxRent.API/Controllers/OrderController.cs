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
        public OrderController(IOrderService orderService, IMapper mapper,
         ILogger<OrderController> logger, IAssetAvailabilityService assetAvailabilityService)
        {
            _logger = logger;
            _mapper = mapper;
            _orderService = orderService;
            _assetAvailabilityService = assetAvailabilityService;
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
    }
}