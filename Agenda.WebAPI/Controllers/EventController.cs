using System;
using System.Threading.Tasks;
using Agenda.Domain;
using Agenda.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Agenda.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController: ControllerBase
    {
        private readonly IAgendaRepository _repo;

        public EventController(IAgendaRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results =  await _repo.GetAllEvents();

                return Ok(results);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        [HttpGet("{EventId}")]
        public async Task<IActionResult> Get(int EventId)
        {
            try
            {
                var results =  await _repo.GetEventAsyncById(EventId, true);

                return Ok(results);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        [HttpGet("getByDate/{date}")]
        public async Task<IActionResult> Get(DateTime date)
        {
            try
            {
                var results =  await _repo.GetAllEventsAsyncByDate(date, true);

                return Ok(results);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        [HttpGet("getByUserDate/{userId}/{date}")]
        public async Task<IActionResult> GetByUserDate(int userId, DateTime date)
        {
            try
            {
                var results =  await _repo.GetAllEventsAsyncByUserDateToday(userId, date);

                return Ok(results);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        [HttpGet("getByUserDateLater/{userId}/{date}")]
        public async Task<IActionResult> GetByUserDateLater(int userId, DateTime date)
        {
            try
            {
                var results =  await _repo.GetAllEventsAsyncByUserDate(userId, date);

                return Ok(results);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        [HttpGet("getByName/{name}")]
        public async Task<IActionResult> Get(string name)
        {
            try
            {
                var results =  await _repo.GetAllEventsAsyncByName(name, true);

                return Ok(results);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

       /*  [HttpGet("getByType/{type}")]
        public async Task<IActionResult> Get(int type)
        {
            try
            {
                var results =  await _repo.GetAllEventsAsyncByType(type, true);

                return Ok(results);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        } */

        [HttpGet("getByUserId/{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            try
            {
                var results = await _repo.GetAllEventsAsyncByUser(userId);

                return Ok(results);
            }
            catch (System.Exception)
            {
                
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Event model)
        {
            try
            {
                _repo.Add(model);

                if( await _repo.SaveChangesAsync())
                {
                    return Created($"/api/event/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();
        }

        [HttpPut("{EventId}")]
        public async Task<IActionResult> Put(int EventId, Event model)
        {
            try
            {
                var evento = await _repo.GetEventAsyncById(EventId, false);

                if(evento == null) return NotFound();

                _repo.Update(model);

                if( await _repo.SaveChangesAsync())
                {
                    return Created($"/api/event/{model.Id}", model);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();
        }

        [HttpDelete("{EventId}")]
        public async Task<IActionResult> Delete(int EventId)
        {
            try
            {
                var evento = await _repo.GetEventAsyncById(EventId, false);

                if(evento == null) return NotFound();

                _repo.Delete(evento);

                if( await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();
        }

    }
}