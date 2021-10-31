using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Clases.Blockchain
{
    public class ExamReport
    {
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        //Turno
        public string Shift { get; set; }
        //Profesor Titular
        public int IdTenuredProfessor { get; set; }
        public int IdVocalProfessor1{ get; set; }
        public int IdVocalProfessor2 { get; set; }
        public int IdSubject { get; set; }
        public int IdSyllabu { get; set; }
        public List<StudentNote> Notes { get; set; }

    }
    public class StudentNote
    {
        public int IdStudent { get; set; }
        public decimal Note { get; set; }
    }
}