const SyllabusContract = artifacts.require("./Syllabus.sol");

contract("Syllabus", accounts => {
  const developer = accounts[0];
  const unknown_1 = accounts[1];
  const newClient = accounts[2];
  const upeWallet = accounts[3];
  const utnWallet = accounts[4];

  it("La UPE escribe un array de planes y obtiene sus nombres", async() => {
    const syllabus = await SyllabusContract.deployed();

    let institution = "UPE";
    
    let planes = [{name:"DS-P2016", carreer: "Desarrollo de software 1"},
                  {name:"DS-P2019", carreer: "Desarrollo de software 2"}
                 ];

    let materias =  [[{id:"a3c1TP16", name:"Técnicas de programación"},
                      {id:"a3c1PTR16",name:"Programación en tiempo real"}
                     ],
                     [{id:"a1c2FE19", name:"Fundamentos de electrónica"},
                      {id:"a2c1QA19", name:"Testing"},
                      {id:"a2c2IQ19", name:"Ingeriería de requisitos"}
                     ]
                    ];

    await syllabus.submitData( institution, planes, materias, { from: upeWallet } );
    
    const storedSyllabusNames1 = await syllabus.getSyllabusNames( { from: upeWallet } );
    let   str = storedSyllabusNames1[0];
    str = str.concat( '|', storedSyllabusNames1[1] );
    assert.equal(str, "DS-P2016|DS-P2019", "Can not retrieve array of Syllabus Names");
  });


  it("Ahora obtiene el primer Plan entero", async () => {
    const syllabus = await SyllabusContract.deployed();
    
    let syllabusData1 = await syllabus.getSyllabus(0, { from: upeWallet } );
    assert.equal(syllabusData1.carreer, "Desarrollo de software 1", "Can not retrieve the target carreer");
  });


  it("Obtiene el nombre de una materia del primer plan", async () => {
    const syllabus = await SyllabusContract.deployed();
    
    let subjectName = await syllabus.getSubjectName( 0, 1, { from: upeWallet } );
    assert.equal(subjectName, "Programación en tiempo real", "Can not retrieve the target subject");
  });


  it("Obtiene el nombre de una materia del segundo plan", async () => {
    const syllabus = await SyllabusContract.deployed();
    
    let subjectName = await syllabus.getSubjectName( 1, 2, { from: upeWallet } );
    assert.equal(subjectName, "Ingeriería de requisitos", "Can not retrieve the target subject");
  });

  
  it("Otra Universidad (UTN) escribe un array de planes y obtiene el primero", async() => {
    const syllabus = await SyllabusContract.deployed();

    let institution = "UTN";

    let planes = [{name:"IE-P1995", carreer: "Ingeniería Electrónica 1"},
                  {name:"IE-P2006", carreer: "Ingeniería Electrónica 2"}
                 ];

    let materias =  [[{id:"a4c0ME95", name:"Medios de enlace"},
                      {id:"a2c0CN95", name:"Cálculo numérico"},
                      {id:"a1c0DE95", name:"Dispositivos electrónicos"}
                     ],
                     [{id:"a5c2EP06", name:"Electrónica de potencia"},
                      {id:"a3c0TE06", name:"Tecnología de las empresas"}
                     ]
                    ];

    await syllabus.submitData( institution, planes, materias, { from: utnWallet } );
    
    const storedSyllabusName = await syllabus.getSyllabusName(0, {from: utnWallet});
    assert.equal(storedSyllabusName, "IE-P1995", "Can not retrieve the target Syllabus");
  });


  it("Ahora UTN intenta leer plan de la UPE, pero no tiene acceso", async () => {
    const syllabus = await SyllabusContract.deployed();
    try {
      let syllabusData2 = await syllabus.getInstitutionSyllabus( upeWallet, 1, { from: utnWallet } );
      assert.equal(syllabusData2.name, "DS-P2019", "Can not retrieve the target plan name");
    } catch (error) {
      assert.equal(error, "Error: Returned error: VM Exception while processing transaction: revert Only owner can call this function.", console.error());
    }
  });


  it("El address dueño del contrato si tiene acceso y puede leer todos los planes", async () => {
    const syllabus = await SyllabusContract.deployed();

    let syllabusData3 = await syllabus.getInstitutionSyllabus( upeWallet, 1, { from: developer } );
    assert.equal(syllabusData3.name, "DS-P2019", "Can not retrieve the target plan name");
  });

  
  it("Transfiere la propiedad del Contrato a un cliente y este lee la info privada", async () => {
    const syllabus = await SyllabusContract.deployed();

    await syllabus.transferOwnership( newClient, { from: developer } );
    //const newOwner = await syllabus.getOwner();
    //assert.equal( newOwner, newClient, "Could not retrieve current new owner");
    let syllabusData4 = await syllabus.getInstitutionSyllabus( upeWallet, 1, { from: newClient } );
    assert.equal(syllabusData4.name, "DS-P2019", "Can not retrieve the target plan name");
  });


  it("El dueño anterior ya no tiene acceso al contrato (ejecuta la prueba anterior", async () => {
    const syllabus = await SyllabusContract.deployed();

    try {
      let syllabusData5 = await syllabus.getInstitutionSyllabus( upeWallet, 1, { from: developer } );
      assert.equal(syllabusData5.name, "DS-P2019", "Can not retrieve the target plan name");
    } catch (error) {
      assert.equal(error, "Error: Returned error: VM Exception while processing transaction: revert Only owner can call this function.", console.error());
    }
  });


  it("UTN intenta escribir un array de planes con uno repetido y ese no se graba", async() => {
    const syllabus = await SyllabusContract.deployed();

    let institution = "UTN";

    let planes = [{name:"IE-P1995", carreer: "Ingeniería Electrónica 1"},
                  {name:"IE-P2021", carreer: "Ingeniería Electrónica 3"}
                 ];

    let materias =  [[{id:"a4c0ME95", name:"Medios de enlace"},
                      {id:"a2c0CN95", name:"Cálculo numérico"},
                      {id:"a1c0DE95", name:"Dispositivos electrónicos"}
                     ],
                     [{id:"a5c2DA21", name:"Procesamiento digital avanzado"},
                      {id:"a4c0NT21", name:"Nanotecnología"}
                     ]
                    ];

    await syllabus.submitData( institution, planes, materias, { from: utnWallet } );
    
    const storedSyllabusNames2 = await syllabus.getSyllabusNames( { from: utnWallet } );
    let   str = storedSyllabusNames2[0];
    str = str.concat( '|', storedSyllabusNames2[1] );
    str = str.concat( '|', storedSyllabusNames2[2] );
    str = str.concat( '|', storedSyllabusNames2[3] );
    assert.equal(str, "IE-P1995|IE-P2006|IE-P2021|", "Can not retrieve array of Syllabus Names");
  });
});
