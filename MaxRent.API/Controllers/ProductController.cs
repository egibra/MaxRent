using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MaxRent.API.Dtos;
using MaxRent.API.Helpers;
using MaxRent.API.Models;
using MaxRent.API.Services.ProductService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MaxRent.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;
        private readonly ILogger<ProductController> _logger;
        public ProductController(IProductService productService, IMapper mapper, ILogger<ProductController> logger)
        {
            _logger = logger;
            _mapper = mapper;
            _productService = productService;
        }
        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct(ProductForCreationDto productForCreationDto)
        {
            var product = _mapper.Map<Product>(productForCreationDto);
            var photo = new ProductPhoto();
            photo.IsMain = true;
            photo.Product = product;
            photo.ProductId = product.Id;
            photo.Url = "https://res.cloudinary.com/dcsly7hhe/image/upload/v1541960122/zykseabi0acbzruvzuqx.jpg";
            await _productService.AddProductPhoto(photo);
            await _productService.AddProduct(product);
            if (await _productService.SaveAll())
            {
                return Ok();
            }
            return NotFound();
        }
        [HttpGet("GetAllProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProducts();
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProduct(id);
            return Ok(product);
        }

        [HttpGet("GetAllProductsWithPagination")]
        public async Task<IActionResult> GetAllProductsWithPagination([FromQuery]UserParams userParams)
        {
            var paginatedProducts = await _productService.GetAllProductsWithPagination(userParams);
            Response.AddPagination(paginatedProducts.CurrentPage, paginatedProducts.PageSize, 
            paginatedProducts.TotalCount, paginatedProducts.TotalPages);
            return Ok(paginatedProducts);
        }
        // [HttpGet("GetProductsByGroupCode")]
        // public async Task<IActionResult> GetProductsByGroupCode([FromQuery]string groupCode)
        // {
        //     var products = await _productService.GetProductsByGroupCode(groupCode);
        //     return Ok(products);
        // }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productService.GetProduct(id);
            _logger.LogInformation(id.ToString());
            if (product == null)
                return NotFound();

            await _productService.DeleteProduct(id);
            if(await _productService.SaveAll())
                return Ok();
            
            return NotFound();
        }
    }
}