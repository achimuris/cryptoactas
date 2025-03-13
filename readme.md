# Crypto Actas

Un proyecto con Blockchain para guardar actas de examen. Fue desarrollado en el contexto de la materia «Blockchain & Smart Contracts», correspondiente a la Maestría en Ingeniería en Sistemas de Información, de la UTN FRBA.

## Tabla de contenidos

  - [ Instalación y puesta en marcha](#instalación-y-puesta-en-marcha)
  - [ Stack tecnológico utilizado](#stack-tecnológico-utilizado)
  - [ Especificaciones generales](#especificaciones-generales)
  - [ Funcionalidad Frontend](#funcionalidad-frontend)
    - [ Funcionalidades macro](#funcionalidades-macro)
    - [ Crear usuario con los siguientes perfiles](#crear-usuario-con-los-siguientes-perfiles)
    - [ Otras funcionalidades](#otras-funcionalidades)
  - [ Puntos a tener en cuenta](#puntos-a-tener-en-cuenta)


## Instalación y puesta en marcha

Para consultar las el manual de instalación diríjase a la carpeta `docs/`.


## Stack tecnológico utilizado

**MERN Stack** (MongoDB, Express, React, NodeJS)



## Especificaciones generales

- Plan de estudio: Es un dato que se graba en la base de datos hasta que se termina de conformar con todas sus materias. Una vez cerrado el plan de estudios se persiste en la blockchain (BC) y dicho address (addr) se utiliza para identificar el Plan de estudios como id en la BC. En la base de datos tendrá su propio ID.
- Relación docente-acta: El sistema propuesto no tiene por objetivo ser un software de administración universitaria, simplemente funciona como interfaz para persistir la información generada por terceros en la BC. El administrador crea Acta dando de alta los alumnos y los profesores, y el profesor carga las notas. No es necesario gestionar la asociación de profesores por materia.

## Funcionalidad Frontend

### Funcionalidades macro

- Iniciar sesión: Login en el front con registro de usuario en base de datos, sin acceso a la BC
- ABM Plan de estudio: Materias asociadas a una carrera y universidad (addr)
- ABM Actas: Asocia Fechas, Materias, Alumnos, Notas, Profesores y Planes de estudio

### Crear usuario con los siguientes perfiles
- Administrador:
  - Registrar en la BC el plan de estudio en nombre de la universidad.
  - Registrar en la BC las actas enviadas por los profesores.
- Profesor:
  - Carga las actas respectivas a sus materias,la fecha, los alumnos y sus calificaciones.
(Acá no contamos con la asociación de los profesores con las materias, prescindimos de eso para simplificar el alcance).
  - Consulta sus actas → Podríamos recortar esta funcionalidad y dejarla como Deseable
- Alumno:
  - Lee sus notas en las actas registradas en la BC.
  - [Deseable] Podría darse de alta con una billetera para certificar el avance en la carrera, y escribirlo en la blockchain, relacionando address de la universidad, address del plan de estudios y todos los addresses de las actas que contienen sus finales.

### Otras funcionalidades
- Profesor CIERRA FINAL (cargando las notas / esto no graba en la blockchain)
- Administrador “ENVÍA” todas las actas a la blockchain (y graba en la blockchain)
- Alumno: Consulta finales aprobados (lee de la blockchain)
- Enviar a la blockchain el plan de estudio (Nombre de universidad / materias) 

## Puntos a tener en cuenta
- ¿Qué info guardamos en la base de datos (no blockchain)?
  - Login de usuarios (nombre, id, hash de la pass, etc.)
  - Lista de universidades y sus datos principales (nombre, dir, id, addr)
  - Relación entre Plan de estudio (materias), carrera y Universidad
- ¿Qué info guardamos efectivamente en la blockchain?
  - Plan de estudio: string[ ], address de la Universidad
  - Acta: Plan de estudios, legajo de alumnos, notas, id profesores