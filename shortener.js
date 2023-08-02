const inputField = document.querySelector("#url-input");
const form = document.querySelector("form");
const linkContainer = document.querySelector(".shortened-container");
const anchorTag = linkContainer.querySelector("a");

async function shortenLink() {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputField.value}`);
    if(response.ok) {
        const errorDiv = document.querySelector(".error-msg");
        if(errorDiv) {
            errorDiv.remove();
        }
        const data = await response.json()
        const link = data.result.short_link
        linkContainer.style.display = "block";
        anchorTag.setAttribute("href", `https://${link}`);
        anchorTag.innerHTML = link;
    } else {
        if(linkContainer) {
            linkContainer.style.display = "none";
        }

        if(!document.querySelector(".error-msg")) {
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("error-msg");
            errorDiv.innerHTML = `
                <h2>Error ${response.status}</h2>
                <p>Something went wrong</p>
            `;
            document.querySelector("main").append(errorDiv);
        }
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await shortenLink();
})