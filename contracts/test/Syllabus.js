const SyllabusContract = artifacts.require("./Syllabus.sol");

contract("Syllabus", accounts => {

  it("Escribe un array de planes para la UPE y obtiene el segundo", async() => {
    const syllabus = await SyllabusContract.deployed();

    // Universidad
    let institution = "UPE";
      // Planes de estudio
      let planes = [["DS-P2016","Desarrollo de software 1"],
                    ["DS-P2019","Desarrollo de software 2"]
                   ];
        // Materias
        let materias =  [[{id:"a3c1TP16", name:"Técnicas de programación"},
                          {id:"a3c1PTR16",name:"Programación en tiempo real"}
                         ],
                         [{id:"a1c2FE19", name:"Fundamentos de electrónica"},
                          {id:"a2c1QA19", name:"Testing"},
                          {id:"a2c2IQ19", name:"Ingeriería de requisitos"}
                         ]
                        ];
        
    await syllabus.submitData( institution, planes, materias, { from: accounts[0] } );
    
    const storedSyllabusName = await syllabus.getSyllabusName(1);
    assert.equal(storedSyllabusName, "DS-P2019", "Can not retrieve the target Syllabus");
  });


  it("Ahora obtiene el primer Plan entero", async () => {
    const syllabus = await SyllabusContract.deployed();
    
    let syllabusData = await syllabus.getSyllabus(0);
    assert.equal(syllabusData.carreer, "Desarrollo de software 1", "Can not retrieve the target carreer");
  });


  it("Obtiene el nombre de una materia del primer plan", async () => {
    const syllabus = await SyllabusContract.deployed();
    
    let subjectName = await syllabus.getSubjectName( 0, 1 );
    assert.equal(subjectName, "Programación en tiempo real", "Can not retrieve the target subject");
  });


  it("Oobtiene el nombre de una materia del segundo plan", async () => {
    const syllabus = await SyllabusContract.deployed();
    
    let subjectName = await syllabus.getSubjectName( 1, 2 );
    assert.equal(subjectName, "Ingeriería de requisitos", "Can not retrieve the target subject");
  });
});
