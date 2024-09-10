// script.js

document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.getElementById('postButton');
    const postContent = document.getElementById('postContent');
    const feedList = document.getElementById('feedList');
    const showPostsButton = document.getElementById('showPosts');
    const showFollowersButton = document.getElementById('showFollowers');
    const postSection = document.getElementById('postSection');
    const followerSection = document.getElementById('followerSection');
    const feedSection = document.getElementById('feedSection');
    const followerName = document.getElementById('followerName');
    const addFollowerButton = document.getElementById('addFollowerButton');
    const followerList = document.getElementById('followerList');

    // Load followers and posts from localStorage
    let followers = JSON.parse(localStorage.getItem('followers')) || [];
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    function renderFollowers() {
        followerList.innerHTML = '';
        followers.forEach(follower => {
            const li = document.createElement('li');
            li.textContent = follower;
            followerList.appendChild(li);
        });
    }

    function renderPosts() {
        feedList.innerHTML = '';
        posts.forEach((post, index) => {
            const li = document.createElement('li');
            li.textContent = post;
            
            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.addEventListener('click', () => {
                deletePost(index);
            });

            li.appendChild(deleteButton);
            feedList.appendChild(li);
        });
    }

    function deletePost(index) {
        posts.splice(index, 1); // Remove the post from the array
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts(); // Re-render the posts
    }

    postButton.addEventListener('click', () => {
        if (postContent.value.trim() !== '') {
            posts.push(postContent.value.trim());
            localStorage.setItem('posts', JSON.stringify(posts));
            postContent.value = '';
        }
    });

    addFollowerButton.addEventListener('click', () => {
        const follower = followerName.value.trim();
        if (follower && !followers.includes(follower)) {
            followers.push(follower);
            localStorage.setItem('followers', JSON.stringify(followers));
            renderFollowers();
            followerName.value = '';
        }
    });

    showPostsButton.addEventListener('click', () => {
        postSection.style.display = 'none';
        followerSection.style.display = 'none';
        feedSection.style.display = 'block';
        renderPosts();
    });

    showFollowersButton.addEventListener('click', () => {
        postSection.style.display = 'none';
        feedSection.style.display = 'none';
        followerSection.style.display = 'block';
        renderFollowers();
    });

    // Initialize the view
    postSection.style.display = 'block';
    followerSection.style.display = 'none';
    feedSection.style.display = 'none';
});
