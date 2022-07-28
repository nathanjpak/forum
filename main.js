// your code here
const posts = document.getElementsByClassName("posts")[0];
const name = document.getElementById("name");
const message = document.getElementById("message");
const submit = document.getElementById("submit");
let postCount = 0;


submit.addEventListener("click", function() {
    postCount++;

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
    const upvoteP = document.createElement("p");
    upvoteP.textContent = upvotes;
    upvoteP.style.marginTop = "10px";
    buttons.append(upvote, upvoteP, downvote); 

    //button functionality
    upvote.addEventListener("click", function() {
        upvotes++;
        upvoteP.textContent = upvotes;
        post.upvotes = upvotes;
        orderPosts();
    });
    downvote.addEventListener("click", function() {
        upvotes--;
        upvoteP.textContent = upvotes;
        post.upvotes = upvotes;
        orderPosts();
    });

    post.upvotes = upvotes;
    post.id = postCount;
    post.append(buttons, content);
    posts.appendChild(post);
    orderPosts();
});

var orderPosts = function () {
    let postsList = posts.children;
    const arrayControl = Array.from(postsList);
    const arraySorted = Array.from(postsList);
    arraySorted.sort((a,b) => b.upvotes - a.upvotes);
    
    //check if the order should change
    const isDifferent = arrayControl.some(function (e, i) {
        return e.id !== arraySorted[i].id;
    });

    if (isDifferent) {
        //clear posts first
        while (posts.lastChild) {
            posts.removeChild(posts.lastChild);
        };

        //re-populate posts
        arraySorted.forEach(function(e) {
            posts.append(e);
        });
    }
};
