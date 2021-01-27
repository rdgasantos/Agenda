using System;
using System.Linq;
using System.Threading.Tasks;
using Agenda.Domain;
using Microsoft.EntityFrameworkCore;

namespace Agenda.Repository
{
    public class AgendaRepository : IAgendaRepository
    {
        private readonly AgendaContext _context;

        public AgendaRepository(AgendaContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
         public async Task<Event[]> GetAllEvents()
        {
            IQueryable<Event> query = _context.Events;

            query = query.AsNoTracking()
            .OrderByDescending(c => c.Data);

            return await query.ToArrayAsync();
        }
        public async Task<Event[]> GetAllEventsAsyncByDate(DateTime date, bool includeUsers = false)
        {
            IQueryable<Event> query = _context.Events;
    
            if(includeUsers)
            {
                query = query
                .Include(ue => ue.UsersEvents)
                .ThenInclude(u => u.User);
            }

            query = query.AsNoTracking()
            .Where(c => c.Data.Date == date);

            return await query.ToArrayAsync();
        }

        public async Task<Event[]> GetAllEventsAsyncByName(string name, bool includeUsers = false)
        {
            IQueryable<Event> query = _context.Events;

            if(includeUsers)
            {
                query = query
                .Include(ue => ue.UsersEvents)
                .ThenInclude(u => u.User);
            }

            query = query.AsNoTracking()
            .Where(c => c.Nome.ToLower().Contains(name.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Event[]> GetAllEventsAsyncByType(int type, bool includeUsers = false)
        {
            IQueryable<Event> query = _context.Events;

            if(includeUsers)
            {
                query = query
                .Include(ue => ue.UsersEvents)
                .ThenInclude(u => u.User);
            }

            query = query.AsNoTracking()
            .OrderByDescending(c => c.Data)
            .Where(c => c.Tipo == type);

            return await query.ToArrayAsync();
        }

        public async Task<Event> GetEventAsyncById(int EventId, bool includeUsers)
        {
            IQueryable<Event> query = _context.Events;

            if(includeUsers)
            {
                query = query
                .Include(ue => ue.UsersEvents)
                .ThenInclude(u => u.User);
            }

            query = query.AsNoTracking()
            .Where(c => c.Id == EventId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<User> GetUserAsyncById(int UserId, bool includeEvents)
        {
            IQueryable<User> query = _context.Users;

            if(includeEvents)
            {
                query = query
                .Include(ue => ue.UsersEvents)
                .ThenInclude(u => u.Event);
            }

            query = query.AsNoTracking()
            .Where(u => u.Id == UserId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<User[]> GetAllUsers()
        {
            IQueryable<User> query = _context.Users;

            query = query.AsNoTracking()
            .OrderByDescending(c => c.Nome);

            return await query.ToArrayAsync();
        }

        public async Task<UserEvent[]> GetAllEventsAsyncByUser(int UserId)
        {
            IQueryable<UserEvent> query = _context.UsersEvents
            .Include(c => c.Event);

            query = query.AsNoTracking()
            .OrderBy(c => c.Event.Data)
            .Where(u => u.UserId == UserId);
            

            return await query.ToArrayAsync();
        }

        public async Task<UserEvent> GetUserEventAsyncById(int UserId, int EventId)
        {
            IQueryable<UserEvent> query = _context.UsersEvents;

            query = query.AsNoTracking()
            .Where(ue => (ue.UserId == UserId) && (ue.EventId ==EventId));

            return await query.FirstOrDefaultAsync();
        }

        public async Task<User> GetAuthenticateUser(string email, string password)
        {
            IQueryable<User> query = _context.Users;

            query = query.AsNoTracking().Where(u => u.Email.ToLower().Contains(email.ToLower())
            && u.Senha.ToLower().Contains(password.ToLower()));

            return await query.FirstOrDefaultAsync();
        }
    }
}