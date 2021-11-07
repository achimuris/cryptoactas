const SyllabusContract = artifacts.require("./Syllabus.sol");

contract("Syllabus", accounts => {
/*
  it("Pasa 2 strings, los guarda de forma invertida y obtiene el primero", async () => {
    const syllabus = await SyllabusContract.deployed();

    // Set myString to "Hey there!"
    await syllabus.setSwap(["str1","str2"], { from: accounts[0] });

    // Get myString from public variable getter
    const storedString = await syllabus.mySyllabus1.call();

    assert.equal(storedString, "str2", "The string was not stored");
  });

  it("Luego obtiene el segundo", async () => {
    const syllabus = await SyllabusContract.deployed();
    
    const storedString = await syllabus.mySyllabus2.call();
    assert.equal(storedString, "str1", "The string was not stored");
  });
  
  */

  it("Escribe un array de planes para la UPE y obtiene el segundo", async() => {
    const syllabus = await SyllabusContract.deployed();

    // Universidad
    let institution = "UPE";
      // Planes de estudio
      let planes = [["DS-P2016","Desarrollo de software 1"],
                    ["DS-P2019","Desarrollo de software 2"]
                   ];
        // Materias
        let materias =  [{id:"a3c1TP16", name:"Técnicas de programación"},
                         {id:"a3c1PTR16",name:"Programación en tiempo real"}];
                         /*
                        [[id:"a1c2FE19", name:"Fundamentos de electrónica"],
                         [id:"a2c1QA19", name:"Testing"],
                         [id:"a2c2IQ19", name:"Ingeriería de requisitos"]
                        ]
                       ];
        /*
        let materias = [[["a3c1TP16","Técnicas de programación"]
                         ["a3c1PTR16","Programación en tiempo real"],
                        ],
                        [["a1c2FE19","Fundamentos de electrónica"],
                         ["a2c1QA19","Testing"],
                         ["a2c2IQ19","Ingeriería de requisitos"]
                        ]
                       ];*/
        
    await syllabus.submitData( institution, planes, materias, { from: accounts[0] } );
    
    const storedSyllabusName = await syllabus.getSyllabusName(1);
    assert.equal(storedSyllabusName, "DS-P2019", "Can not retrieve the target Syllabus");
  });


  it("Ahora obtiene el primer Plan entero", async () => {
    const syllabus = await SyllabusContract.deployed();
    
    let syllabusData = await syllabus.getSyllabus(0);
    assert.equal(syllabusData.carreer, "Desarrollo de software 1", "The string was not stored");
  });


  it("Ahora obtiene el nombre de la primer materia del plan indicado", async () => {
    const syllabus = await SyllabusContract.deployed();
    
    let subjectName = await syllabus.getFirstSubjectName(1);
    assert.equal(subjectName, "Programación en tiempo real", "The string was not stored");
  });
});
