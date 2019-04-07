using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MaxRent.API.Data.AssetRepository;
using MaxRent.API.Data.ProductRepository;
using MaxRent.API.Dtos;
using MaxRent.API.Helpers;
using MaxRent.API.Models;

namespace MaxRent.API.Services.AssetService
{
    public class AssetService : IAssetService
    {
        private readonly IAssetRepository _assetRepository;
        public AssetService(IAssetRepository assetRepository)
        {
            _assetRepository = assetRepository;
        }
        public async Task<bool> SaveAll()
        {
          return await _assetRepository.SaveAll();
        }
        public async Task<PagedList<AssetForAdminListViewDto>> GetAllAssetsWithPagination(UserParams userParams)
        {
           var assetsFromRepo =  await _assetRepository.GetAllAssets(userParams);

           var assetsForAdminView = new List<AssetForAdminListViewDto>();
            foreach (var asset in assetsFromRepo)
            { 
                assetsForAdminView.Add(MapperHelper.GetAssetForAdminListViewDtoFromAsset(asset));
            }
            assetsForAdminView = assetsForAdminView.Skip((userParams.PageNumber-1) * userParams.PageSize)
            .Take(userParams.PageSize).ToList();

            var pagedAssetsForAdmin = new PagedList<AssetForAdminListViewDto>
            (assetsForAdminView, assetsFromRepo.Count,
            userParams.PageNumber, userParams.PageSize);

            return pagedAssetsForAdmin;
        }

        public async Task<Asset> GetAssetById(int id)
        {
            var asset = await _assetRepository.GetAsset(id);
            return asset;
        }
        public async Task DeleteAsset(int id)
        {
            await _assetRepository.DeleteAsset(id);
        }
    }
}