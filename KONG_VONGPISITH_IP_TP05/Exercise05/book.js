var selectedRow = null;
            let header = document.getElementsByClassName("header-add")[0];
            let books = [{}];
            const getB = localStorage.getItem('books');
            const dataB = JSON.parse(getB);

            let results = [];
            let output = '';

            var loading = (value) => {
                if (value == 'true') {
                    setTimeout(() => {

                    }, 1000)
                    document.getElementsByClassName('loading')[0].style.display = 'flex'
                    document.getElementsByClassName('container')[0].style.display = 'none'
                } else {
                    document.getElementsByClassName('container')[0].style.display = 'flex';
                    document.getElementsByClassName('loading')[0].style.display = 'none';
                }
            }
            loading("true");

            fetch('https://jsonplaceholder.typicode.com/photos').then(async(res) => {
                results = await res.json();
                var title = '';
                for (result in results) {
                    output +=
                        `<div class="items">` +
                        `<img src="${results[result].url}" alt="#">` +
                        `<div class="name">Title : ${results[result].title.toString().substring(0, 10)}...</div>` +
                        `<div class="price">Id : ${results[result].id}</div>` +
                        `<div class="category">Album ID : ${results[result].albumId}</div>` +
                        `<button class="btn">` +
                        `<a href="./fetchapi-detail.html?bookid=${parseInt(result)+1}">see more</a>` +
                        `</button>` +
                        `</div>`;
                }
                document.getElementById("add_items").innerHTML += output;
                setTimeout(() => {
                    loading("false");
                }, 100)

            });

            function onFormSubmit(e) {
                event.preventDefault();
                var formData = readFormData();
                if (selectedRow === null) {
                    insertNewRecord(formData);
                } else {
                    updateRecord(formData);
                }
                resetForm();
            }

            document.querySelector('.add_book').placeholder = '';
            function readFormData() {
                var formData = {};
                formData["name_book"] = document.getElementById("name_book").value;
                formData["price_book"] = document.getElementById("price_book").value;
                formData["category_book"] = document.getElementById("category_book").value;
                return formData;
            }
            function insertNewRecord(data) {
                const getdata = localStorage.getItem('books');
                let databookss = JSON.parse(getdata);

                books = Object.assign([{}], databookss);
                let x;
                if (databookss == null) {
                    x = 0
                } else {
                    x = databookss.length;
                }
                const book = {
                    name: `${data.name_book}`,
                    price: `${data.price_book}`,
                    category: `${data.category_book}`
                };
                books[x] = book;
                localStorage.setItem('books', JSON.stringify(books));
                let databooks = getbooks();

                document.getElementById("add_items").innerHTML +=
                    `<div class="items">` +
                    `<img src="./img/book.png" alt="#">` +
                    `<div class="name">Name : ${databooks[x].name}</div>` +
                    `<div class="price">Price : ${databooks[x].price} riels</div>` +
                    `<div class="category">Category : ${databooks[x].category}</div>` +
                    `<div class="button">` +
                    `<button id="${parseInt(x)}" class="editBtn" onclick="editBook(this.id)">Edit</button>` +
                    `<button id="${parseInt(x)}" class="deleteBtn" onclick="deleteBook(this.id)">Delete</button>` +
                    `</div>` +
                    `</div>`;
            }
            function editBook(id) {
                header.innerHTML = "Edit information here!";
                header.style.backgroundColor = "rgb(61,133,198)";

                let getdatabooks = getbooks();

                selectedRow = id;
                document.getElementsByClassName("edit_book")[0].style.visibility = 'visible';
                document.getElementsByClassName("add_book")[0].style.visibility = 'hidden';

                document.getElementById('name_book').value = getdatabooks[id].name;
                document.getElementById('price_book').value = getdatabooks[id].price;
                document.getElementById('category_book').value = getdatabooks[id].category;
            }

            function updateRecord(formData) {
                document.getElementsByClassName("name")[selectedRow].innerHTML = "Name : " + formData.name_book;
                document.getElementsByClassName("price")[selectedRow].innerHTML = "Price : " + formData.price_book + " riels";
                document.getElementsByClassName("category")[selectedRow].innerHTML = "Category : " + formData.category_book;
                document.getElementsByClassName("edit_book")[0].style.visibility = 'hidden';
                document.getElementsByClassName("add_book")[0].style.visibility = 'visible';
                let bookss = getbooks();
                const bookUpdate = {
                    name: `${formData.name_book}`,
                    price: `${formData.price_book}`,
                    category: `${formData.category_book}`
                };
                books = Object.assign([{}], bookss);
                books[selectedRow] = bookUpdate;
                localStorage.setItem('books', JSON.stringify(books));

                document.getElementsByClassName("header-add")[0].innerHTML = "Add new book here!";
                header.style.backgroundColor = "rgb(147, 196, 125)";
                selectedRow = null;
            }

            function deleteBook(id) {
                let databooks = getbooks();
                if (confirm('Do you want to delete this record?')) {
                    databooks.splice(id, 1);
                    localStorage.setItem('books', JSON.stringify(databooks));
                    document.getElementById("add_items").innerHTML = '';
                    document.getElementById("add_items").innerHTML = `<div class="book-info">Book</div>`;
                    for (databook in databooks) {
                        document.getElementById("add_items").innerHTML +=
                            `<div class="items">` +
                            `<img src="./img/book\.png" alt="#">` +
                            `<div class="name">Name : ${databooks[databook].name}</div>` +
                            `<div class="price">Price : ${databooks[databook].price} riels</div>` +
                            `<div class="category">Category : ${databooks[databook].category}</div>` +
                            `<div class="button">` +
                            `<button id="${parseInt(databook)}" class="editBtn" onclick="editBook(this.id)">Edit</button>` +
                            `<button id="${parseInt(databook)}" class="deleteBtn" onclick="deleteBook(this.id)">Delete</button>` +
                            `</div>` +
                            `</div>`;
                    }
                }
                resetForm();
            }

            function resetForm() {
                document.getElementById('name_book').value = '';
                document.getElementById('price_book').value = '';
                document.getElementById('category_book').value = '';
            }

            //get books from localstorage
            function getbooks() {
                const getbooks = localStorage.getItem('books');
                let databooks = JSON.parse(getbooks);

                return databooks;
            }