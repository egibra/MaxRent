using AutoMapper;
using MaxRent.API.Dtos;
using MaxRent.API.Models;

namespace MaxRent.API.Helpers
{
public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
            CreateMap<User, UserForRegisterDto>();
            CreateMap<UserForDetailedDto, User>();
        }
    }
}