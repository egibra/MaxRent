using System.Collections.Generic;
using System.Threading.Tasks;
using MaxRent.API.Helpers;
using MaxRent.API.Models;

namespace MaxRent.API.Services.ProductService
{
    public interface IProductService
    {
     Task<Product> AddProduct(Product product);    
     Task AddProductPhoto(ProductPhoto photo);
     Task<bool> SaveAll();
     Task<ICollection<Product>> GetAllProducts();
     Task<PagedList<Product>> GetAllProductsWithPagination(UserParams userParams);
     Task<ICollection<Product>> GetProductsByGroupCode(string groupCode);
     Task DeleteProduct(int id);
     Task<Product> GetProduct(int id);
    }
}