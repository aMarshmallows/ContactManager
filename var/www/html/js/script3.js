//initializing buttons
const addButton = document.getElementById('addButton');
const searchButton = document.getElementById('searchBtn');
const seeAllButton = document.getElementById('seeAll');
const saveButton = document.getElementById('saveButton');
const cancelEditButton = document.getElementById('cancelButton');
const greeting = document.getElementById('greeting');
const logoutButton = document.getElementById('logout');

//initializing UI elements
const firstName = sessionStorage.getItem('firstName');
const usrID = sessionStorage.getItem('userId');
greeting.textContent = 'Welcome, ' + firstName;
saveButton.style.display = "none";
cancelEditButton.style.display = "none";

let contacts = []

// loading all contacts upon login
// fetching from API
fetch("http://cop4331group20.online/LAMPAPI/SearchContacts.php",{
    method: 'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        userId: usrID, // matches userId to the one who's logged in
        search: ""
    })
}).then(res => {
    return res.json()
}).then(data => {
    let tableData = "";
    let counter = 0;
    // adding each contact from API JSON
    contacts = data["results"].map((values)=>{
        tableData+= `
        <tr id="row${counter}">
        <td>${values.Name}</td>
        <td>${values.Email}</td>
        <td>${values.Phone}</td>
        <td><button class="buttons" id="${counter}" onclick="remove(this)">Delete</button><button class="buttons" id="${counter}" onclick="editInitialize(this)">Edit</button></td>
        </tr>
        `
        counter++;

        return{Name: values.Name, Email: values.Email, Phone: values.Phone}
    })

    document.getElementById("table_body").innerHTML = tableData;
}).catch(error=>console.log('ERROR'))

// search function
searchButton.addEventListener('click', () => {
    const value = document.getElementById("search").value;

    // empty field check
    if(value == '' || value == null){
        alert("Please fill all required fields.")
        return;
    }

    let tableData2 = "";
    let counter3 = 0;
    // if the contact in the contact list contains what is searched, it will show up in the table
    contacts.forEach(contact => {
        const isVisible = contact.Name.toLowerCase().includes(value) || contact.Email.toLowerCase().includes(value) || contact.Phone.includes(value) || contact.Name.includes(value) || contact.Email.includes(value) || contact.Name.toUpperCase().includes(value) || contact.Email.toUpperCase().includes(value);
        
        let flag = 0 // used for button IDs that is used later in edit and remove
        
        if(isVisible == true){
            tableData2 += `<tr>
            <td>${contact.Name}</td>
            <td>${contact.Email}</td>
            <td>${contact.Phone}</td>
            <td><button class="buttons" id="${counter3}" onclick="remove(this)">Delete</button><button class="buttons" id="${counter3}" onclick="editInitialize(this)">Edit</button></td>
            </tr>`
            counter3++;
            flag++
        }
        
        if(flag == 0){
          counter3++
        }
    })

    document.getElementById("table_body").innerHTML = tableData2;
})

// show all contacts
// same as initial fetch of values
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
        let tableData3 = "";
        let counter2 = 0;
        contacts = data["results"].map((values)=>{
            tableData3+= `<tr>
            <td>${values.Name}</td>
            <td>${values.Email}</td>
            <td>${values.Phone}</td>
            <td><button class="buttons" id="${counter2}" onclick="remove(this)">Delete</button><button class="buttons" id="${counter2}" onclick="editInitialize(this)">Edit</button></td>
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

    // empty field check
    if(nameIn.value == '' || nameIn.value == null || emailIn.value == '' || emailIn.value == null || phoneIn.value == '' || phoneIn.value == null){
		alert("Please fill all required fields.");
		return;
	}

    // calling API
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
        location.reload();
    }).catch(error => console.log("Failed to add contact."))
});

// delete contact API
function remove(button){
    let number = button.id
    let row = document.getElementById('row'+number)
    let deleteID = 0
    let deleteName = ""

    // calling API
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
        deleteID = data["results"][number].ID
        deleteName = data["results"][number].Name

        // fetch within fetch so that deleteID and deleteName variables work with delete fetch
        fetch("http://cop4331group20.online/LAMPAPI/DeleteContacts.php", {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            ID: deleteID,
            Name: deleteName
        })
        }).then(res => {
            return res.json()
        }).then(data => {
            location.reload();
        }).catch(error=>console.log('ERROR'))
            
        }).catch(error=>console.log('ERROR'))
}

//logout logic
logoutButton.addEventListener('click', () => {
    localStorage.clear();
    location.href = "./index.html?#";
})

//Initilizes page for Edit contact function
function editInitialize(button){
    let number = button.id
    let row = document.getElementById('row'+number)
    let ID = 0;

    //Changing ui elements
    const currentsetting = document.getElementById('currentSetting');
    currentsetting.textContent = "- Edit Contact -";
    addButton.style.display = "none";
    cancelEditButton.style.display = "initial";
    saveButton.style.display = "initial";
    
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
        let nameIn = document.getElementById("name1");
        nameIn.value = data["results"][number].Name;
        let emailIn = document.getElementById("email1");
        emailIn.value = data["results"][number].Email;
        let phoneIn = document.getElementById("phoneNumber1");
        phoneIn.value = data["results"][number].Phone;
        window.ID = data["results"][number].ID;
            
        }).catch(error=>{
            console.log('ERROR');
        })
}
//Updates contact
saveButton.addEventListener('click', () => {
    let nameIn = document.getElementById("name1").value;
    let emailIn = document.getElementById("email1").value;
    let phoneIn = document.getElementById("phoneNumber1").value;


    fetch("http://cop4331group20.online/LAMPAPI/UpdateContacts.php", {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            ID: window.ID,
            Name: nameIn,
            Phone: phoneIn,
            Email: emailIn
        })
        }).then(res => {
            return res.json()
        }).then(data => {
            revertCurrentSetting();
            location.reload();
        }).catch(error=> {
            console.log('ERROR')
            revertCurrentSetting();
        })
})

cancelEditButton.addEventListener('click', () =>{
    revertCurrentSetting();
})

function revertCurrentSetting(){
    //Changing ui elements
    const currentsetting = document.getElementById('currentSetting');
    currentsetting.textContent = "Add Contact";
    addButton.style.display = "initial";
    cancelEditButton.style.display = "none";
    saveButton.style.display = "none";

    let nameIn = document.getElementById("name1");
    let emailIn = document.getElementById("email1");
    let phoneIn = document.getElementById("phoneNumber1");

    nameIn.value = "";
    emailIn.value = "";
    phoneIn.value = "";
}

// ssh root@67.205.165.241
// http://cop4331group20.online/contacts.html