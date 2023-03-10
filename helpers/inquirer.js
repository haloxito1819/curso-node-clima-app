import inquirer from 'inquirer';
import colors from 'colors';

const inquirerMenu = async() => {
    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Que deseas hacer?',
            choices: [
                {
                    value: 1,
                    name: `${'1.'.green} Buscar ciudad`
                },
                {
                    value: 2,
                    name: `${'2.'.green} Historial`
                },
                {
                    value: 0,
                    name: `${'0.'.green} Salir`
                },
            ]
        }
    ]
    console.clear();
    console.log('=============================='.brightCyan);
    console.log('   CityWeather-RealTime'.brightCyan);
    console.log('==============================\n'.brightCyan);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}


const pausa = async() => {
    
    const pausaOpts = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.cyan} para continuar\n`,
        }
    ]
    const {enter} = await inquirer.prompt(pausaOpts);

    return enter;
}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc;
}

const listarLugares = async(lugares = []) => {

    const choices = lugares.map((lugar, i) => {
        const idx = colors.green(`${i + 1}.`);
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Selecciona el lugar:',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok
}

const mostrarListadoChecklist = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(preguntas);

    return ids;
}

export {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}