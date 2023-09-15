/*
De la cual se conocen los siguientes endpoints:
▪ GET /api/Company
▪ GET /api/Employee
▪ POST /api/Employee
▪ DELETE /api/Employee/employeeId
https://utn-lubnan-api-1.herokuapp.com/

https://utn-lubnan-api-1.herokuapp.com/index.html


get

{
    "companyId": 1,
    "name": "Muxo"
  },


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


getCompanyList(urlCompany)
    .then((response)=>{
        console.log(response);     

        response.forEach(element => {
            
            let article = document.createElement('article')
            let h2 = document.createElement('h2')
            h2.innerHTML = element['name']
            let p = document.createElement('p')
            p.innerHTML = 'ID ' +  element['companyId']
                      
            article.append(h2)
            article.append(p)
            
            companiesList.append(article)
        });
    })
    .catch((error)=>{
        console.log(Error(error));
        let h2 = document.createElement('h2')
        h2.innerHTML = 'Not found companies or ' + error;
        companiesList.append(h2)
    })

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


getEmployeeList(urlEmployee)
    /*
     {
        "employeeId": 1,
        "companyId": 10,
        "firstName": "Isaak",
        "lastName": "Sterland",
        "email": "isterland0@blinklist.com"
    },
    */
    .then((response)=>{
        console.log(response);
        /*
        response.forEach(element => {
            let article = document.createElement('article')
            let h2 = document.createElement('h2')
            h2.innerHTML = element['name']
            let p = document.createElement('p')
            p.innerHTML = 'ID ' +  element['companyId']   
            article.append(h2)
            article.append(p)
            companiesList.append(article)
        });
        */
    })
    .catch((error)=>{
        console.log(Error(error));
        let h2 = document.createElement('h2')
        h2.innerHTML = 'Not found employee or ' + error;
        companiesList.append(h2)
    })

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


// creo un objeto empleado nuevo
let newEmplooyee = {
    "employeeId": 19998,
    "companyId": 1,
    "firstName": "Alex",
    "lastName": "Echeverria",
    "email": "alexnahuelecheverria@gmail.com"
}


// mando por post a crear un nuevo empleado
postNewEmployee(newEmplooyee, urlEmployee)
    .then((response)=>{
        console.log("Mande un nuevo employee para probar si entra");
        console.log(response);
    })
    .catch((error)=>{
        console.log(Error(error));
        let h2 = document.createElement('h2')
        h2.innerHTML = 'Cannot register new employee or ' + error;
        companiesList.append(h2)
    })

// me traigo todos los empleados para ver como quedo registrado
// el nuevo empleado que mande a crear
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