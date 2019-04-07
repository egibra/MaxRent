using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Dtos;
using MaxRent.API.Helpers;
using MaxRent.API.Models;

namespace MaxRent.API.Services.AssetService
{
    public interface IAssetService
    {
     Task<bool> SaveAll();
     Task<PagedList<AssetForAdminListViewDto>> GetAllAssetsWithPagination(UserParams userParams);
     Task DeleteAsset(int id);
     Task<Asset> GetAssetById(int id);
    }
}