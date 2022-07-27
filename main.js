// your code here
const posts = document.getElementsByClassName("posts")[0];
const name = document.getElementById("name");
const message = document.getElementById("message");
const submit = document.getElementById("submit");

submit.addEventListener("click", function() {
    const post = document.createElement("div");
    post.classList.add("row");  
    
    const content = document.createElement("div");
    content.classList.add("col-sm-11");

    const author = document.createElement("p");
    author.innerHTML = `Posted by: <strong>${name.value}</strong>`;
    content.append(message.value, author);    

    //add upvote and downvote buttons
    const buttons = document.createElement("div");
    buttons.classList.add("col-sm-1", "text-center"); 
    const upvote = document.createElement("button");
    upvote.innerHTML = '<i class="fa fa-angle-up"></i>';
    upvote.classList.add("btn", "btn-info");
    const downvote = document.createElement("button");
    downvote.innerHTML = '<i class="fa fa-angle-down"></i>';
    downvote.classList.add("btn", "btn-info");
    
    let upvotes = 0;
    const score = document.createElement("p");
    score.textContent = upvotes;
    score.style.marginTop = "10px";
    buttons.append(upvote, score, downvote); 

    //button functionality
    upvote.addEventListener("click", function() {
        upvotes++;
        score.textContent = upvotes;
    });
    downvote.addEventListener("click", function() {
        upvotes--;
        score.textContent = upvotes;
    });

    post.append(buttons, content);
    posts.appendChild(post);
});
