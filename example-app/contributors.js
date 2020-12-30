import {
  body,
  selectBox,
  mainContainer,
  reposResult,
  reposTable,
  contributorsUl,
  sectionContributorsContainer,
} from "./createAllElements.js";

a = 1;
export function addContributors() {
  //getting the value of the selected repo
  const selectedRepo = selectBox.value;
  // fetching the selected repo to get and handle the data
  fetch(`https://api.github.com/repos/HackYourFuture/${selectedRepo}`)
    .then((res) => res.json())
    .then((res) => {
      //returning another promise which has the data of the contributors
      return fetch(res.contributors_url);
    })
    .then((data) => data.json())
    .then((data) => {
      //creating the default elemnt which holds word contributors
      contributorsUl.innerHTML = `<li class="shadow-sm p-3 mb-1 bg-light rounded default-contributors">
                                       Contributors
                                  </li>
                                  <div class='contributors-output'></div>`;
      // creating the div which will holds the pagination's buttons
      const buttonsWrapper = document.createElement("div");
      buttonsWrapper.classList.add("pagination");
      contributorsUl.appendChild(buttonsWrapper);

      // handle the case when there are no contributors, then we print this result on the li that holds contributors word,
      if (data.length === 0) {
        contributorsUl.innerHTML = `<li class="shadow-sm p-3 mb-1 alert alert-danger rounded">
                                         There is no Contributions on this Repo !!!
                                  </li>
                                  <div class='contributors-output'></div>`;
        // delete the arrow and paginations button when there is no contributors
        buttonsWrapper.innerHTML = "";
        //otherwise we start to create out variables and append them to the dom
      } else {
        let page = 1;
        const rows = 5;
        let currentPage;
        const totalPages = Math.ceil(data.length / 5);
        // using for loop to create everytime  total buttons according to the data we get
        for (let i = 1; i < totalPages + 1; i++) {
          buttonsWrapper.innerHTML += ` <li class="page-item" id='${i}'><a class="page-link" href="#"> ${i}</a></li> `;
        }

        // creating the next and previous arrows before and after the pagination's buttons and append them to the buttonsWrapper
        const prev = document.createElement("li");
        prev.innerHTML = `<a class="page-link prev" href="#"> < </a>`;
        const next = document.createElement("li");
        next.innerHTML = `<a class="page-link next" href="#"> > </a>`;
        buttonsWrapper.insertBefore(prev, buttonsWrapper.firstElementChild);
        buttonsWrapper.appendChild(next);
        //adding eventlistener to listen when user clicks on the arrow it will add 1 to the variable page which will be passed as parameter to our pagination function

        document.querySelector(".next").addEventListener("click", function () {
          // this condition to  stop the funcionality of the arrow when it reaches the last page
          if (page < totalPages) {
            page++;
            // after updating the page variable we call our function
            pagination(data, page, rows);
          }
        });

        document.querySelector(".prev").addEventListener("click", function () {
          // this condition to  stop the funcionality of the arrow when it reaches the first page
          if (page > 1) {
            page--;
            // after updating the page varibale we call our function again
            pagination(data, page, rows);
          }
        });

        // we call our pagination function, to append the first 5 results to the dom, as a default before clicking on any button
        pagination(data, page, rows);

        // adding evenlistener to the paginations button, to get the value of the selected button and pass it to our pagination function
        document.querySelectorAll(".page-item").forEach((item) => {
          item.addEventListener("click", function () {
            page = this.innerText;

            pagination(data, page, rows);
          });
        });
        // declaring our pagination function
        function pagination(data, page, rows) {
          document.querySelector(".contributors-output").innerHTML = "";
          page--;
          const start = page * rows;
          const end = start + rows;
          const res = data.slice(start, end);
          const totalPages = Math.ceil(data.length / 5);
          currentPage = page;
          // creating variable to hold all buttons to loop through and add style to the selected button
          const allPaginationButtons = document.querySelectorAll(".page-item");

          allPaginationButtons.forEach((el) => {
            el.firstElementChild.style.backgroundColor = "transparent";
            allPaginationButtons[
              currentPage
            ].firstElementChild.style.backgroundColor = "blue";
          });

          // handling the data and add the results of the contributors information to the dom based on clicked button value

          res.forEach((el) => {
            const createdListItem = document.createElement("li");
            createdListItem.className = "shadow p-3 mb-1 bg-white rounded";
            const createdContributorImg = document.createElement("img");
            createdContributorImg.src = `${el.avatar_url}`;
            const createdLink = document.createElement("a");
            createdLink.innerText = `${el.login}`;
            createdLink.className = "ml-3 text-primary";
            createdLink.href = `${el.html_url}`;
            createdLink.target = "_blank";
            const createdSpan = document.createElement("span");
            createdSpan.className = "badge badge-secondary float-right";
            createdSpan.innerText = `${el.contributions}`;
            document
              .querySelector(".contributors-output")
              .appendChild(createdListItem);
            createdListItem.appendChild(createdContributorImg);
            createdListItem.appendChild(createdLink);
            createdListItem.appendChild(createdSpan);

            //styling the section with shadow after being created
            sectionContributorsContainer.className =
              "output-contributors shadow bg-white rounded";
          });
        }
      }
    })

    .catch((err) => {
      const errorContainer = document.createElement("div");
      errorContainer.className = "alert alert-danger w-75 mx-auto p-3";
      errorContainer.innerText = ` Ooops!! There is something went wrong !!! `;
      body.insertBefore(errorContainer, mainContainer);
      reposResult.style.display = "none";
      console.log(err);
    });
}
