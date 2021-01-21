using System.Threading.Tasks;
using Agenda.Domain;
using Agenda.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Agenda.WebAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase
    {
       public readonly IAgendaRepository _repo;

       public UserController(IAgendaRepository repo)
       {
            this._repo = repo;
           
       }

       [HttpGet("{UserId}")]
       public async Task<IActionResult> Get(int UserId)
       {
           try
           {
               var results = await _repo.GetUserAsyncById(UserId, true);

               return Ok(results);
           }
           catch (System.Exception)
           {
               
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                "Banco de Dados Falhou!");
           }
       }

       [HttpPost]
       public async Task<IActionResult> Post(User model)
       {
           try
           {
               _repo.Add(model);

               if(await _repo.SaveChangesAsync())
               {
                   return Created($"api/user/{model.Id}", model);
               }
           }
           catch (System.Exception)
           {
               
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                "Banco de Dados Falhou!");
           }

           return BadRequest();
       }

       [HttpPut("{UserId}")]
       public async Task<IActionResult> Put(int UserId, User model)
       {
           try
           {
               var user = await _repo.GetUserAsyncById(UserId, false);

               if(user == null) return NotFound();

               _repo.Update(model);

               if( await _repo.SaveChangesAsync()){

                   return Created($"api/user/{model.Id}", model);
               }

           }
           catch (System.Exception)
           {
               
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                "Banco de Dados Falhou!");
           }

           return BadRequest();
       }

       [HttpDelete("{UserId}")]
       public async Task<IActionResult> Delete(int UserId)
       {
           try
           {
               var user = await _repo.GetUserAsyncById(UserId, false);

               if(user == null) return NotFound();

               _repo.Delete(user);

               if( await _repo.SaveChangesAsync()){

                   return Ok();
               }
           }
           catch (System.Exception)
           {
               
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                "Banco de Dados Falhou!");
           }

           return BadRequest();
       }


    }
}