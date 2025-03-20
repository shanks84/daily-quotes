const changeBackground = () => {
  const idx = Math.ceil(Math.random() * 3);
  let backImg = "url('../public/background" + idx + ".jpg')";
  console.log(backImg);
  document.getElementsByClassName("background")[0].style.backgroundImage =
    backImg;
};

const getQuote = async () => {
  const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    changeBackground();
    const response = await fetch(url, options);
    const data = await response.json();
    document.getElementById("quote").innerHTML = data.data.content;
    document.getElementById("author").innerHTML = data.data.author;
  } catch (error) {
    console.error(error);
  }
};

getQuote();

document.getElementById("copy").addEventListener("click", (ev) => {
  var copyText = document.getElementById("quote");
  ev.target.innerHTML = "Copied";
  // Select the text field
  // copyText.select();
  // copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.innerText);
});

document.getElementById("new").addEventListener("click", (ev) => {
  getQuote();
});

document.getElementById("share").addEventListener("click", (ev) => {
  let quote =
    document.getElementById("quote").innerText +
    " :- " +
    document.getElementById("author").innerText;
  const twitterUrl = "https://twitter.com/intent/tweet/";
  const linkTarget = "_blank";
  const windowOptions = "menubar=no,status=no,height=750,width=500";
  const twitterQuery = `text=${quote}`;
  window.open(`${twitterUrl}?${twitterQuery}&`, linkTarget, windowOptions);
});
