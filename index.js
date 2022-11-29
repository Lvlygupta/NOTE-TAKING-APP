console.log("Hey this is the note taking app!");

showNotes();
let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");

  let notes = localStorage.getItem("notes");
  let num = 1;
  if (notes == null) {
    notesObj = [];
  num  = 1;

  } else if (addTitle.value == "") {
    num=0;
    alert("Add some title!");
  } else if (addTxt.textLength == 0 || addTitle.textLength == 0) {
    num = 0;
    alert("Add some content!");
  } else {
    num = 1;
    notesObj = JSON.parse(notes);
    
  }
  if(num!=0){
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
    };
    notesObj.push(myObj);
    
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    }
    showNotes();
});
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class=" Notescard my-2 mx-2 card" style="width: 18rem;">
                
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id = "${index}" onclick="delNote(this.id)" class="btn btn-primary" >Delete Note</button>
        </div>

      </div>
        `;
  });
  let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `
        <div class=" Notescard my-2 mx-2 card" style="width: 18rem;">
                
        <div class="card-body">
          <h5 class="card-title">Title</h5>
          <p class="card-text">Note</p>
          <a href="#" class="btn btn-primary" id="dltnots">Delete Note</a>
        </div>

      </div>
        `;
  }
}

function delNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  let notesElm = document.getElementById("notes");
  showNotes();
}
let st = document.getElementById("searchTxt");
st.addEventListener("input", function () {
  let inputVal = st.value.toLowerCase();
  let noteCards = document.getElementsByClassName("Notescard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
