/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Global variables

const studentList = document.getElementsByClassName('student-item cf');
const itemsPerPage = 10;
let page = 1;
// Math.ceil rounds UP to the next integer,
// without it, the page always starts at 'page 0'
let pageNumber = Math.ceil(studentList.length / itemsPerPage);

// This function shows only 10 students per page while hiding the rest,
// it works on list of any size.
function showPage(list, page) {
    let startIndex = (page * itemsPerPage) - itemsPerPage;
    let endIndex = page * itemsPerPage;
    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            list[i].style.display = 'list-item';
        } else {
            list[i].style.display = 'none';
        }
    }
}
showPage(studentList, page);

// This function

function appendPageLinks(list) {
    const divParent = document.querySelector('.page');
    const div = document.createElement('DIV');
    div.className = 'pagination';
    divParent.appendChild(div);
    const ul = document.createElement('UL');
    div.appendChild(ul);
    for (let i = 1; i <= pageNumber; i++) {
        const li = document.createElement('LI');
        const a = document.createElement('A');
        a.setAttribute('href', '#')
        ul.appendChild(li);
        li.appendChild(a);
        a.textContent = i;
        a.className = 'active';
        const allLinks = document.querySelectorAll('a');
        for (let i = 0; i <= allLinks.length; i++)
            a.addEventListener('click', (e) => {
                e.target.className = 'active';
                showPage(studentList, i);
            });
        a.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = '#0b6f91';
            //e.target.style = "font-size: 18px";
        });
        a.addEventListener('mouseout', (e) => {
            e.target.style.backgroundColor = '#4ba6c3';
            //e.target.style = "font-size: 16px";
        });
    }


}
appendPageLinks(studentList);

// Remember to delete the comments that came with this file, and replace them with your own code comments.s