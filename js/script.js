/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Global variables
const searchInput = document.createElement('INPUT');
const searchButton = document.createElement('BUTTON');
const list = document.querySelectorAll('h3');

const studentList = document.getElementsByClassName('student-item cf');
const itemsPerPage = 10;





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
    const paretnUL = ul.parentNode;
    paretnUL.removeChild(ul);

}


function searchBar(list) {
    const p = document.createElement('P');
    const h2 = document.querySelector('h2');
    p.textContent = 'No results were found...';
    h2.appendChild(p);
    p.style.display = 'none';
    const searchValue = document.querySelector('.student-searchFunction');
    const searchResult = [];
    if (searchValue.value.length > 0) {
        for (let i = 0; i < list.length; i++) {

            if (searchValue.value.length !== 0 && list[i].textContent
                .toLowerCase().includes(searchValue.value.toLowerCase())) {
                list[i].style.display = '';
                searchResult.push(list[i]);
                showPage(searchResult, 1);
                removePagination();
                appendPageLinks(searchResult);
            } else {
                list[i].style.display = 'none';
            }
        }
        if (searchResult.length < 1) {
            removePagination();
            appendPageLinks(list);
            showPage(searchResult);
            if (searchValue.value.length !== 0) {
                p.style.display = '';

            } else {
                p.style.display = 'none';
            }
        }
    } else {
        for (let i = 0; i < list.length; i++) {
            list[i].style.display = '';
            removePagination();
            appendPageLinks(list);
            showPage(list, 1);
        }
    }



}



// This function displays only 10 students per page while hiding the rest.
function showPage(list, page) {
    let startIndex = (page * itemsPerPage) - itemsPerPage;
    let endIndex = page * itemsPerPage;
    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            list[i].style.display = '';
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
    ul.className = 'pagination__ul';
    div.className = 'pagination';
    divParent.appendChild(div);
    div.appendChild(ul);
    const totalPages = Math.ceil(list.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('LI');
        const a = document.createElement('A');
        a.setAttribute('href', '#')
        ul.appendChild(li);
        li.appendChild(a);
        a.textContent = i;
    }
    const allLinks = document.querySelectorAll('a');
    allLinks[0].className = 'active';
    for (let j = 0; j < allLinks.length; j++) {
        allLinks[j].addEventListener('click', (e) => {
            let allLinksTwo = document.querySelectorAll('a');
            showPage(list, event.target.textContent);
            for (let k = 0; k < allLinksTwo.length; k++) {
                allLinksTwo[k].classList.remove('active');
            }
            e.target.classList.add('active');
        });

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