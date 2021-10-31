using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Clases
{
    public class Syllabu
    {
        public Major Major { get; set; }
        public int Year { get; set; }
        public List<Subject> Subjects{ get; set; }
        public int ID { get; set; }
    }
}