import prisma from "../prisma"

const Query = {
    users(parent, args, { prisma }, info) {
        const opArgs = {}

        if(args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {}

        if(args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }

        return prisma.query.posts(opArgs, info)
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
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info)
    }
}

export default Query