using Agenda.Domain;
using Microsoft.EntityFrameworkCore;

namespace Agenda.Repository
{
    public class AgendaContext: DbContext
    {
        public AgendaContext(DbContextOptions<AgendaContext> options) : base (options) {}
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<UserEvent> UsersEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEvent>()
            .HasKey(UE => new {UE.UserId, UE.EventId});
        } 
    }
}