// your code here
const posts = document.getElementsByClassName("posts")[0];
const name = document.getElementById("name");
const message = document.getElementById("message");
const submit = document.getElementById("submit");

submit.addEventListener("click", function() {
    const post = document.createElement("div");
    post.append(name.value, message.value);
    posts.appendChild(post);
});
