
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const results = document.getElementById("formResults");

  if (!form || !submitBtn || !results) return;

  const fields = form.querySelectorAll("input");

    const phoneInput = document.getElementById("phone");

    phoneInput.addEventListener("input", function () {
    let digits = phoneInput.value.replace(/\D/g, "");

    if (digits.startsWith("370")) {
        digits = digits.slice(3);
    } else if (digits.startsWith("0")) {
        digits = digits.slice(1);
    }

    digits = digits.slice(0, 8);

    if (digits.length === 0) {
        phoneInput.value = "";
    } else if (digits.length <= 3) {
        phoneInput.value = "+370 " + digits;
    } else {
        phoneInput.value = "+370 " +
        digits.slice(0, 3) + " " + digits.slice(3);
    }
    });


  function validateForm() {
    const allValid = Array.from(fields).every(function (field) {
      return field.value.trim() !== "" && field.checkValidity();
    });

    submitBtn.disabled = !allValid;
  }

  
fields.forEach(function (field) {
  field.addEventListener("input", function () {
    validateForm();

    if (field.value.trim() === "") {
      field.style.borderColor = "#ced4da";
    } else if (field.checkValidity()) {
      field.style.borderColor = "#198754";
    } else {
      field.style.borderColor = "#dc3545";
    }
  });
});


  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    const ratings = ["rating1", "rating2", "rating3"].map(function (id) {
      return Number(document.getElementById(id).value);
    });

    const average = ratings.reduce(function (sum, rating) {
      return sum + rating;
    }, 0) / ratings.length;

    
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    results.textContent =
    "Name: " + firstName + " " + lastName + "\n" +
    "Email: " + email + "\n" +
    "Phone: " + phone + "\n" +
    "Address: " + address + "\n" +
    "Website Design: " + ratings[0] + "/10\n" +
    "Website Content: " + ratings[1] + "/10\n" +
    "Website Usability: " + ratings[2] + "/10\n" +
    "Average Rating: " + average.toFixed(1) + "/10";


const formData = {
  firstName: firstName,
  lastName: lastName,
  email: email,
  phone: phone,
  address: address,
  rating1: ratings[0],
  rating2: ratings[1],
  rating3: ratings[2]
};

console.log(formData);

results.style.whiteSpace = "pre-line";

}); 


  const clearBtn = document.getElementById("clearBtn");

  clearBtn.addEventListener("click", function () {
    form.reset();
    results.textContent = "";

    fields.forEach(function (field) {
      field.style.borderColor = "";
    });

    validateForm();
  });


validateForm();

}); 

/* LAB 12 - INTERACTIVE SKILL PROGRESS */

document.addEventListener("DOMContentLoaded", function () {

    const skills = [
        { name: "React", status: "Planned", xp: 40 },
        { name: "SQL", status: "Planned", xp: 45 },
        { name: "JavaScript", status: "In Progress", xp: 50 },
        { name: "CSS", status: "In Progress", xp: 60 },
        { name: "Git & GitHub", status: "In Progress", xp: 55 },
        { name: "HTML", status: "Completed", xp: 70 },
        { name: "Python", status: "Completed", xp: 80 }
    ];

    /* LAB 12 - LOCAL STORAGE */

    function saveSkills() {
        localStorage.setItem("skillProgress", JSON.stringify(skills));
    }

    function loadSkills() {

        const savedSkills = localStorage.getItem("skillProgress");

        if (savedSkills) {

            const storedSkills = JSON.parse(savedSkills);

            skills.forEach(function (skill) {

                const savedSkill = storedSkills.find(
                    item => item.name === skill.name
                );

                if (savedSkill) {
                    skill.status = savedSkill.status;
                }

            });
        }
    }

    function renderSkills() {

        const planned = document.getElementById("plannedSkills");
        const inProgress = document.getElementById("inProgressSkills");
        const completed = document.getElementById("completedSkills");

        planned.innerHTML = "";
        inProgress.innerHTML = "";
        completed.innerHTML = "";

        skills.forEach(function (skill) {

            const card = document.createElement("div");
            card.className = "skill-card";

            card.innerHTML = `
              <h4>${skill.name}</h4>
              <span>${skill.xp} XP</span>

              <select class="skill-status">
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
              </select>
          `;

          const statusSelect = card.querySelector(".skill-status");

          statusSelect.value = skill.status;

          statusSelect.addEventListener("change", function () {
          skill.status = statusSelect.value;
          saveSkills();
          renderSkills();
          updateXP();
          updateStatistics();
      });

            if (skill.status === "Planned") {
                planned.appendChild(card);
            } else if (skill.status === "In Progress") {
                inProgress.appendChild(card);
            } else {
                completed.appendChild(card);
            }

        });
    }

    function updateXP() {

    const totalXP = skills
        .filter(skill => skill.status === "Completed")
        .reduce((sum, skill) => sum + skill.xp, 0);

    let level;
    let rank;

    if (totalXP >= 300) {
        level = 4;
        rank = "Professional";
    } else if (totalXP >= 150) {
        level = 3;
        rank = "Specialist";
    } else if (totalXP >= 50) {
        level = 2;
        rank = "Trainee";
    } else {
        level = 1;
        rank = "Beginner";
    }

    document.getElementById("totalXP").textContent =
        totalXP + " XP";

    document.getElementById("currentLevel").textContent =
        "Level " + level;

    document.getElementById("currentRank").textContent =
        rank;

    updateProgressBar(totalXP, level);
}


function updateProgressBar(totalXP, level) {

    let progress;
    let minXP;
    let nextXP;

    if (level === 4) {
        progress = 100;
    } else {

        if (level === 1) {
            minXP = 0;
            nextXP = 50;
        } else if (level === 2) {
            minXP = 50;
            nextXP = 150;
        } else {
            minXP = 150;
            nextXP = 300;
        }

        progress = (totalXP - minXP) /
                   (nextXP - minXP) * 100;
    }

    document.getElementById("xpProgressFill").style.width =
        progress + "%";

    if (level === 4) {

        document.getElementById("xpProgressText").textContent =
            totalXP + " XP";

        document.getElementById("xpRemaining").textContent =
            "100% completed - Maximum level reached";

    } else {

        document.getElementById("xpProgressText").textContent =
            totalXP + " / " + nextXP + " XP";

        document.getElementById("xpRemaining").textContent =
            progress.toFixed(1) + "% completed - " +
            (nextXP - totalXP) + " XP remaining";
    }
}


    function updateStatistics() {

        const total = skills.length;

        const completed = skills.filter(
            skill => skill.status === "Completed"
        ).length;

        const percentage = completed / total * 100;

        document.getElementById("totalSkills").textContent =
            total;

        document.getElementById("completedCount").textContent =
            completed;

        document.getElementById("completionRate").textContent =
            percentage.toFixed(1) + "%";
    }
    loadSkills();
    renderSkills();
    updateXP();
    updateStatistics();

});