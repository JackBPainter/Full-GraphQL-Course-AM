import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken'
import getUserId from '../utils/getUserId'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        if(args.data.password.length < 8) {
            throw new Error('Password must be at least 8 characters')
        } 

        const password = await bcrypt.hash(args.data.password, 10)

        const user = await prisma.mutation.createUser({ 
            data: {
                ...args.data,
                password
            }
        }) // Not including info as a second argument here means we only get the scaler types back

        return {
            user,
            token: generateToken(user.id)
        }
    },
    async login(parent, { data }, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: data.email
            }
        })
        
        if(!user) {
            throw new Error("Unable to login")
        }

        const isMatch = await bcrypt.compare(data.password, user.password)

        if(!isMatch) {
            throw new Error('Unable to login')
        }

        return {
            user,
            token: generateToken(user.id)
        }
    },
    deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.deleteUser({
            where: {
                id: userId
            }
        }, info)
    },
    updateUser(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data
        }, info)
    },
    createPost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
    async deletePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        })

        if(!postExists) {
            throw new Error("Unable to delete post")
        }

        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)
    },
    async updatePost(parent, { id, data }, { prisma, request }, info) {
        const userId = getUserId(request)

        const postExists = await prisma.exists.Post({
            id,
            author: {
                id: userId
            }
        })

        const postPublished = await prisma.exists.Post({
            id,
            published: true
        })


        if(!postExists) {
            throw new Error("Unable to update post")
        }

        if(postPublished && data.published === false) {
            await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id
                    }
                }
            })
        }

        return prisma.mutation.updatePost({
            where: {
                id
            },
            data
        }, info)
    },
    async createComment(parent, { data }, { prisma, request }, info) {
        const userId = getUserId(request)

        const postPublished = await prisma.exists.Post({ 
            id: data.post,
            published: true
        }, info)

        if(!postPublished) {
            throw new Error('Post not found')
        }

        return prisma.mutation.createComment({
            data: {
                text: data.text,
                author: {
                    connect: {
                        id: userId
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
    async deleteComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        })

        if(!commentExists) {
            throw new Error('Unable to delete comment')
        }

        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info)
    },
    async updateComment(parent, { id, data }, { prisma, request }, info) {
        const userId = getUserId(request)

        const commentExists = await prisma.exists.Comment({
            id,
            author: {
                id: userId
            }
        })

        if(!commentExists) {
            throw new Error("Unable to update comment")
        }

        return prisma.mutation.updateComment({
            where: {
                id
            },
            data
        })
    }   
}

export default Mutation