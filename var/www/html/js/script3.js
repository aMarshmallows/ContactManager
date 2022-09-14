const addButton = document.getElementById('addButton');
const searchButton = document.getElementById('searchBtn');
const seeAllButton = document.getElementById('seeAll');
const greeting = document.getElementById('greeting');

const usrID = sessionStorage.getItem('userId');
const firstName = sessionStorage.getItem('firstName');
greeting.textContent = 'Welcome, ' + firstName;

let contacts = []


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
    contacts = data["results"].map((values)=>{
        tableData+= `<tr>
        <td>${values.Name}</td>
        <td>${values.Email}</td>
        <td>${values.Phone}</td>
        </tr>`

        return{Name: values.Name, Email: values.Email, Phone: values.Phone}
    })

    document.getElementById("table_body").innerHTML = tableData;
}).catch(error=>console.log('ERROR'))

// search function
searchButton.addEventListener('click', () => {
    const value = document.getElementById("search").value;

    let tableData2 = "";
    contacts.forEach(contact => {
        const isVisible = contact.Name.toLowerCase().includes(value) || contact.Email.toLowerCase().includes(value) || contact.Phone.includes(value);
        
        if(isVisible == true){
            tableData2 += `<tr>
            <td>${contact.Name}</td>
            <td>${contact.Email}</td>
            <td>${contact.Phone}</td>
            </tr>`
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
        let tableData = "";
        contacts = data["results"].map((values)=>{
            tableData+= `<tr>
            <td>${values.Name}</td>
            <td>${values.Email}</td>
            <td>${values.Phone}</td>
            </tr>`

            return{Name: values.Name, Email: values.Email, Phone: values.Phone}
    })

    document.getElementById("table_body").innerHTML = tableData;

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


// http://cop4331group20.online/contacts.html