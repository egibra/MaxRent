using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MaxRent.API.Data.AssetRepository;
using MaxRent.API.Data.ProductRepository;
using MaxRent.API.Dtos;
using MaxRent.API.Helpers;
using MaxRent.API.Models;
using MaxRent.API.Services.AssetProfitCalculationService;

namespace MaxRent.API.Services.AssetService
{
    public class AssetService : IAssetService
    {
        private readonly IAssetRepository _assetRepository;
        private readonly IAssetProfitCalculationService _assetProfitCalculationService;
        public AssetService(IAssetRepository assetRepository,
         IAssetProfitCalculationService AssetProfitCalculationService )
        {
            _assetRepository = assetRepository;
            _assetProfitCalculationService = AssetProfitCalculationService;
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
        public async Task<PagedList<OrderForAssetDetailDto>> GetAssetOrders(int assetId, UserParams userParams)
        {
           var asset =  await _assetRepository.GetAsset(assetId);

           var assetOrders = new List<OrderForAssetDetailDto>();
            foreach (var orderItemAsset in asset.OrderItemAssets)
            { 
                assetOrders.Add(MapperHelper.getAssetOrderFromOrderItem(orderItemAsset.OrderItem));
            }
            assetOrders = assetOrders.Skip((userParams.PageNumber-1) * userParams.PageSize)
            .Take(userParams.PageSize).ToList();

            var pagedAssetsForAdmin = new PagedList<OrderForAssetDetailDto>
            (assetOrders, asset.OrderItemAssets.Count,
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

        public async Task<AssetForDetailDto> GetAssetForDetail(int id)
        {
            var asset = await _assetRepository.GetAsset(id);
            var assetForDetail = new AssetForDetailDto();
            assetForDetail.AssetId = id;
            assetForDetail.DatePurchased = asset.DatePurchased;
            assetForDetail.PhotoUrl = asset.AssignedProduct.Photos[0].Url;
            assetForDetail.ProductName = asset.AssignedProduct.Name;    
            assetForDetail.AssetCode = asset.AssetCode;
            assetForDetail.InitialPrice = asset.InitialPrice;
            assetForDetail.ExpensesSum =
             _assetProfitCalculationService.GetAssetExpensesSum(asset.Expenses);

            assetForDetail.ProfitSum = 
             _assetProfitCalculationService.GetAssetProfitSum(asset.OrderItemAssets);

            assetForDetail.PayOffPercent = 
             _assetProfitCalculationService.GetAssetPaidOffPercent(assetForDetail.ProfitSum,
              assetForDetail.ExpensesSum, assetForDetail.InitialPrice);

            assetForDetail.IsAdvertismentNeeded = assetForDetail.PayOffPercent < 50;

            return assetForDetail;       
        }

        public async Task<List<AssetForAdminListViewDto>> GetAllProductAssets(int assetId)
        {
            var asset = await _assetRepository.GetAsset(assetId);

            if (asset == null)
                return null;

            var assetsByProductId = await _assetRepository.GetAllProductAssets(asset.ProductId);
            List<AssetForAdminListViewDto> assetsDtoList = new List<AssetForAdminListViewDto>();

            foreach (var assetFromProduct in assetsByProductId)
            {
               assetsDtoList.Add(MapperHelper.GetAssetForAdminListViewDtoFromAsset(assetFromProduct));
            }

            return assetsDtoList;
        }
    }
}