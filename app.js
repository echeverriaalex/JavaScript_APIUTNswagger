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


let companiesList = document.getElementById('companiesList');

// PREGUNTAR SI ES UNA BUENA PRACTICA DE PROGRAMACION HACER ESTO
// Encierro toda la funcion getCompanyList y su procesamiento 
// de la promise en otra funcion para simplificar el codigo
// cada vez que quiera traer y mostrar las empresas
async function showListCompany(){
    await getCompanyList(urlCompany)
        .then((response)=>{
            //console.log(response);
            response.forEach(element => {
                
                let div = document.createElement('div')
                div.setAttribute("id", element['companyId'])


                let divInformation = document.createElement('div')
                divInformation.setAttribute("class", "company-information")

                let h2 = document.createElement('h2')
                h2.innerHTML = element['name']
                divInformation.append(h2)


                let p = document.createElement('p')
                p.setAttribute("class", "idCompany")
                p.innerHTML = 'ID ' +  element['companyId']
                divInformation.append(p)


                let employees = document.createElement('p')
                employees.setAttribute("class", "employees")
                employees.innerHTML = "Employees: "
                divInformation.append(employees)

                let count = document.createElement('p')
                count.setAttribute("class", "count")
                count.setAttribute("id", "count" + element['companyId'])
                count.innerHTML = 0
                divInformation.append(count)

                let countEmployee = document.createElement('input')
                countEmployee.setAttribute("type", "number");
                countEmployee.setAttribute("id", "countEmployeed" + element['companyId']);
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
                
                companiesList.append(div)
            });
        })
        .catch((error)=>{
            console.log(Error(error));
            let h2 = document.createElement('h2')
            h2.innerHTML = 'Not found companies or ' + error;
            companiesList.append(h2)
        })
}




// ---------------------------------------------------------------------------------------


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

// PREGUNTAR SI ES UNA BUENA PRACTICA DE PROGRAMACION HACER ESTO
// Encierro toda la funcion showEmployeeList y su procesamiento 
// de la promise en otra funcion para simplificar el codigo
// cada vez que quiera traer y mostrar los empleados 
async function showEmployeeList(){
    await getEmployeeList(urlEmployee)
        .then((response)=>{
            //console.log(response);
            response.forEach(employee => {
                let company = document.getElementById(employee["companyId"])                

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

                company.append(section)
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

let postNewEmployee = function(newEmplooyee, url){
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
        request.send(JSON.stringify(newEmplooyee))
    })
}


// creo nuevos objetos empleados para enviarlos a la API
let newEmplooyee1 = {
    "employeeId": 19998, // este en este caso es opcional
    "companyId": 1,
    "firstName": "Alex",
    "lastName": "Echeverria",
    "email": "alexnahuelecheverria@gmail.com"
}

let newEmplooyee2 = {
    "employeeId": 19998, // este en este caso es opcional
    "companyId": 5,
    "firstName": "Pepe",
    "lastName": "Argento",
    "email": "racingclubavellaneda@gmail.com"
}

let newEmplooyee3 = {
    "employeeId": 19998, // este en este caso es opcional
    "companyId": 7,
    "firstName": "Leonardo",
    "lastName": "DiCaprio",
    "email": "tictanic4ever@gmail.com"
}


async function registerNewEmployeeAsync(newEmplooyee){
    // mando por post a crear un nuevo empleado
    await postNewEmployee(newEmplooyee, urlEmployee)
        .then((response)=>{
            console.log(newEmplooyee.firstName + " was registered asynchronously");
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

await registerNewEmployee(newEmplooyee1);

pero dentro de esa funcion no ponia await

salia error porque no ponia await postNewEmployee dentro de 
la funcion registerNewEmployee, si pongo async afuera, adentro tengo 
que poner await 
*/

console.log("\n ---> Vamos a probar el orden con Async y Await\n\n");

registerNewEmployeeAsync(newEmplooyee1);
console.log(newEmplooyee1.firstName + " was sent to Asyn");

registerNewEmployeeAsync(newEmplooyee2);
console.log(newEmplooyee2.firstName + " was sent to Asyn");

registerNewEmployeeAsync(newEmplooyee3);
console.log(newEmplooyee3.firstName + " was sent to Asyn");

console.log("\n ---- Fin de la prueba en orden con Async y Await\n\n\n");

//showEmployeeList();


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


let newEmplooyee4 = {
    "employeeId": 19998, // este en este caso es opcional
    "companyId": 9,
    "firstName": "Lionel",
    "lastName": "Messi",
    "email": "lio_10_messi@icloud.com"
}

let newEmplooyee5 = {
    "employeeId": 19998, // este en este caso es opcional
    "companyId": 3,
    "firstName": "Fideo",
    "lastName": "Di Maria",
    "email": "fideo_en_su_salsa@icloud.com"
}

let newEmplooyee6 = {
    "employeeId": 19998, // este en este caso es opcional
    "companyId": 6,
    "firstName": "Diego",
    "lastName": "Maradona",
    "email": "diegote_dios@icloud.com"
}


function registerNewEmployee(newEmplooyee){
    // mando por post a crear un nuevo empleado
    postNewEmployee(newEmplooyee, urlEmployee)
        .then((response)=>{
            console.log(newEmplooyee.firstName + " was registered.");
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
registerNewEmployee(newEmplooyee4);
console.log(newEmplooyee4.firstName + " was sent");

registerNewEmployee(newEmplooyee5);
console.log(newEmplooyee5.firstName + " was sent");

registerNewEmployee(newEmplooyee6);
console.log(newEmplooyee6.firstName + " was sent");

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
            console.log("Employee deleted.");
            console.log(response);
        })
        .catch((error)=>{
            console.log(Error(error));
            let h2 = document.createElement('h2')
            h2.innerHTML = 'Cannot delete employee or ' + error;
            companiesList.append(h2)
        })
}

deleteEmployee(733)

showCompanyWithEmployee()