const addButton = document.getElementById('addButton');
const searchButton = document.getElementById('searchBtn');
const seeAllButton = document.getElementById('seeAll');
const greeting = document.getElementById('greeting');

const firstName = sessionStorage.getItem('firstName');
const usrID = sessionStorage.getItem('userId');
greeting.textContent = 'Welcome, ' + firstName;

let contacts = []
function getClickID(clickID){
     
}

// loading table values API
fetch("http://cop4331group20.online/LAMPAPI/SearchContacts.php",{
    method: 'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        userId: usrID,
        search: ""
    })
}).then(res => {
    return res.json()
}).then(data => {
    console.log(data["results"][0])
    let tableData = "";
    let counter = 0;
    contacts = data["results"].map((values)=>{
        tableData+= `<tr>
        <td>${values.Name}</td>
        <td>${values.Email}</td>
        <td>${values.Phone}</td>
        <td><button class="buttons" id="delete${counter}" onclick="getClickID(this.id)">Delete</button><button class="buttons" id="edit${counter}" onclick="getClickID(this.id)">Edit</button></td>
        </tr>`
        counter++;

        return{Name: values.Name, Email: values.Email, Phone: values.Phone}
    })

    document.getElementById("table_body").innerHTML = tableData;
}).catch(error=>console.log('ERROR'))

// search function
searchButton.addEventListener('click', () => {
    const value = document.getElementById("search").value;

    let tableData2 = "";
    let counter3 = 0;
    contacts.forEach(contact => {
        const isVisible = contact.Name.toLowerCase().includes(value) || contact.Email.toLowerCase().includes(value) || contact.Phone.includes(value);
        
        if(isVisible == true){
            tableData2 += `<tr>
            <td>${contact.Name}</td>
            <td>${contact.Email}</td>
            <td>${contact.Phone}</td>
            <td><button class="buttons" id="delete${counter3}" onclick="getClickID(this.id)">Delete</button><button class="buttons" id="edit${counter3}" onclick="getClickID(this.id)">Edit</button></td>
            </tr>`
            counter3++;
        }
    })

    document.getElementById("table_body").innerHTML = tableData2;
})

// show all contacts
seeAllButton.addEventListener('click', () => {

    fetch("http://cop4331group20.online/LAMPAPI/SearchContacts.php",{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            userId: usrID,
            search: ""
        })
    }).then(res => {
        return res.json()
    }).then(data => {
        console.log(data["results"][0])
        let tableData3 = "";
        let counter2 = 0;
        contacts = data["results"].map((values)=>{
            tableData3+= `<tr>
            <td>${values.Name}</td>
            <td>${values.Email}</td>
            <td>${values.Phone}</td>
            <td><button class="buttons" id="delete${counter2}" onclick="getClickID(this.id)">Delete</button><button class="buttons" id="edit${counter2}" onclick="getClickID(this.id)">Edit</button></td>
            </tr>`
            counter2++;

            return{Name: values.Name, Email: values.Email, Phone: values.Phone}
    })

    document.getElementById("table_body").innerHTML = tableData3;

    }).catch(error=>console.log('ERROR'))
   
})

// add contact API
addButton.addEventListener('click', () => {
    let nameIn = document.getElementById("name1");
    let emailIn = document.getElementById("email1");
    let phoneIn = document.getElementById("phoneNumber1");
    // let userIDIn = document.getElementById("userID");

    if(nameIn == '' || nameIn == null 
	|| emailIn == '' || emailIn == null 
	|| phoneIn == '' || phoneIn == null
    ){
		alert("Please Fill All Required Field");
		return;
	}

    console.log(nameIn.value, emailIn.value, phoneIn.value);

    fetch("http://cop4331group20.online/LAMPAPI/AddContacts.php",{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name: nameIn.value,
            Email: emailIn.value,
            Phone: phoneIn.value,
            userId: usrID
        })
    }).then(res => {
        return res.json()
    }).then(data => {
        console.log(data);
        location.reload();
    }).catch(error => console.log("Failed to add contact."))
});

// delete contact API


// ssh root@67.205.165.241
// http://cop4331group20.online/contacts.html