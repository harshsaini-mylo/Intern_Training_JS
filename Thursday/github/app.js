
const members = [

];

const membersList = document.querySelector("#members");

const memberName = document.querySelector("#memberName");

const memberRole = document.querySelector("#memberRole");

const addBtn = document.querySelector("#addBtn");




const renderMembers = () => {

  membersList.replaceChildren(

    ...members.map((member) => {

      const li = document.createElement("li");

      li.dataset.id = member.id;

      const text = document.createElement("span");

      text.textContent =
        `${member.name} -> ${member.role}`;

      const deleteBtn =
        document.createElement("button");

      deleteBtn.textContent = "Delete";

      deleteBtn.classList.add("delete-btn");

      li.append(text, deleteBtn);

      return li;
    })
  );
};


// Initial render

renderMembers();


// Add Member

addBtn.addEventListener("click", () => {

  const name = memberName.value.trim();

  const role = memberRole.value.trim();

  if (!name || !role) {
    alert("Please enter name and role");
    return;
  }

  members.push({
    id: Date.now(),
    name,
    role,
  });

  renderMembers();

  memberName.value = "";

  memberRole.value = "";
});


// Delete Member (Event Delegation)

membersList.addEventListener("click", (e) => {

  if (!e.target.classList.contains("delete-btn")) {
    return;
  }

  const li = e.target.closest("li");

  const id = Number(li.dataset.id);

  const index = members.findIndex(
    (m) => m.id === id
  );

  if (index !== -1) {
    members.splice(index, 1);
  }

  renderMembers();
});




// GITHUB search


const input = document.querySelector("#q");

const status = document.querySelector("#status");

const results = document.querySelector("#results");

let controller;


// Debounce Utility

function debounce(fn, wait = 300) {

  let timeout;

  return (...args) => {

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}


// Search Function

const search = async (query) => {

  // cancel previous request

  if (controller) {
    controller.abort();
  }

  controller = new AbortController();

  // empty query

  if (!query.trim()) {

    results.replaceChildren();

    status.textContent = "";

    return;
  }

  status.textContent = "Loading...";

  try {

    const res = await fetch(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`,
      {
        signal: controller.signal,
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    const items = data.items;


    results.replaceChildren(

      ...items.map((user) => {

        const li =
          document.createElement("li");

        const img =
          document.createElement("img");

        img.src = user.avatar_url;

        img.width = 40;

        const text =
          document.createTextNode(user.login);

        li.append(img, text);

        return li;
      })
    );

    status.textContent = items.length
      ? `${items.length} results`
      : "No results";

  } catch (err) {

    if (err.name !== "AbortError") {

      status.textContent =
        "Error: " + err.message;
    }
  }
};


// Debounced Search

const debouncedSearch =
  debounce(search, 300);


// Input Listener

input.addEventListener("input", (e) => {

  debouncedSearch(e.target.value);
});