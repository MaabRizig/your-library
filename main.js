let booksArr = [];

function Book(author,title,pageCount,readStatus){
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
}

Book.prototype.readStatusToText = function(){
    const VALUETOTEXT = {1:"Want to read", 2:"Reading", 3:"Finished"};
    return VALUETOTEXT[this.readStatus];
}

function addBook(author,title,pageCount,readStatus){
    let bookObj = new Book(author,title,pageCount,readStatus);
    booksArr.push(bookObj);
    return bookObj;
}

function displayBooks(){
    const BOOKSCONTAINER = document.querySelector(".books-container");

    booksArr.forEach((book)=>{
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
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


let addBookBtn = document.querySelector(".add-book");
let addBookDialog = document.querySelector("#add-dialog");
let submitBtn = document.querySelector("#submit-button");
let form = document.querySelector("#add-dialog form");


addBookBtn.addEventListener("click",()=>{
    addBookDialog.showModal();
});


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());
    console.log(dataObj );
    if(dataObj.title !== ""){
        addBookDialog.close();
        addBook(dataObj.author,dataObj.title,dataObj.pageCount,dataObj.readStatus);
        displayBooks();
    }
});


//let menuIcons = document.querySelectorAll(".book-menu");
//menuIcons.addEventListener("contextmenu",(e)=>{

// });











// ------------------------



// addBook("maab","how to make",454,1);
// addBook("ali","how to be a bee",343,2);
// addBook("maab","how to make",454,3);
// addBook("ali","how to be a bee",343,3);
// addBook("maab","how to make",454,2);
// addBook("ali","how to be a bee",343,1);
// console.log(booksArr);
// displayBooks();


