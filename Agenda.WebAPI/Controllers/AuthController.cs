using System.Threading.Tasks;
using Agenda.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Agenda.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        public readonly IAgendaRepository _repo;

        public AuthController(IAgendaRepository repo)
        {
            _repo = repo;
            
        }
        
        [HttpGet("{email}/{password}")]
        public async Task<IActionResult> Get(string email, string password)
        {
            try
            {
                var auth = await _repo.GetAuthenticateUser(email, password);

                if(auth == null){
                    return NotFound();
                }
                return Ok(auth);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

        }
    }
}