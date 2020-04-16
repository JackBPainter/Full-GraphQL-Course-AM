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
    updatePost(parent, { id, data }, { db, pubsub }, info) {
        const post = db.posts.find(post => post.id === id)
        const originalPost = { ...post }

        if(!post) {
            throw new Error('Post not found')
        }

        if(typeof data.title === 'string') {
            post.title = data.title
        }

        if(typeof data.body === 'string') {
            post.body = data.body
        }
    
        if(typeof data.published === 'boolean') {
            post.published = data.published

            if(originalPost.published && !post.published) {
                // deleted
                pubsub.publish('post', {
                    post: {
                        mutation: 'DELETED',
                        data: originalPost
                    }
                })
            } else if(!originalPost.published && post.published) {
                // created
                pubsub.publish('post', {
                    post: {
                        mutation: 'CREATED',
                        data: post
                    }
                })
            }
        } else if(post.published) {
            // update
            pubsub.publish('post', {
                post: {
                    mutation: 'UPDATED',
                    data: post
                }
            })
        }

        return post 
    },
    createComment(parent, args, { db, pubsub }, info) {
        const userExists = db.users.some(user => user.id === args.data.author)
        const postExists = db.posts.some(post => post.id === args.data.post && post.published)

        if(!userExists) {
            throw new Error('User not found')
        }

        if(!postExists) {
            throw new Error('Post not found')
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }
        
        db.comments.push(comment)

        pubsub.publish(`comment ${args.data.post}`, { 
            comment: {
                mutation: "CREATED",
                data: comment
            }
        })

        return comment
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