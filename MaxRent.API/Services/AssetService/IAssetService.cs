using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Dtos;
using MaxRent.API.Dtos.AssetDtos;
using MaxRent.API.Helpers;
using MaxRent.API.Models;

namespace MaxRent.API.Services.AssetService
{
    public interface IAssetService
    {
     Task<bool> SaveAll();
     Task<PagedList<AssetForAdminListViewDto>> GetAllAssetsWithPagination(UserParams userParams);
     Task<PagedList<OrderForAssetDetailDto>> GetAssetOrders(int assetId, UserParams userParams);
     Task<AssetForDetailDto> GetAssetForDetail(int id);
     Task<List<Expense>> GetAssetExpenses(int id);
     Task DeleteAsset(int id);
     Task<Asset> GetAssetById(int id);
     Task<List<AssetForAdminListViewDto>> GetAllProductAssets(int productId);
     Task<List<AssetForProfitChart>> GetAssetsForProfitChart(); 

    }
}