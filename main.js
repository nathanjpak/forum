// your code here
const posts = document.getElementsByClassName("posts")[0];
const name = document.getElementById("name");
const message = document.getElementById("message");
const submit = document.getElementById("submit");
let postCount = 0;


submit.addEventListener("click", function() {
    postCount++;

    const post = document.createElement("div");
    post.classList.add("row", "panel");  
    
    const content = document.createElement("div");
    content.classList.add("col-sm-10");

    const contentText = document.createElement("p");
    contentText.innerHTML = message.value;
    const author = document.createElement("p");
    author.innerHTML = `Posted by: <strong>${name.value}</strong>`;
    content.append(contentText, author);    

    //add upvote and downvote buttons
    const buttonsLeft = document.createElement("div");
    buttonsLeft.classList.add("col-sm-1", "text-center"); 
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
    buttonsLeft.append(upvote, upvoteP, downvote); 

    //add delete and edit(?) buttons
    const buttonsRight = document.createElement("div");
    buttonsRight.classList.add("d-flex", "flex-column", "justify-content-evenly");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.classList.add("btn", "btn-danger"); 
    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
    editBtn.classList.add("btn", "btn-default");

    buttonsRight.append(deleteBtn, editBtn);

    //button event listeners
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

    deleteBtn.addEventListener("click", function() {
        posts.removeChild(post);
    });

    editBtn.addEventListener("click", function(e) {
        //check if the text has been switched to form
        if (content.children[0].classList[0] === "form-group") {
            renderEdit(content, contentText, e.target);   
        } else {
            //if not, replace text with form
            editText(content, contentText, e.target);
        }
    });

    post.upvotes = upvotes;
    post.id = postCount;
    post.append(buttonsLeft, content, buttonsRight);
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

var renderEdit = function(content, contentText, editBtn) {
    const editTextArea = content.firstChild.firstChild;
    contentText.textContent = editTextArea.value;
    content.replaceChild(contentText, content.children[0]);
    editBtn.classList.remove("btn-warning");
    editBtn.classList.add("btn-default");
}

var editText = function(content, contentText, editBtn) {
    const formGroup = document.createElement("div");
    formGroup.classList.add("form-group");
    const editTextArea = document.createElement("textarea");
    editTextArea.classList.add("form-control");
    editTextArea.type = "text";
    editTextArea.textContent = contentText.textContent;
    formGroup.append(editTextArea);
    content.replaceChild(formGroup, content.children[0]);
    editBtn.classList.remove("btn-default");
    editBtn.classList.add("btn-warning");
}
