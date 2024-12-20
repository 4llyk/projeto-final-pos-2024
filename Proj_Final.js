// Implementação do serviço (Exemplo em Node.js com Express)
const express = require('express');
const app = express();
app.use(express.json());

// Mock database
let users = [];
let todos = [];
let posts = [];
let comments = [];
let albums = [];
let photos = [];

let idCounter = { users: 1, todos: 1, posts: 1, comments: 1, albums: 1, photos: 1 };

// Helper function to generate IDs
const generateId = (resource) => idCounter[resource]++;

// CRUD for Users
app.get('/users', (req, res) => res.json(users));
app.post('/users', (req, res) => {
    const user = { id: generateId('users'), ...req.body };
    users.push(user);
    res.status(201).json(user);
});
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id == id);
    if (index === -1) return res.status(404).json({ message: 'User not found' });
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
});
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id != id);
    res.status(204).send();
});

// CRUD for ToDos
app.get('/todos', (req, res) => res.json(todos));
app.post('/todos', (req, res) => {
    const todo = { id: generateId('todos'), ...req.body };
    todos.push(todo);
    res.status(201).json(todo);
});
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(t => t.id == id);
    if (index === -1) return res.status(404).json({ message: 'ToDo not found' });
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
});
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(t => t.id != id);
    res.status(204).send();
});

// CRUD for Posts
app.get('/posts', (req, res) => res.json(posts));
app.post('/posts', (req, res) => {
    const post = { id: generateId('posts'), ...req.body };
    posts.push(post);
    res.status(201).json(post);
});
app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const index = posts.findIndex(p => p.id == id);
    if (index === -1) return res.status(404).json({ message: 'Post not found' });
    posts[index] = { ...posts[index], ...req.body };
    res.json(posts[index]);
});
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    posts = posts.filter(p => p.id != id);
    res.status(204).send();
});

// CRUD for Comments
app.get('/comments', (req, res) => res.json(comments));
app.post('/comments', (req, res) => {
    const comment = { id: generateId('comments'), ...req.body };
    comments.push(comment);
    res.status(201).json(comment);
});
app.put('/comments/:id', (req, res) => {
    const { id } = req.params;
    const index = comments.findIndex(c => c.id == id);
    if (index === -1) return res.status(404).json({ message: 'Comment not found' });
    comments[index] = { ...comments[index], ...req.body };
    res.json(comments[index]);
});
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id != id);
    res.status(204).send();
});

// CRUD for Albums
app.get('/albums', (req, res) => res.json(albums));
app.post('/albums', (req, res) => {
    const album = { id: generateId('albums'), ...req.body };
    albums.push(album);
    res.status(201).json(album);
});
app.put('/albums/:id', (req, res) => {
    const { id } = req.params;
    const index = albums.findIndex(a => a.id == id);
    if (index === -1) return res.status(404).json({ message: 'Album not found' });
    albums[index] = { ...albums[index], ...req.body };
    res.json(albums[index]);
});
app.delete('/albums/:id', (req, res) => {
    const { id } = req.params;
    albums = albums.filter(a => a.id != id);
    res.status(204).send();
});

// CRUD for Photos
app.get('/photos', (req, res) => res.json(photos));
app.post('/photos', (req, res) => {
    const photo = { id: generateId('photos'), ...req.body };
    photos.push(photo);
    res.status(201).json(photo);
});
app.put('/photos/:id', (req, res) => {
    const { id } = req.params;
    const index = photos.findIndex(p => p.id == id);
    if (index === -1) return res.status(404).json({ message: 'Photo not found' });
    photos[index] = { ...photos[index], ...req.body };
    res.json(photos[index]);
});
app.delete('/photos/:id', (req, res) => {
    const { id } = req.params;
    photos = photos.filter(p => p.id != id);
    res.status(204).send();
});

app.listen(3000, () => console.log('Service running on http://localhost:3000'));

// Cliente React
import React, { useState, useEffect } from 'react';
import './App.css';

const API = 'http://localhost:3000';

const fetchData = async (endpoint) => {
    const response = await fetch(`${API}/${endpoint}`);
    return response.json();
};

const postData = async (endpoint, data) => {
    const response = await fetch(`${API}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.json();
};

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData('users').then(setUsers);
    }, []);

    const addUser = () => {
        const newUser = { name: 'New User', email: 'newuser@example.com' };
        postData('users', newUser).then((user) => setUsers([...users, user]));
    };

    return (
        <div className="App">
            <h1>Users</h1>
            <button onClick={addUser}>Add User</button>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
