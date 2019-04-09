using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MaxRent.API.Helpers;
using MaxRent.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MaxRent.API.Data.AssetRepository
{
    public class AssetRepository : IAssetRepository
    {
        private readonly DataContext _dataContext;
        public AssetRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task DeleteAsset(int id)
        {
            var asset = await _dataContext.Assets.FirstOrDefaultAsync(p => p.Id == id);
            _dataContext.Assets.Remove(asset);
        }
        public async Task<List<Asset>> GetAllAssets(UserParams userParams)
        {
            var assets =await _dataContext.Assets
            .Include(p => p.AssignedProduct)
            .ThenInclude(p => p.Photos).OrderByDescending(a => a.AssignedProduct.Name)
            .ThenBy(a => a.AssetCode).ToListAsync();

            return assets;
        }

        public async Task<List<Asset>> GetAllProductAssets(int productId)
        {
            var assets = await _dataContext.Assets
            .Where(asset => asset.ProductId == productId).ToListAsync();

            return assets;
        }

        public async Task<Asset> GetAsset(int id)
        {
            var asset = await _dataContext.Assets
            .Include(a => a.AssignedProduct)
            .ThenInclude(product => product.Photos)
            .Include(a => a.OrderItemAssets)
            .ThenInclude(orderItems => orderItems.OrderItem)
            .ThenInclude(orderitem => orderitem.Order)
            .ThenInclude(order => order.Customer)
            .Include(a => a.Expenses)
            .FirstOrDefaultAsync(p => p.Id == id);
            
            return asset;
        }
        public async Task<bool> SaveAll()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}