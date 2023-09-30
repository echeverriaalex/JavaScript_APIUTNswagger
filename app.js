/*
    Conocen los siguientes endpoints:
    ▪ GET /api/Company
    ▪ GET /api/Employee
    ▪ POST /api/Employee
    ▪ DELETE /api/Employee/employeeId
    https://utn-lubnan-api-1.herokuapp.com/
    https://utn-lubnan-api-1.herokuapp.com/index.html

    // Atributos de Company
    {
        "companyId": 1,
        "name": "Muxo"
    }

    // Atributos de Employee
    {
        "employeeId": 1,
        "companyId": 10,
        "firstName": "Isaak",
        "lastName": "Sterland",
        "email": "isterland0@blinklist.com"
    }
*/

const urlCompany = 'https://utn-lubnan-api-1.herokuapp.com/api/Company'

let getCompanyList = function(url){
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest()
        request.open('GET', url)
        request.responseType = 'json'
        request.onload = function(){
            if(request.status == 200){
                resolve(request.response)
            }
            else{
                reject(Error('json couldn not be loaded. Error: ' + request.statusText))
            }
        }
        request.onerror = function(){
            reject(Error('Error: network'))
        }
        request.send()
    })
}

function createCompany(company){
    let div = document.createElement('div')
    div.setAttribute("id", company['companyId'])

    let divInformation = document.createElement('div')
    divInformation.setAttribute("class", "company-information")

    let h2 = document.createElement('h2')
    h2.innerHTML = company['name']
    divInformation.append(h2)

    let p = document.createElement('p')
    p.setAttribute("class", "idCompany")
    p.innerHTML = 'ID ' +  company['companyId']
    divInformation.append(p)

    let employees = document.createElement('p')
    employees.setAttribute("class", "employees")
    employees.innerHTML = "Employees: "
    divInformation.append(employees)

    let count = document.createElement('p')
    count.setAttribute("class", "count")
    count.setAttribute("id", "count" + company['companyId'])
    count.innerHTML = 0
    divInformation.append(count)

    let countEmployee = document.createElement('input')
    countEmployee.setAttribute("type", "number");
    countEmployee.setAttribute("id", "countEmployeed" + company['companyId']);
    countEmployee.value = 0;
    divInformation.append(countEmployee)

    /*
    div.append(h2)
    div.append(employees)
    div.append(count)
    div.append(countEmployee)
    div.append(p)
    */
    
    div.append(divInformation)
    return div
}

// PREGUNTAR SI ES UNA BUENA PRACTICA DE PROGRAMACION HACER ESTO
// Encierro toda la funcion getCompanyList y su procesamiento 
// de la promise en otra funcion para simplificar el codigo
// cada vez que quiera traer y mostrar las empresas
async function showListCompany(){
    let companiesList = document.getElementById('companiesList');
    await getCompanyList(urlCompany)
        .then((response)=>{
            console.log("Number of companies: " + response.length);
            response.forEach(company => {
                let newCompany = createCompany(company)
                companiesList.append(newCompany)
            });
        })
        .catch((error)=>{
            console.log(Error(error));
            let h2 = document.createElement('h2')
            h2.innerHTML = 'Not found companies or ' + error;
            companiesList.append(h2)
        })
}


const urlEmployee = 'https://utn-lubnan-api-1.herokuapp.com/api/Employee'

let getEmployeeList = function(url){
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest()
        request.open('GET', url)
        request.responseType = 'json'
        request.onload = function(){
            if(request.status == 200){
                resolve(request.response)
            }
            else{
                reject(Error('json couldn not be loaded. Error: ' + request.statusText))
            }
        }
        request.onerror = function(){
            reject(Error('Error: network'))
        }
        request.send()
    })
}

