// ======================================
// Nova Student Management System
// Array Data Structure Application
// ======================================


// Arrays

let studentIDs = [];
let studentNames = [];
let studentMarks = [];

let highlightedIndex = -1;





// ======================================
// DEFAULT STUDENTS
// ======================================

function createDefaultStudents(){


    studentIDs = Array.from(
        {length:20},
        (_,index)=>
        `PS/ITC/24/${String(index+1).padStart(4,"0")}`
    );



    studentNames = [

        "Kwame Mensah",
        "Patrick Nyamekye",
        "Ama Serwaa",
        "Kofi Asante",
        "Yaw Boateng",
        "Esi Owusu",
        "Daniel Addo",
        "Akosua Darko",
        "Michael Asare",
        "Abena Frimpong",
        "Kojo Mensimah",
        "Nana Osei",
        "Emmanuel Tetteh",
        "Adwoa Nyarko",
        "Samuel Arthur",
        "Josephine Annan",
        "Richmond Agyemang",
        "Mabel Kusi",
        "Brian Quaye",
        "Linda Mensah"

    ];



    studentMarks = [

        78,
        85,
        92,
        67,
        74,
        88,
        91,
        69,
        83,
        76,
        95,
        81,
        72,
        90,
        86,
        64,
        79,
        87,
        70,
        93

    ];



    saveData();

}







// ======================================
// LOAD DATA
// ======================================

function loadData(){


    let ids =
    JSON.parse(localStorage.getItem("studentIDs"));


    let names =
    JSON.parse(localStorage.getItem("studentNames"));


    let marks =
    JSON.parse(localStorage.getItem("studentMarks"));





    if(

        Array.isArray(ids) &&
        Array.isArray(names) &&
        Array.isArray(marks) &&
        ids.length > 0

    ){


        studentIDs = ids;

        studentNames = names;

        studentMarks = marks;


    }

    else{


        createDefaultStudents();


    }


}







// ======================================
// SAVE DATA
// ======================================

function saveData(){


    localStorage.setItem(
        "studentIDs",
        JSON.stringify(studentIDs)
    );


    localStorage.setItem(
        "studentNames",
        JSON.stringify(studentNames)
    );


    localStorage.setItem(
        "studentMarks",
        JSON.stringify(studentMarks)
    );


}







// ======================================
// ELEMENTS
// ======================================

const studentNumber =
document.getElementById("studentNumber");


const studentName =
document.getElementById("studentName");


const studentMark =
document.getElementById("studentMark");


const addBtn =
document.getElementById("addBtn");


const studentTable =
document.getElementById("studentTable");


const searchID =
document.getElementById("searchID");


const searchResult =
document.getElementById("searchResult");


const totalStudents =
document.getElementById("totalStudents");


const averageMark =
document.getElementById("averageMark");


const highestMark =
document.getElementById("highestMark");


const lowestMark =
document.getElementById("lowestMark");







// ======================================
// CREATE ID
// ======================================

function generateID(number){

    return "PS/ITC/24/" +
    String(number).padStart(4,"0");

}







// ======================================
// ADD STUDENT
// ======================================

addBtn.addEventListener("click",()=>{


    let number =
    studentNumber.value.trim();


    let name =
    studentName.value.trim();


    let mark =
    Number(studentMark.value);




    if(

        number === "" ||
        name === "" ||
        studentMark.value === "" ||
        mark < 0 ||
        mark > 100

    ){

        alert("Enter valid student details");

        return;

    }





    let id =
    generateID(number);





    if(studentIDs.includes(id)){


        alert("Student ID already exists");

        return;

    }




    studentIDs.push(id);

    studentNames.push(name);

    studentMarks.push(mark);



    saveData();

    displayStudents();

    updateStatistics();



    studentNumber.value="";
    studentName.value="";
    studentMark.value="";


});







// ======================================
// DISPLAY STUDENTS
// ======================================

function displayStudents(){


    studentTable.innerHTML="";



    studentIDs.forEach((id,index)=>{


        studentTable.innerHTML += `


        <tr class="${index===highlightedIndex ? "highlight":""}">


        <td>${id}</td>


        <td>${studentNames[index]}</td>


        <td>${studentMarks[index]}</td>



        <td>


        <button onclick="editStudent(${index})">

        <i class="fa-solid fa-pen"></i>

        </button>



        <button onclick="deleteStudent(${index})">

        <i class="fa-solid fa-trash"></i>

        </button>


        </td>


        </tr>


        `;


    });


}







// ======================================
// SEARCH
// ======================================

function searchStudent(){


    let value =
    searchID.value
    .toLowerCase()
    .trim();



    highlightedIndex=-1;



    let index=-1;



    if(value===""){


        displayStudents();

        searchResult.innerHTML="";

        return;

    }





    // NUMBER SEARCH FIRST

    if(!isNaN(value)){


        index =
        studentIDs.indexOf(
            generateID(value)
        );


    }






    // EXACT ID

    if(index===-1){


        index =
        studentIDs.findIndex(id=>

            id.toLowerCase()===value

        );


    }





    // NAME SEARCH

    if(index===-1){


        index =
        studentNames.findIndex(name=>

            name.toLowerCase()
            .includes(value)

        );


    }





    if(index===-1){


        searchResult.innerHTML =
        "❌ Student not found";


        displayStudents();

        return;


    }





    highlightedIndex=index;


    displayStudents();



    searchResult.innerHTML = `

    <b>✅ Student Found</b>

    <br><br>

    ID: ${studentIDs[index]}

    <br>

    Name: ${studentNames[index]}

    <br>

    Mark: ${studentMarks[index]}

    `;


}







// ======================================
// EDIT
// ======================================

function editStudent(index){


    let name =
    prompt(
        "Update name",
        studentNames[index]
    );



    let mark =
    prompt(
        "Update mark",
        studentMarks[index]
    );




    if(name){

        studentNames[index]=name;

    }



    if(mark!==null && mark>=0 && mark<=100){

        studentMarks[index]=Number(mark);

    }



    saveData();

    displayStudents();

    updateStatistics();


}







// ======================================
// DELETE
// ======================================

function deleteStudent(index){


    if(confirm("Delete student?")){


        studentIDs.splice(index,1);

        studentNames.splice(index,1);

        studentMarks.splice(index,1);



        saveData();

        displayStudents();

        updateStatistics();


    }


}







// ======================================
// STATISTICS
// ======================================

function updateStatistics(){


    totalStudents.innerHTML =
    studentIDs.length;



    if(studentMarks.length===0){

        averageMark.innerHTML="0";

        highestMark.innerHTML="-";

        lowestMark.innerHTML="-";

        return;

    }




    let total =
    studentMarks.reduce(
        (sum,mark)=>sum+mark,
        0
    );



    averageMark.innerHTML =
    (total/studentMarks.length)
    .toFixed(2);



    highestMark.innerHTML =
    Math.max(...studentMarks);



    lowestMark.innerHTML =
    Math.min(...studentMarks);


}








// ======================================
// START APP
// ======================================

loadData();

displayStudents();

updateStatistics();