using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MaxRent.API.Data.ProductRepository;
using MaxRent.API.Models;

namespace MaxRent.API.Services.AssetAvailabilityService
{
    public class AssetAvailabilityService : IAssetAvailabilityService
    {
        private readonly IProductRepository _productRepository;
        public AssetAvailabilityService(IProductRepository productRepository)
        {
            _productRepository = productRepository;

        }

        public async Task<List<Asset>> GetAvailableAssetsByProductId(int productId, int assetsCount, DateTime dateFrom, DateTime dateTo)
        {
            var product = await _productRepository.GetProduct(productId);
            List<Asset> availableAssets = new List<Asset>();
            foreach(var asset in product.Assets)
            {
                var canAddAsset = true;
                if (asset.OrderItemAssets != null)
                {
                    var orderItemAssets = asset.OrderItemAssets
                    .Where(orderItem => orderItem.OrderItem.Order.OrderState == OrderStateEnum.Accepted).ToList();

                    foreach (var orderItemAsset in orderItemAssets)
                    {
                        if (orderItemAsset.OrderItem.DateFrom <= dateTo
                        && orderItemAsset.OrderItem.DateTo >= dateFrom)
                        {
                            canAddAsset = false;
                            break;
                        }
                    }
                }
                if (canAddAsset)
                {
                    availableAssets.Add(asset);
                    assetsCount--;
                }
                if (assetsCount == 0)
                    break;
            }
            return availableAssets;
        }

        public async Task<int> GetAvailableAssetsCount(int productId, DateTime dateFrom, DateTime dateTo)
        {
            var product = await _productRepository.GetProduct(productId);
            List<Asset> availableAssets = new List<Asset>();
            foreach(var asset in product.Assets)
            {
                var canAddAsset = true;
                if (asset.OrderItemAssets != null)
                {
                    var orderItemAssets = asset.OrderItemAssets
                    .Where(orderItem => orderItem.OrderItem.Order.OrderState == OrderStateEnum.Accepted).ToList();

                    foreach (var orderItemAsset in orderItemAssets)
                    {
                        if (orderItemAsset.OrderItem.DateFrom <= dateTo
                        && orderItemAsset.OrderItem.DateTo >= dateFrom)
                        {
                            canAddAsset = false;
                            break;
                        }
                    }
                }
                if (canAddAsset)
                    availableAssets.Add(asset);
            }

            return availableAssets.Count;
        }
    }
}