function createEmployee(employee){
    let section = document.createElement('section')
    section.setAttribute("class", "employee")
    section.setAttribute("class", "company" + employee["companyId"])
    section.setAttribute("class", "info-employee")

    let pCompanyId = document.createElement('p')
    pCompanyId.innerHTML = "ID company: " + employee["companyId"]
    section.append(pCompanyId)

    let pEmployeeId = document.createElement('p')
    pEmployeeId.innerHTML = "ID employee: " + employee["employeeId"]
    section.append(pEmployeeId)                
    
    let pFirstName = document.createElement('p')
    pFirstName.innerHTML = "Name: " + employee["firstName"]
    section.append(pFirstName)
    
    let pLastName = document.createElement('p')
    pLastName.innerHTML = "Lastname: " + employee["lastName"]
    section.append(pLastName)
    
    let pEmail = document.createElement('p')
    pEmail.innerHTML = "Email: " + employee["email"]
    section.append(pEmail)
    
    let countEmployee = document.getElementById("countEmployeed" + employee['companyId'])
    countEmployee.value = parseInt(countEmployee.value) + 1;

    let count = document.getElementById("count" + employee['companyId'])     
    if(company.id == employee["companyId"]){
        count.innerHTML = parseInt(count.innerHTML) + 1
    }
    
    //console.log("Count ---> " + countEmployee);
    return section
}

// PREGUNTAR SI ES UNA BUENA PRACTICA DE PROGRAMACION HACER ESTO
// Encierro toda la funcion showEmployeeList y su procesamiento 
// de la promise en otra funcion para simplificar el codigo
// cada vez que quiera traer y mostrar los empleados 
async function showEmployeeList(){
    await getEmployeeList(urlEmployee)
        .then((response)=>{
            console.log("Number of employee: " + response.length);
            response.forEach(employee => {
                company = document.getElementById(employee["companyId"])                
                let newEmployee = createEmployee(employee)
                company.append(newEmployee)
            });
        })
        .catch((error)=>{
            console.log(Error(error));
            let h2 = document.createElement('h2')
            h2.innerHTML = 'Not found employee or ' + error;
            companiesList.append(h2)
        })
}

async function showCompanyWithEmployee(){
    await showListCompany();
    await showEmployeeList();
}

//showCompanyWithEmployee()


// ------------------------------------------------------------------------------------------------------

let postNewEmployee = function(newEmployee, url){
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest()
        request.open('POST', url)
        request.setRequestHeader("Content-Type", "application/json");
        request.responseType = 'json'
        request.onload = function(){
            if(request.status == 200){
                resolve(request.response)
            }
            else{
                reject(Error('json couldn not be loaded. Error: ' + request.statusText))
            }
        }
        request.onerror = function(){
            reject(Error('Error: network'))
        }
        request.send(JSON.stringify(newEmployee))
    })
}


// creo nuevos objetos empleados para enviarlos a la API
let newEmployee1 = {
    "employeeId": 19998, // este en este caso es opcional
    "companyId": 1,
    "firstName": "Alex",
    "lastName": "Echeverria",
    "email": "alexnahuelecheverria@gmail.com"
}

let newEmployee2 = {
    "employeeId": 19998, // este en este caso es opcional
    "companyId": 5,
    "firstName": "Pepe",
    "lastName": "Argento",
    "email": "racingclubavellaneda@gmail.com"
}

let newEmployee3 = {
    "employeeId": 19998, // este en este caso es opcional
    "companyId": 7,
    "firstName": "Leonardo",
    "lastName": "DiCaprio",
    "email": "tictanic4ever@gmail.com"
}


async function registerNewEmployeeAsync(newEmployee){
    // mando por post a crear un nuevo empleado
    await postNewEmployee(newEmployee, urlEmployee)
        .then((response)=>{
            console.log(newEmployee.firstName + " was registered asynchronously");
            console.log(response);
        })
        .catch((error)=>{
            console.log(Error(error));
            let h2 = document.createElement('h2')
            h2.innerHTML = 'Cannot register new employee or ' + error;
            companiesList.append(h2)
        })
}

