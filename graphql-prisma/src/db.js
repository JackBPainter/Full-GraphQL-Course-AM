const comments = [{
    id: '101',
    text: 'This is comment one',
    author: '3',
    post: '10'
}, {
    id: '102',
    text: 'This is comment two',
    author: '3',
    post: '12'
}, {
    id: '103',
    text: 'This is comment three',
    author: '2',
    post: '11'
}, {
    id: '104',
    text: 'This is comment four',
    author: '1',
    post: '10'
}]

const users = [{
    id: '1',
    name: 'Jess',
    email: 'Jess@gmail.com',
    age: 32
}, {
    id: '2',
    name: 'Mark',
    email: 'Mark@yahoo.com',
    age: 24
}, {
    id: '3', 
    name: 'Barnett',
    email: 'Barnett@aol.com',
    age: 27
}]

const posts = [{
    id: '10',
    title: 'First World War',
    body: 'The first of two world wars',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'Second World War',
    body: 'The second of two world wars',
    published: false,
    author: '1'
}, {
    id: '12',
    title: 'Coronavirus',
    body: 'The war against people who are too stupid / ignorant to listen to government instructions',
    published: true,
    author: '2'
}]

const db = {
    users,
    posts,
    comments
}

export default db