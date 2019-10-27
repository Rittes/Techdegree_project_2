/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Global variables
const searchInput = document.createElement('INPUT');
const searchButton = document.createElement('BUTTON');
const list = document.querySelectorAll('h3');
const p = document.createElement('P');
const studentList = document.getElementsByClassName('student-item cf');
const itemsPerPage = 10;

function showPara(string) {
    const h2 = document.querySelector('h2');
    p.textContent = string;
    return h2.appendChild(p);
}


// This function dynamically adds the search bar to the page.

function appendSearchBar() {
    const headerDiv = document.getElementsByClassName('page-header cf')[0];
    const searchDiv = document.createElement('DIV');
    searchDiv.className = 'student-search';
    searchInput.placeholder = 'Search for students...';
    searchButton.textContent = 'Search';
    searchInput.className = 'student-searchFunction';
    headerDiv.appendChild(searchDiv);
    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);
}
appendSearchBar();

function removePagination() {
    const ul = document.getElementsByTagName('ul')[1];
    return ul.parentNode.removeChild(ul);
}

function searchBar(list) {
    const searchValue = document.querySelector('.student-searchFunction');
    const searchResult = [];
    for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('student-search');

        if (searchValue.value.length !== 0 && list[i].textContent
            .toLowerCase().includes(searchValue.value.toLowerCase())) {
            list[i].classList.add('student-search');
            searchResult.push(list[i]);
            list[i].style.display = 'block';
            showPage(studentList, 1);
            removePagination();

            appendPageLinks(searchResult);

        } else if (searchResult.length < 1 && searchValue.value.length !== 0) {
            showPara("No results were found...");
            removePagination();
            list[i].style.display = 'none';


        } else if (searchValue.value.length === 0) {
            showPage(studentList, 1);
            showPara('');

        } else {
            list[i].style.display = 'none';

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


// This function creates 'div' 'ul' 'li' 'a' elements and append them to the page.
// It loops over the list to create numbered links .


function appendPageLinks(list) {
    const divParent = document.querySelector('.page');
    const div = document.createElement('DIV');
    const ul = document.createElement('UL');

    for (let i = 1; i <= list.length; i++) {
        const li = document.createElement('LI');
        const a = document.createElement('A');
        a.setAttribute('href', '#')
        div.className = 'pagination';
        divParent.appendChild(div);
        div.appendChild(ul);
        if (i <= Math.ceil(list.length / itemsPerPage)) {
            ul.appendChild(li);
            li.appendChild(a);
            a.textContent = i;
            const allLinks = document.querySelectorAll('a');
            allLinks[0].className = 'active';
            for (let j = 0; j <= allLinks.length; j++) {
                a.addEventListener('click', (e) => {
                    allLinks[j].classList.remove('active');
                    e.target.classList.add('active');

                    showPage(studentList, a.textContent);
                });
            }
        }
    }

}


searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    searchBar(studentList);
});


searchInput.addEventListener('keyup', () => {
    searchBar(studentList);
});

showPage(studentList, 1);
appendPageLinks(studentList);