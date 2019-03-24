using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Helpers;
using MaxRent.API.Models;

namespace MaxRent.API.Data.ProductRepository
{
    public interface IProductRepository
    {
        Task<Product> AddProduct(Product product);
        Task<ICollection<Product>> GetAllProducts();
        Task<PagedList<Product>> GetAllProductsWithPagination(UserParams userParams);
        Task<ICollection<Product>> GetProductsByGroupCode(string groupCode);
        Task<Product> GetProduct(int id);
        Task DeleteProduct(int id);
        Task AddProductPhoto(ProductPhoto photo);
        Task<bool> SaveAll();

    }
}