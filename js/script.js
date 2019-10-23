/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Global variables
const searchInput = document.createElement('INPUT');
const searchButton = document.createElement('BUTTON');
const names = document.querySelectorAll('h3');
const studentList = document.getElementsByClassName('student-item cf');
const itemsPerPage = 10;
let pageNumber = Math.ceil(studentList.length / itemsPerPage);

// This function dynamically adds the search bar to the page.

function appendSearchBar() {
    const headerDiv = document.getElementsByClassName('page-header cf')[0];
    const searchDiv = document.createElement('DIV');
    searchDiv.className = 'student-search';
    searchInput.placeholder = 'Search for students...';
    searchButton.textContent = 'Search';
    headerDiv.appendChild(searchDiv);
    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);
}
appendSearchBar();

function searchBar(searchInput, names) {
    console.log(searchInput);
    console.log(names);
    const searchResult = [];
    for (let i = 0; i < names.length; i++) {
        names[i].classList.remove('student-search');
        if (searchInput.value.length !== 0 && names[i].textContent
            .toLowerCase().includes(searchInput.value.toLowerCase())) {
            names[i].classList.add('student-search');
            searchResult.push(names[i]);
        }
    }
}


// This function displays only 10 students per page while hiding the rest.
function showPage(list, page) {
    let startIndex = (page * itemsPerPage) - itemsPerPage;
    let endIndex = page * itemsPerPage;
    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            list[i].style.display = 'block';
        } else {
            list[i].style.display = 'none';
        }
    }
}
showPage(studentList, 1);

// This function creates 'div' 'ul' 'li' 'a' elements and append them to the page.
// It loops over the list to create numbered links .

function appendPageLinks(list) {
    const divParent = document.querySelector('.page');
    const div = document.createElement('DIV');
    const ul = document.createElement('UL');
    div.className = 'pagination';
    divParent.appendChild(div);
    div.appendChild(ul);
    for (let i = 1; i <= pageNumber; i++) {
        const li = document.createElement('LI');
        const a = document.createElement('A');
        a.setAttribute('href', '#')
        ul.appendChild(li);
        li.appendChild(a);
        a.textContent = i;
        a.className = 'active';
        a.addEventListener('click', (e) => {
            a.classList.remove('active');
            e.target.className = 'active';
            showPage(list, i);
        });
    }
}
appendPageLinks(studentList);

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    searchBar(searchInput, names);
    showPage(names, 1)
});


searchInput.addEventListener('keyup', () => {
    searchBar(searchInput, names);
});