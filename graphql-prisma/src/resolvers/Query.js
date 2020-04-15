import prisma from "../prisma"

const Query = {
    users(parent, args, { db, prisma }, info) {
        return prisma.query.users(null, info)
        // if (!args.query) {
        //     return db.users
        // }

        // return db.users.filter((user) => {
        //     return user.name.toLowerCase().includes(args.query.toLowerCase())
        // })
    },
    posts(parent, args, { db }, info) {
        return prisma.query.posts(null, info)
        // if (!args.query) {
        //     return db.posts
        // }

        // return db.posts.filter((post) => {
        //     return post.body.toLowerCase().includes(args.query.toLowerCase()) || 
        //         post.title.toLowerCase().includes(args.query.toLowerCase())
        // })
    },
    me() {
        return {
            id: 78868,
            name: 'John Doe',
            email: 'john@gmail.com',
            age: 45
        }        
    },
    post() {
        return {
            id: 1,
            title: 'My first blog post',
            body: 'This is my first blog post',
            published: true
        }
    },
    comments(parent, args, { db }, info) {
        return db.comments
    }
}

export default Query