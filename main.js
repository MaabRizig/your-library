let booksArr = [];
const BOOKSCONTAINER = document.querySelector(".books-container");

function Book(title,author,pageCount,readStatus){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
}

Book.prototype[1] = "Want to read";  // Read status codes 
Book.prototype[2] = "Reading";
Book.prototype[3] = "Finished";

Book.prototype.readStatusToText = function(){
    // const VALUETOTEXT = {1:"Want to read", 2:"Reading", 3:"Finished"};
    // return VALUETOTEXT[this.readStatus];
    return this[this.readStatus];
}

Book.prototype.changeReadStatus = function(value){
    if(this[value]){
        this.readStatus = value;
    } else {
        throw Error("invalid read status value");
    }  
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


function findBookIndex(bookId){
    let index = booksArr.findIndex((book)=>(book.id === bookId)?true:false);
    if(index === -1)
        return null;
    return index;
}

function deleteBook(id){
    let bookIndex = findBookIndex(id);
    if(bookIndex || bookIndex === 0){
        booksArr.splice(bookIndex,1);
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
        menuDialog.dataset.bookId = bookParent.dataset.id;
        let menuDialogWidth = parseInt(window.getComputedStyle(menuDialog).getPropertyValue("width"));
        let extraPixels = 10;
        menuDialog.style.left =` ${e.clientX - menuDialogWidth - extraPixels}px`;
        menuDialog.style.top = `${e.clientY}px`;
    }
});




menuDialog.addEventListener("click",(e)=>{
    let bookId = menuDialog.dataset.bookId;
    let checkClosest = (selector)=>{
        let parentEle = e.target.closest(selector);
        return (parentEle)?true:false;
    }

    if(checkClosest("[data-read-value]")){
        let optionEle = e.target.closest("[data-read-value]");
        let readValue = optionEle.dataset.readValue;
        let bookIndex = findBookIndex(bookId);
        if(bookIndex || bookIndex === 0){
            booksArr[bookIndex].changeReadStatus(readValue);
            displayBooks();
        }

    }else if(checkClosest("[data-opt-type]")){
        let optionEle = e.target.closest("[data-opt-type]");
        let optionType = optionEle.dataset.optType;
        switch (optionType){
            case "deleteOpt":
                deleteBook(bookId);
                displayBooks();
                break;
        }
    }else {
        return;
    }
    menuDialog.close();
}); 





addBook("AI Engineering","Chip Huyen",454,2);
addBook("Feature Engineering","Max Kuhn & Kjell Johnson",343,2);
addBook("Practical MLOps","Noah Gift & Alfredo Deza",454,1);
displayBooks();

