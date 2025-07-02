document.addEventListener("DOMContentLoaded", () => {


function displayPosts() {
  fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = ""; // Clear existing

      posts.forEach(post => {
        const li = document.createElement("li");
        li.textContent = post.title;
        li.addEventListener("click", () => handlePostClick(post.id));
        postList.appendChild(li);
      });
    });
}

function handlePostClick(id) {
  fetch(`http://localhost:3000/posts/${id}`)
    .then(res => res.json())
    .then(post => {
      const detail = document.getElementById("post-detail");
      detail.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <small>Author: ${post.author}</small>
      `;
    });
}

function addNewPostListener() {
  const form = document.getElementById("new-post-form");
  form.addEventListener("submit", e => {
    e.preventDefault();

    const newPost = {
      title: form.title.value,
      content: form.content.value,
      author: form.author.value
    };

    // Render new post immediately (not saved yet)
    const li = document.createElement("li");
    li.textContent = newPost.title;
    li.addEventListener("click", () => {
      document.getElementById("post-detail").innerHTML = `
        <h2>${newPost.title}</h2>
        <p>${newPost.content}</p>
        <small>Author: ${newPost.author}</small>
      `;
    });

    document.getElementById("post-list").appendChild(li);
    form.reset();
  });
}

function main() {
  displayPosts();
  addNewPostListener();
}

main();

});
