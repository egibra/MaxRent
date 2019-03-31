using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Dtos;
using MaxRent.API.Models;
using MaxRent.API.Services.AssetAvailabilityService;

namespace MaxRent.API.Services.OrderItemFormattingService
{
    public class OrderItemFormattingService : IOrderItemFormattingService
    {
        private readonly IAssetAvailabilityService _assetAvailabilityService;
        public OrderItemFormattingService(IAssetAvailabilityService assetAvailabilityService)
        {
            _assetAvailabilityService = assetAvailabilityService;

        }
        public async Task<OrderItem> BuildOrderItem(OrderItemForCreationDto orderItemDto)
        {
            var orderItem = new OrderItem();
            orderItem.DateFrom = orderItemDto.DateFrom;
            orderItem.DateTo = orderItemDto.DateTo;
            orderItem.TotalPrice = orderItemDto.TotalPrice;
            orderItem.OrderItemAssets = new List<OrderItemAsset>();
            var availableAssets = await _assetAvailabilityService
            .GetAvailableAssetsByProductId(orderItemDto.ProductId, orderItemDto.AssetsCount,
                orderItemDto.DateFrom, orderItemDto.DateTo);
            
            foreach (var asset in availableAssets)
            {
                OrderItemAsset orderItemAsset = new OrderItemAsset();
                orderItemAsset.AssetId = asset.Id;
                orderItemAsset.OrderItemId = orderItem.Id;
                orderItem.OrderItemAssets.Add(orderItemAsset);
            }
            return orderItem;
        }
    }
}