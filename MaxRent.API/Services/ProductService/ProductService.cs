using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Data.ProductRepository;
using MaxRent.API.Helpers;
using MaxRent.API.Models;

namespace MaxRent.API.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public async Task<Product> AddProduct(Product product)
        {
            return await _productRepository.AddProduct(product);
        }

        public async Task AddProductPhoto(ProductPhoto photo)
        {
             await _productRepository.AddProductPhoto(photo);
        }

        public async Task<bool> SaveAll()
        {
          return await _productRepository.SaveAll();
        }
        public async Task<ICollection<Product>> GetAllProducts()
        {
            return await _productRepository.GetAllProducts();
        }

        public async Task<PagedList<Product>> GetAllProductsWithPagination(UserParams userParams)
        {
           return await _productRepository.GetAllProductsWithPagination(userParams);
        }

        public async Task<ICollection<Product>> GetProductsByGroupCode(string groupCode)
        {
            return await _productRepository.GetProductsByGroupCode(groupCode);
        }
        public async Task<Product> GetProduct(int id)
        {
            var product = await _productRepository.GetProduct(id);
            return product;
        }
        public async Task DeleteProduct(int id)
        {
            await _productRepository.DeleteProduct(id);
        }
    }
}