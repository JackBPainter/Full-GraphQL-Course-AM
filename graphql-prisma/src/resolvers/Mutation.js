import uuidv4 from 'uuid/v4'
import prisma from '../prisma'

const Mutation = {
    createUser(parent, args, { prisma }, info) {
        return prisma.mutation.createUser({ data: args.data }, info)
    },
    deleteUser(parent, args, { prisma }, info) {
        return prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        }, info)
    },
    updateUser(parent, { id, data }, { prisma }, info) {
        return prisma.mutation.updateUser({
            where: {
                id
            },
            data
        }, info)
    },
    createPost(parent, args, { prisma }, info) {
        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: args.data.author
                    }
                }
            }
        }, info)
    },
    deletePost(parent, args, { prisma }, info) {
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    updatePost(parent, { id, data }, { prisma }, info) {
        return prisma.mutation.updatePost({
            where: {
                id
            },
            data
        }, info)
    },
    createComment(parent, { data }, { prisma }, info) {
        return prisma.mutation.createComment({
            data: {
                text: data.text,
                author: {
                    connect: {
                        id: data.author
                    }
                },
                post: {
                    connect: {
                        id: data.post
                    }
                }
            }
        }, info)
    },
    deleteComment(parent, args, { db, pubsub }, info) {
        const commentIndex = db.comments.findIndex(comment => comment.id === args.id)

        if(commentIndex === -1) {
            throw new Error('Comment not found')
        }

        const [deletedComment] = db.comments.splice(commentIndex, 1)

        pubsub.publish(`comment ${deletedComment.post}`, {
            comment: {
                mutation: "DELETED",
                data: deletedComment
            }
        })

        return deletedComment
    },
    updateComment(parent, { id, data }, { db, pubsub }, info) {
        const comment = db.comments.find(comment => comment.id === id)

        if(!comment) {
            throw new Error('Comment not found')
        }

        if(typeof data.text === 'string') {
            comment.text = data.text
        }

        pubsub.publish(`comment ${data.post}`, {
            comment: {
                mutation: "UPDATED",
                data: comment
            }
        })

        return comment
    }
}

export default Mutation