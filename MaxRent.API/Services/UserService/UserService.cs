using System.Threading.Tasks;
using MaxRent.API.Data.AuthRepository;
using MaxRent.API.Models;

namespace MaxRent.API.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IAuthRepository _authRepository;
        public UserService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;

        }
        public async Task<User> Login(string username, string password)
        {
            return await _authRepository.Login(username, password);
        }
        public async Task<User> Register(User user, string password)
        {
            return await _authRepository.Register(user, password);
        }

        public Task<bool> UserExists(string username)
        {
            return _authRepository.UserExists(username);
        }
    }
}