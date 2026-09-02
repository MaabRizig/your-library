let booksArr = [];

function Book(author,title,pageCount,readStatus){
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
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
        let infoList = document.createElement("ul");

        let appendInfoElement = (preText,value)=>{
            let info = document.createElement("li");
            info.textContent = `${preText} ${value}`;
            infoList.appendChild(info);
        }

        appendInfoElement("Title:",book.title);
        appendInfoElement("Author:",book.author);
        appendInfoElement("Page count: ",book.pageCount);
        appendInfoElement("Reading status: ",book.readStatus);
        
        bookDiv.appendChild(infoList);
        BOOKSCONTAINER.appendChild(bookDiv);
    })
}



// addBook("maab","how to make",454,"reading");
// addBook("ali","how to be a bee",343,"done reading");
// console.log(booksArr);
// displayBooks();


