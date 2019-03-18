using System.Threading.Tasks;
using MaxRent.API.Models;

namespace MaxRent.API.Services.UserService
{
    public interface IUserService
    {
        Task<User> Login(string username, string password);
        Task<User> Register(User user, string password);
        Task<bool> UserExists(string username);

    }
}