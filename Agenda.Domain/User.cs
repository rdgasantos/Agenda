using System;
using System.Collections.Generic;

namespace Agenda.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public DateTime DataNasc { get; set; }
        public string Sexo { get; set; }
        public List<UserEvent> UsersEvents { get; set;}
    }
}