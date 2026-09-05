let booksArr = [];
const BOOKSCONTAINER = document.querySelector(".books-container");

function Book(title,author,pageCount,readStatus){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
}

Book.prototype.readStatusToText = function(){
    const VALUETOTEXT = {1:"Want to read", 2:"Reading", 3:"Finished"};
    return VALUETOTEXT[this.readStatus];
}


function addBook(title,author,pageCount,readStatus){
    let bookObj = new Book(title,author,pageCount,readStatus);
    booksArr.push(bookObj);
    return bookObj;
}

function displayBooks(){
    BOOKSCONTAINER.textContent = "";
    booksArr.forEach((book)=>{
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.dataset.id = book.id;
        let menuIcon = document.createElement("span");
        menuIcon.classList.add("book-menu","icon");
        let infoList = document.createElement("ul");

        let appendInfoElement = (preText,value)=>{
            let info = document.createElement("li");
            info.textContent = `${preText} ${value}`;
            infoList.appendChild(info);
        }

        appendInfoElement("",book.title);
        appendInfoElement("Author:",book.author);
        appendInfoElement("Page count: ",book.pageCount);
        appendInfoElement("Reading status: ",book.readStatusToText());
        
        bookDiv.appendChild(menuIcon);
        bookDiv.appendChild(infoList);
        BOOKSCONTAINER.appendChild(bookDiv);
    })
}

function deleteBook(id){
    let bookIndex = booksArr.findIndex((book)=>{
        if(book.id === id)
            return true;
        return false;
    });
    if(typeof bookIndex === 'number'){
        booksArr.splice(bookIndex,1);
        displayBooks();
    } else{
        throw Error("no book with this id");
    }
}


let addBookBtn = document.querySelector(".add-book");
let addBookDialog = document.querySelector("#add-dialog");
let submitBtn = document.querySelector("#submit-button");
let form = document.querySelector("#add-dialog form");
let menuDialog = document.querySelector(".menu");


let showFormDialogListener = addBookBtn.addEventListener("click",()=>{
    addBookDialog.showModal();
});


let submitFormInfoListener = form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());
    if(dataObj.title !== ""){
        addBookDialog.close();
        addBook(dataObj.title,dataObj.author,dataObj.pageCount,dataObj.readStatus);
        displayBooks();
    }
});


let showDialogListener = BOOKSCONTAINER.addEventListener("click",(e)=>{           
    if(e.target.classList.contains("book-menu")){
        menuDialog.show();
        let bookParent = e.target.closest(".book"); 
        console.log(bookParent);
        menuDialog.dataset.bookId = bookParent.dataset.id;
        let menuDialogWidth = parseInt(window.getComputedStyle(menuDialog).getPropertyValue("width"));
        menuDialog.style.left =` ${e.clientX - menuDialogWidth}px`;
        menuDialog.style.top = `${e.clientY}px`;
    }
});



menuDialog.addEventListener("click",(e)=>{
    let optionEle = e.target.closest("[data-type]");
    if(!optionEle)
        return;
    let optionType = optionEle.dataset.type;
    switch (optionType){
        case "deleteOpt":
            let bookId = menuDialog.dataset.bookId;
            deleteBook(bookId);
            break;
    }
    menuDialog.close();
}); 







addBook("AI Engineering","Chip Huyen",454,2);
addBook("Feature Engineering","Max Kuhn & Kjell Johnson",343,2);
addBook("Practical MLOps","Noah Gift & Alfredo Deza",454,1);
displayBooks();






