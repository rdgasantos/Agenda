using System.Threading.Tasks;
using Agenda.Domain;
using Agenda.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Agenda.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserEventController: ControllerBase
    {
       public readonly IAgendaRepository _repo;
       public UserEventController(IAgendaRepository repo)
       {
            this._repo = repo;
           
       }

       [HttpGet("userId/{UserId}/eventId/{EventId}")]
       public async Task<IActionResult> Get(int UserId, int EventId)
       {
           try
           {
               var results = await _repo.GetUserEventAsyncById(UserId, EventId);

               return Ok(results);
           }
           catch (System.Exception)
           {
               
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                "Banco de Dados Falhou!");
           }
       }

       [HttpPost]
       public async Task<IActionResult> Post(UserEvent model)
       {
           try
           {
               _repo.Add(model);

               if(await _repo.SaveChangesAsync())
               {
                   return Created($"api/userevent/userId/{model.UserId}/eventId/{model.EventId}", model);
               }
           }
           catch (System.Exception)
           {
               
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                "Banco de Dados Falhou!");
           }

           return BadRequest();
       }

       [HttpPut("userId/{UserId}/eventId/{EventId}")]
       public async Task<IActionResult> Put(int UserId, int EventId, UserEvent model)
       {
           try
           {
               var user = await _repo.GetUserEventAsyncById(UserId, EventId);

               if(user == null) return NotFound();

               _repo.Update(model);

               if( await _repo.SaveChangesAsync()){

                   return Created($"api/userevent/userId/{model.UserId}/eventId/{model.EventId}", model);
               }

           }
           catch (System.Exception)
           {
               
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                "Banco de Dados Falhou!");
           }

           return BadRequest();
       }

       [HttpDelete(("userId/{UserId}/eventId/{EventId}"))]
       public async Task<IActionResult> Delete(int UserId, int EventId)
       {
           try
           {
               var user = await _repo.GetUserEventAsyncById(UserId, EventId);

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