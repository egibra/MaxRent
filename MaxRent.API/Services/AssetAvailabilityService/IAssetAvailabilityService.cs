using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Models;

namespace MaxRent.API.Services.AssetAvailabilityService
{
    public interface IAssetAvailabilityService
    {
         Task<List<Asset>> GetAvailableAssetsByProductId(int productId, int assetsCount,
             DateTime dateFrom, DateTime dateTo);
         Task<int> GetAvailableAssetsCount(int productId, DateTime dateFrom, DateTime dateTo);
    }
}