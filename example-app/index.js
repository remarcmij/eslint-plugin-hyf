"use strict";

const dom = {
  header: null,
  mainContainer: null,
};

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        resolve(xhr.response);
      } else {
        reject(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => reject(new Error("Network request failed"));
    xhr.send();
  });
}

function createAndAppend(name, parent, options = {}) {
  const elem = document.createElement(name);
  parent.appendChild(elem);
  Object.entries(options).forEach(([key, value]) => {
    if (key === "text") {
      elem.textContent = value;
    } else {
      elem.setAttribute(key, value);
    }
  });
  return elem;
}

function renderError(err) {
  dom.mainContainer.innerHTML = "";
  createAndAppend("div", dom.mainContainer, {
    text: err.message,
    class: "alert alert-error",
  });
}

function renderContributors(contributors) {
  const container = createAndAppend("section", dom.mainContainer, {
    class: "contributors-container whiteframe",
  });
  createAndAppend("div", container, {
    text: "Contributions",
    class: "contributor-header",
  });
  const ul = createAndAppend("ul", container, {
    class: "contributor-list",
  });
  if (!contributors) {
    return;
  }
  contributors.forEach((contributor) => {
    const li = createAndAppend("li", ul);
    const a = createAndAppend("a", li, {
      href: contributor.html_url,
      class: "contributor-item",
      target: "_blank",
    });
    createAndAppend("img", a, {
      src: contributor.avatar_url,
      alt: `avatar for ${contributor.login}`,
      class: "contributor-avatar",
    });
    const div = createAndAppend("div", a, { class: "contributor-data" });
    createAndAppend("div", div, { text: contributor.login });
    createAndAppend("div", div, {
      text: contributor.contributions,
      class: "contributor-badge",
    });
  });
}

function addRow(tbody, label, value) {
  const row = createAndAppend("tr", tbody);
  createAndAppend("th", row, { text: `${label}:`, class: "label" });
  createAndAppend("td", row, { text: value });
  return row;
}

function renderRepoDetails(repo) {
  const container = createAndAppend("section", dom.mainContainer, {
    class: "repo-container whiteframe",
  });

  const cardContainer = createAndAppend("div", container, {
    class: "card-container",
  });
  const table = createAndAppend("table", cardContainer);
  const tbody = createAndAppend("tbody", table);

  const firstRow = addRow(tbody, "Repository");
  createAndAppend("a", firstRow.lastChild, {
    href: repo.html_url,
    target: "_blank",
    text: repo.name,
  });

  addRow(tbody, "Description", repo.description || "");
  addRow(tbody, "Forks", repo.forks);
  addRow(tbody, "Updated", new Date(repo.updated_at).toLocaleString());
}

function changeSelection(repo) {
  const url = repo.contributors_url;
  fetchJSON(`${url}?per_page=100`)
    .then((contributors) => {
      dom.mainContainer.innerHTML = "";
      renderRepoDetails(repo);
      renderContributors(contributors);
    })
    .catch((err) => renderError(err));
}

function renderSelect(repos) {
  const select = createAndAppend("select", dom.header, {
    class: "repo-select",
    autofocus: "autofocus",
  });
  repos
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((repo, index) =>
      createAndAppend("option", select, {
        text: repo.name,
        value: index,
      })
    );
  for (let i = 0; i < repos.length; i++) {
    console.log(i);
  }
  for (const repo of repos) {
    console.log(repo);
  }
  select.addEventListener("change", () => changeSelection(repos[select.value]));
  changeSelection(repos[select.value]);
}

function main(url) {
  const root = document.getElementById("root");
  dom.header = createAndAppend("header", root, { class: "header" });
  createAndAppend("p", dom.header, { text: "HYF Repositories" });
  dom.mainContainer = createAndAppend("main", root, {
    class: "main-container",
  });

  fetchJSON(url)
    .then((repos) => renderSelect(repos))
    .catch((err) => renderError(err));
}

const HYF_REPOS_URL =
  "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";
window.onload = () => main(HYF_REPOS_URL);
