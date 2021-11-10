using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Clases
{
    public class User : Person
    {
        public string UserName { get; set; }
        public string Pass { get; set; }
        public TypeOfUser TypeOfUser { get; set; }
    }
    public enum TypeOfUser
    {
        Professor,
        Student,
        Administrator
    }
}