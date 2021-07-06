'use strict';

let myForm = document.getElementById('myForm');
let myTable = document.getElementById('myTable');
let sumOfCapacity =  document.getElementById('sumOfCapacity');

function Flights(from , to , capacity ,reservedseats ){
    this.from = from;
    this.to = to;
    this.capacity = capacity;
    this.reservedseats = reservedseats;
    this.emptyseats = 0;
    Flights.all.push(this);
}

Flights.all = [];


Flights.prototype.setemptyseats = function(){
   this.emptyseats = this.capacity - this.reservedseats;
   
}

function maketableHeader(){
    let tr = document.createElement('tr');
    myTable.appendChild(tr);

    let th1 = document.createElement('th');
    tr.appendChild(th1);
    th1.textContent = 'from';

    let th2 = document.createElement('th');
    tr.appendChild(th2);
    th2.textContent = 'to';

    let th3 = document.createElement('th');
    tr.appendChild(th3);
    th3.textContent = 'capacity';

    let th4 = document.createElement('th');
    tr.appendChild(th4);
    th4.textContent = 'reservedseats';

    let th5 = document.createElement('th');
    tr.appendChild(th5);
    th5.textContent = 'emptyseats';
}


Flights.prototype.render = function(){

    

    let tr2 = document.createElement('tr');
    myTable.appendChild(tr2);

    let td1 = document.createElement('td');
    tr2.appendChild(td1);
    td1.textContent = this.from;

    
    let td2 = document.createElement('td');
    tr2.appendChild(td2);
    td2.textContent = this.to;

    
    let td3 = document.createElement('td');
    tr2.appendChild(td3);
    td3.textContent = this.capacity;

    
    let td4 = document.createElement('td');
    tr2.appendChild(td4);
    td4.textContent = this.reservedseats;

    let td5 = document.createElement('td');
    tr2.appendChild(td5);
    td5.textContent = this.emptyseats;

    
    
   
}

function sumofcapcityflights(){
    let sum = 0;
    for(let i =0 ; i<Flights.all.length; i++){
        sum += Number(Flights.all[i].capacity);
    }

    let p = document.createElement('p');
    sumOfCapacity.appendChild(p);
    p.textContent = ` the sum of all capacity is : ${sum}`;

}


function myFlightsHandler(eve){
    eve.preventDefault();

    let from = eve.target.from.value;
    let to = eve.target.to.value;
    let capacity = eve.target.capacity.value;
    let reservedseats = eve.target.reservedseats.value;

    let newFlight = new Flights(from,to,capacity,reservedseats);

    newFlight.setemptyseats();
    newFlight.render();
    sumofcapcityflights();

    localStorage.setItem('myflight' , JSON.stringify(Flights.all));
}


function getData(){
    let data = JSON.parse(localStorage.getItem('myflight'));
    if(data){
        for(let i =0; i<data.length;i++){
            let newFlight = new Flights(data[i].from, data[i].to, data[i].capacity, data[i].reservedseats);
            newFlight.setemptyseats();
            newFlight.render();
            
        }
    }
}

maketableHeader();
getData();
sumofcapcityflights();
myForm.addEventListener('submit' , myFlightsHandler);