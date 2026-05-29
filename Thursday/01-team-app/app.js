

const members = [
  { id: 1, name: "Aarav", role: "Frontend", active: true },

  { id: 2, name: "Priya", role: "Backend", active: true },

  { id: 3, name: "Rahul", role: "Designer", active: false },

  { id: 4, name: "Sneha", role: "QA", active: true },
];



const list = document.querySelector("#team");




const items = members
  .filter((member) => member.active)

  .map((member) => {

    const li = document.createElement("li");

    li.textContent = `${member.name} -->>  ${member.role}`;

    li.dataset.id = member.id;

    return li;
  });


// Add items to DOM

list.replaceChildren(...items);


// Event Delegation ex

list.addEventListener("click", (event) => {

  const item = event.target.closest("li");

  if (!item) return;

  console.log("Clicked Member ID:", item.dataset.id);

  alert(`You clicked member ID ${item.dataset.id}`);
});