/*
ERROR que me salio experimentando 
Uncaught SyntaxError: await is only valid in async functions and 
the top level bodies of modules (at app.js:206:1)
yo ponia asi:

await registerNewEmployee(newEmployee1);

pero dentro de esa funcion no ponia await

salia error porque no ponia await postNewEmployee dentro de 
la funcion registerNewEmployee, si pongo async afuera, adentro tengo 
que poner await 
*/

console.log("\n ---> Vamos a probar el orden con Async y Await\n\n");

registerNewEmployeeAsync(newEmployee1);
console.log(newEmployee1.firstName + " was sent to Asyn");

registerNewEmployeeAsync(newEmployee2);
console.log(newEmployee2.firstName + " was sent to Asyn");

registerNewEmployeeAsync(newEmployee3);
console.log(newEmployee3.firstName + " was sent to Asyn");

console.log("\n ---- Fin de la prueba en orden con Async y Await\n\n\n");

//showEmployeeList();


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


let newEmployee4 = {
    "employeeId": 19998, // este en este caso es opcional
    "companyId": 9,
    "firstName": "Lionel",
    "lastName": "Messi",
    "email": "lio_10_messi@icloud.com"
}

let newEmployee5 = {
    "employeeId": 19998, // este en este caso es opcional
    "companyId": 3,
    "firstName": "Fideo",
    "lastName": "Di Maria",
    "email": "fideo_en_su_salsa@icloud.com"
}

let newEmployee6 = {
    "employeeId": 19998, // este en este caso es opcional
    "companyId": 6,
    "firstName": "Diego",
    "lastName": "Maradona",
    "email": "diegote_dios@icloud.com"
}


function registerNewEmployee(newEmployee){
    // mando por post a crear un nuevo empleado
    postNewEmployee(newEmployee, urlEmployee)
        .then((response)=>{
            console.log(newEmployee.firstName + " was registered.");
            console.log(response);
        })
        .catch((error)=>{
            console.log(Error(error));
            let h2 = document.createElement('h2')
            h2.innerHTML = 'Cannot register new employee or ' + error;
            companiesList.append(h2)
        })
}

console.log("\n $---> Vamos a probar el orden SIN Async y Await");
registerNewEmployee(newEmployee4);
console.log(newEmployee4.firstName + " was sent");

registerNewEmployee(newEmployee5);
console.log(newEmployee5.firstName + " was sent");

registerNewEmployee(newEmployee6);
console.log(newEmployee6.firstName + " was sent");

console.log("\n $---> Fin de la prueba en orden SIN Async y Await\n\n\n");

//showEmployeeList();



// me traigo todos los empleados para ver como quedo registrado
// el nuevo empleado que mande a crear
/*
getEmployeeList(urlEmployee)
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(Error(error));
        let h2 = document.createElement('h2')
        h2.innerHTML = 'Not found employee or ' + error;
        companiesList.append(h2)
    })
*/



let deleteEmployeeById = function(url){
    return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest()
        request.open('DELETE', url, true)
        request.onload = function(){
            if(request.status == 200){
                resolve(request.response)
            }
            else{
                reject(Error('Couldn not delete. Error: ' + request.statusText))
            }
        }
        request.onerror = function(){
            reject(Error('Error: network to delete'))
        }
        request.send()
    })
}

function deleteEmployee(idEmployee){
    // mando por post a crear un nuevo empleado
    deleteEmployeeById("https://utn-lubnan-api-1.herokuapp.com/api/Employee/" + idEmployee)
        .then((response)=>{
            console.log("Employee deleted." + idEmployee);
            console.log(response);
        })
        .catch((error)=>{
            console.log(Error(error));
            let h2 = document.createElement('h2')
            h2.innerHTML = 'Cannot delete employee or ' + error;
            companiesList.append(h2)
        })
}

//showCompanyWithEmployee()

console.log('voy a borrar el 733 y muestro');

deleteEmployee(1)

showCompanyWithEmployee()