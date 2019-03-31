using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MaxRent.API.Helpers;
using MaxRent.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MaxRent.API.Data.ProductRepository
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _dataContext;
        public ProductRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<Product> AddProduct(Product product)
        {
            await _dataContext.Products.AddAsync(product);
            return product;
        }

        public async Task AddProductPhoto(ProductPhoto photo)
        {
            await _dataContext.Photos.AddAsync(photo);
        }

        public async Task DeleteProduct(int id)
        {
            var product = await _dataContext.Products.FirstOrDefaultAsync(p => p.Id == id);
            _dataContext.Products.Remove(product);
        }

        public async Task<ICollection<Product>> GetAllProducts()
        {
            return await _dataContext.Products.Include(p => p.Assets).
            Include(product => product.Photos).ToListAsync();
        }

        public async Task<PagedList<Product>> GetAllProductsWithPagination(UserParams userParams)
        {
            var products = _dataContext.Products.Include(p => p.Assets).Include(p => p.Photos);
            return await PagedList<Product>.CreateAsync(products, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<ICollection<Product>> GetProductsByGroupCode(string groupCode)
        {
            var products = await _dataContext.Products.Include(p => p.Assets)
            .Include(p => p.Photos).Where(product => product.GroupCode == groupCode).ToListAsync();
            return products;
        }
        public async Task<Product> GetProduct(int id)
        {
            var product = await _dataContext.Products.Include(p => p.Photos)
            .Include(p => p.Assets).ThenInclude(asset => asset.OrderItemAssets)
            .ThenInclude(asset => asset.OrderItem).ThenInclude(orderItem => orderItem.Order).FirstOrDefaultAsync(p => p.Id == id);
            return product;
        }
        public async Task<bool> SaveAll()
        {
            return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}