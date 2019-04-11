using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Helpers;
using MaxRent.API.Models;

namespace MaxRent.API.Data.AssetRepository
{
    public interface IAssetRepository
    {
        Task<List<Asset>> GetAllAssets();
        Task<List<Asset>> GetAllProductAssets(int productId);
        Task<Asset> GetAsset(int id);
        Task DeleteAsset(int id);
        Task<bool> SaveAll();

    }
}