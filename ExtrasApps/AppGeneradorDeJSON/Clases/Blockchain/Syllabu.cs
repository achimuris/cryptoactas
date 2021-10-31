using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clases.Blockchain
{
    public class Syllabu
    {
        public string Code { get; set; }
        public string Description { get; set; }
        public int YearOfValidity { get; set; }
        public string Major { get; set; }
        public string University { get; set; }
        public List<Subject> Subjects { get; set; }
    }
}
