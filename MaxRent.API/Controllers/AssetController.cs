using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MaxRent.API.Dtos;
using MaxRent.API.Helpers;
using MaxRent.API.Models;
using MaxRent.API.Services.AssetService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MaxRent.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController : ControllerBase
    {
        private readonly IAssetService _assetService;
        private readonly IMapper _mapper;
        private readonly ILogger<ProductController> _logger;
        public AssetController(IAssetService assetService, IMapper mapper, ILogger<ProductController> logger)
        {
            _logger = logger;
            _mapper = mapper;
            _assetService = assetService;
        }
      
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAssetById(int id)
        {
            var asset = await _assetService.GetAssetById(id);
            return Ok(asset);
        }
        
        [HttpGet("{id}/GetAssetForDetailView")]
        public async Task<IActionResult> GetAssetForDetailView(int id)
        {
            var asset = await _assetService.GetAssetForDetail(id);
            return Ok(asset);
        }

        [HttpGet("GetAllAssetsWithPagination")]
        public async Task<IActionResult> GetAllAssetsWithPagination([FromQuery]UserParams userParams)
        {
            var paginatedAssets = await _assetService.GetAllAssetsWithPagination(userParams);
            Response.AddPagination(paginatedAssets.CurrentPage, paginatedAssets.PageSize, 
            paginatedAssets.TotalCount, paginatedAssets.TotalPages);

            return Ok(paginatedAssets);
        }

        [HttpGet("{id}/GetAssetOrders")]
        public async Task<IActionResult> GetAssetOrders(int id, [FromQuery]UserParams userParams)
        {
            var paginatedAssetOrders = await _assetService.GetAssetOrders(id, userParams);
            Response.AddPagination(paginatedAssetOrders.CurrentPage, paginatedAssetOrders.PageSize, 
            paginatedAssetOrders.TotalCount, paginatedAssetOrders.TotalPages);

            return Ok(paginatedAssetOrders);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            var product = await _assetService.GetAssetById(id);
            _logger.LogInformation(id.ToString());
            if (product == null)
                return NotFound();

            await _assetService.DeleteAsset(id);
            if(await _assetService.SaveAll())
                return Ok();
            
            return NotFound();
        }
    }
}