const links = document.getElementsByClassName("link");

function activeClass() {
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      for (let r = 0; r < links.length; r++) {
        links[r].classList.remove("active");
      }
      this.classList.add("active");
    });
  }
}

activeClass();

const form = document.querySelector(".contact-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = document.querySelector("#message");

  const messageError = document.querySelector(".message-error");
  const submitMessage = document.querySelector(".successful");

  messageError.textContent = "";
  submitMessage.textContent = "";

  let isValid = true;

  if (message.value.trim().length < 10) {
    messageError.textContent = "Message should be at least 10 characters long.";
    isValid = false;
  }

  if (isValid) {
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mrbbjwyb", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        submitMessage.textContent = "Form submitted successfully!";
        form.reset();

        setTimeout(() => {
          submitMessage.textContent = "";
        }, 3000);
      } else {
        const data = await response.json();
        submitMessage.textContent =
          "Something went wrong. Please try again later.";
        if (data.errors) {
          data.errors.forEach((error) => {
            if (error.field === "message") {
              messageError.textContent = error.message;
            }
          });
        }
      }
    } catch (error) {
      submitMessage.textContent = "An error occurred. Please try again later.";
    }
  }
});