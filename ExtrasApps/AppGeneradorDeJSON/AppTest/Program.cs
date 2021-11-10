using Clases.Blockchain;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace AppTest
{
    class Program
    {
        protected Program() { }


        static void Main(string[] args)
        {
            ExamReport objActa = GenerarActa();
            Syllabu objPlanDeEstudio = GenerarPlanDeEstudio();

            
            JavaScriptSerializer js = new JavaScriptSerializer();


            string datosJSONDeActa = js.Serialize(objActa);
            string datosJSONPlan = js.Serialize(objPlanDeEstudio);

            string miPath = string.Format("{0}{1}", Directory.GetCurrentDirectory(), @"\datos");
            if (!Directory.Exists(miPath))
            {
                Directory.CreateDirectory(miPath);
            }




            //Esta app lo único que hace es generar los archivos en la carpeta /datos donde esta el ejecutable

            System.IO.File.WriteAllText(miPath + @"\sc_examsreport.json", datosJSONDeActa);
            System.IO.File.WriteAllText(miPath + @"\sc_syllabus.json", datosJSONPlan);
            System.IO.File.WriteAllText(miPath + @"\users.json", js.Serialize(GenerarUsuarios()));
            System.IO.File.WriteAllText(miPath + @"\universities.json", js.Serialize(GenerarUniversidades()));



            Console.WriteLine(datosJSONDeActa);
            Console.WriteLine(datosJSONPlan);

            Console.ReadKey();

        }

        private static List<Clases.University> GenerarUniversidades()
        {

            var tecnicaturaEnDesarrolloDeSoftware = new Clases.Major
            {
                Name = "Tecnicatura en desarrollo de software"
            };

            List<Clases.Subject> subjects = new List<Clases.Subject>()
            {
                new Clases.Subject() { Code="01", IdSubject=1, Name="Introducción al campo profesional", TeachingHours=32},
                new Clases.Subject() { Code="02", IdSubject=2, Name="Alfabetización Académica", TeachingHours=96 },
                new Clases.Subject() { Code="03", IdSubject=3, Name="Politica y Sociedad", TeachingHours=64},
                new Clases.Subject() { Code="04", IdSubject=4, Name="Introducción al Desarrollo de Software", TeachingHours=64},
                new Clases.Subject() { Code="05", IdSubject=5, Name="Matemática I", TeachingHours=64},
                new Clases.Subject() { Code="06", IdSubject=6, Name="Fundamentos de la Electrónica", TeachingHours=64},
                new Clases.Subject() { Code="07", IdSubject=7, Name="Estructura de Datos y Algoritmos I", TeachingHours=64},
                new Clases.Subject() { Code="08", IdSubject=8, Name="Software y Los Nuevos Escenarios", TeachingHours=64},
                new Clases.Subject() { Code="09", IdSubject=9, Name="Matemática II", TeachingHours=64},
                new Clases.Subject() { Code="10", IdSubject=10, Name="Sistemas Operativos", TeachingHours=64},
                new Clases.Subject() { Code="11", IdSubject=11, Name="Base de datos I", TeachingHours=64},
                new Clases.Subject() { Code="12", IdSubject=12, Name="Testing", TeachingHours=64},
                new Clases.Subject() { Code="13", IdSubject=13, Name="Estructura de Datos y Algoritmos II", TeachingHours=64},
                new Clases.Subject() { Code="14", IdSubject=14, Name="Matemática III", TeachingHours=64},
                new Clases.Subject() { Code="15", IdSubject=15, Name="Redes de Computadora I", TeachingHours=64},
                new Clases.Subject() { Code="16", IdSubject=16, Name="Ingeniería de Requisitos", TeachingHours=64},
                new Clases.Subject() { Code="17", IdSubject=17, Name="Taller de Modelado - PPS", TeachingHours=96},
                new Clases.Subject() { Code="18", IdSubject=18, Name="Programación en Tiempo Real", TeachingHours=64},
                new Clases.Subject() { Code="19", IdSubject=19, Name="Técnicas de Programación", TeachingHours=64},
                new Clases.Subject() { Code="20", IdSubject=20, Name="Base de Datos II", TeachingHours=64},
                new Clases.Subject() { Code="21", IdSubject=21, Name="Redes de Computadora II", TeachingHours=64},
                new Clases.Subject() { Code="22", IdSubject=22, Name="Electiva I", TeachingHours=64},
                new Clases.Subject() { Code="23", IdSubject=23, Name="Programación Web", TeachingHours=96},
                new Clases.Subject() { Code="24", IdSubject=24, Name="Ingeniería del Software", TeachingHours=64},
                new Clases.Subject() { Code="25", IdSubject=25, Name="Seguridad Informática", TeachingHours=64},
                new Clases.Subject() { Code="26", IdSubject=26, Name="Electiva II", TeachingHours=64},
                new Clases.Subject() { Code="27", IdSubject=27, Name="Proyecto de Software - PPS II", TeachingHours=64},



            };

            List<Clases.Syllabu> syllabus = new List<Clases.Syllabu>()
            {
                new Clases.Syllabu(){ Major = tecnicaturaEnDesarrolloDeSoftware, Year=2019, Subjects = subjects, ID=1}
            };

            List<Clases.Major> majors = new List<Clases.Major>()
            {
                new Clases.Major() { Name="Tecnicatura en Desarrollo de Software", Syllabus = syllabus},
            };
            List<Clases.University> universities = new List<Clases.University>()
            { 
                new Clases.University(){ Name="Universidad Provincial de Ezeiza", Majors=majors, Address="Poner aquí una dirección"}
            };



            return universities;
        }

        private static List<Clases.User> GenerarUsuarios()
        {

            //Arqueros y defensores: Estudiantes
            //Delanteros: administradores
            //Mediocampistas: Profesores
            List<Clases.User> users = new List<Clases.User>
            {
                new Clases.User() { DocumentNumber = 40100201, LastName = "Roa", Name = "Carlos", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Student, UserName = "croa" },
                new Clases.User() { DocumentNumber = 40100212, LastName = "Burgos", Name = "German", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Student, UserName = "gburgos" },
                new Clases.User() { DocumentNumber = 40100217, LastName = "Caballero", Name = "Pablo", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Student, UserName = "pbaballero" },
                new Clases.User() { DocumentNumber = 40100202, LastName = "Ayala", Name = "Roberto", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Student, UserName = "rayala" },
                new Clases.User() { DocumentNumber = 40100206, LastName = "Sensini", Name = "Roberto", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Student, UserName = "rsensini" },
                new Clases.User() { DocumentNumber = 40100222, LastName = "Zanetti", Name = "Javier", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Student, UserName = "jzanetti" },
                new Clases.User() { DocumentNumber = 40100203, LastName = "Chamot", Name = "José", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Student, UserName = "jchamot" },
                new Clases.User() { DocumentNumber = 40100204, LastName = "Pineda", Name = "Héctor", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Student, UserName = "hpineda" },
                new Clases.User() { DocumentNumber = 40100213, LastName = "Paz", Name = "Pablo", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Student, UserName = "ppaz" },
                new Clases.User() { DocumentNumber = 40100214, LastName = "Vivas", Name = "Nelson", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Student, UserName = "nvivas" },
                new Clases.User() { DocumentNumber = 40100209, LastName = "Batistuta", Name = "Gabriel", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Administrator, UserName = "gbatistuta" },
                new Clases.User() { DocumentNumber = 40100207, LastName = "Lopez", Name = "Claudio", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Administrator, UserName = "clopez" },
                new Clases.User() { DocumentNumber = 40100219, LastName = "Crespo", Name = "Hernán", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Administrator, UserName = "hcrespo" },
                new Clases.User() { DocumentNumber = 40100218, LastName = "Balbo", Name = "Abel", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Administrator, UserName = "abalbo" },
                new Clases.User() { DocumentNumber = 40100221, LastName = "Delgado", Name = "Marcelo", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Administrator, UserName = "mdelgado" },
                new Clases.User() { DocumentNumber = 40100210, LastName = "Ortega", Name = "Ariel", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Professor, UserName = "aortega" },
                new Clases.User() { DocumentNumber = 40100211, LastName = "Verón", Name = "Juan Sebastian", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Professor, UserName = "jveron" },
                new Clases.User() { DocumentNumber = 40100208, LastName = "Simeone", Name = "Diego", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Professor, UserName = "dsimeone" },
                new Clases.User() { DocumentNumber = 40100205, LastName = "Almeyda", Name = "Matias", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Professor, UserName = "malmeyda" },
                new Clases.User() { DocumentNumber = 40100215, LastName = "Astrada", Name = "Leonardo", Pass = "12345678", TypeOfUser = Clases.TypeOfUser.Professor, UserName = "lastrada" },
            };

            return users;
        }

        private static Syllabu GenerarPlanDeEstudio()
        {
            return new Clases.Blockchain.Syllabu()
            {
                YearOfValidity = 2020,
                Major = "Tecnicatura en Desarrollo de Software",
                Code = "TEC01",
                Description = "Plan 2019",
                University = "UPE - Universidad Provincial de Ezeiza",
                Subjects = new List<Clases.Subject>()
                {
                    new Clases.Subject(){Name="Software y Los Nuevos Escenarios", TeachingHours=64,IdSubject=8 },
                    new Clases.Subject(){Name="Programación en Tiempo Real", TeachingHours=64,IdSubject=18 },
                    new Clases.Subject(){Name ="Técnicas de Programación", TeachingHours=64,IdSubject=19 },
                    new Clases.Subject(){Name="Programación Web", TeachingHours=96,IdSubject=23 },
                    new Clases.Subject(){Name="Sistemas Operativos", TeachingHours=64,IdSubject=10 }
                }

            };
        }

        private static ExamReport GenerarActa()
        {
            return new Clases.Blockchain.ExamReport
            {
                Year = DateTime.Now.Year,
                Month = DateTime.Now.Month,
                Day = DateTime.Now.Day,
                Shift = "N",
                IdSyllabu = 1,
                IdSubject = 12,
                IdTenuredProfessor = 40100211,
                IdVocalProfessor1 = 40100210,
                IdVocalProfessor2 = 40100215,
                Notes = new List<Clases.Blockchain.StudentNote>()
                {
                    new Clases.Blockchain.StudentNote()
                    {
                        IdStudent=40100201,
                        Note=10
                    },
                    new Clases.Blockchain.StudentNote()
                    {
                        IdStudent=40100212,
                        Note=9
                    }
                }
            };
        }
    }
}
