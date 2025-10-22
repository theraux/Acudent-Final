    document.addEventListener("DOMContentLoaded", () => {

    fetch("../../HTML/user-interface/footer.html")
      .then(res => res.text())
      .then(data => document.getElementById("footer").innerHTML = data)
      .catch(err => console.error("Footer load error:", err));
    });

