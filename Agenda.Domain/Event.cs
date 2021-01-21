using System;
using System.Collections.Generic;

namespace Agenda.Domain
{
    public class Event
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
        public string Local { get; set; }
        public int Tipo { get; set; }
        public List<UserEvent> UsersEvents { get; set;}
    }
}