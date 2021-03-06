using System;
using System.Threading.Tasks;
using Agenda.Domain;

namespace Agenda.Repository
{
    public interface IAgendaRepository
    {
         //Geral
         void Add<T>(T entity) where T: class;
         void Update<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveChangesAsync();
         
         //Eventos
         Task<Event[]> GetAllEvents();
         Task<Event[]> GetAllEventsAsyncByDate(DateTime date, bool includeUsers);
         Task<Event[]> GetAllEventsAsyncByName(string name, bool includeUsers);
         Task<Event[]> GetAllEventsAsyncByType(int type, bool includeUsers);
         Task<Event> GetEventAsyncById(int EventId, bool includeUsers);
         Task<dynamic> GetAllEventsAsyncByUserDateToday(int EventId, DateTime date);
         Task<dynamic> GetAllEventsAsyncByUserDate(int EventId, DateTime date);

         //Usuarios
         Task<User> GetUserAsyncById(int UserId, bool includeEvents);
         Task<User[]> GetAllUsers();
         
         //UsuarioEvento
         Task<UserEvent> GetUserEventAsyncById(int UserId, int EventId) ;
         Task<UserEvent[]> GetAllEventsAsyncByUser(int UserId);

         //Auth
         Task<User> GetAuthenticateUser(string email, string password);



    }
}