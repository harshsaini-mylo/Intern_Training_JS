

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

    li.textContent = `${member.name} -->> ${member.role}`;

    li.dataset.id = member.id;

    return li;
  });


// Render list

list.replaceChildren(...items);



// Event Delegation

list.addEventListener("click", (e) => {

  const li = e.target.closest("li");

  if (!li || !list.contains(li)) return;

  li.classList.toggle("selected");
  
 // console.log("Toggled member:", li.dataset.id);
});