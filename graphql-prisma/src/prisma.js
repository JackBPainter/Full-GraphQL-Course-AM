import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

const createPostForUser = async (authorID, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data, 
            author: {
                connect: {
                    id: authorID
                }
            }
        }
    }, '{ id }')

    const user = await prisma.query.user({ 
        where: {
            id: authorID
        }
    }, '{ id name email posts { id title published }}')
    return user
}

// createPostForUser('ck8zugylx00ev0860sebvsv2c', {
//     title: "Good title",
//     body: "This is a great body",
//     published: true
// }).then(user => {
//     console.log(JSON.stringify(user, undefined, 2))
// })

const updateUserPost = async (postID, userID, data) => {
    const updatePost = await prisma.mutation.updatePost({
        data: {
            ...data,
            author: {
                connect: {
                    id: userID
                }
            }
        }, 
        where: {
            id: postID
        }
    }, '{ id }')

    const post = await prisma.query.post({
        where: {
            id: postID
        }
    }, '{ id title body published author { id name }}')

    return post
}

updateUserPost('ck907kb3d02le0860k0p156s6', 'ck8zugylx00ev0860sebvsv2c', {
    title: "Updated post title",
    body: "Updated body",
    published: true,
}).then(data => console.log(JSON.stringify(data, undefined, 2)))

// prisma.mutation.updatePost({
//     data: {
//         body: "No longer dead",
//         published: true
//     }, 
//     where: {
//         id: "ck906d86t023s0860cf6wgbfr"
//     }
// }, '{ id title body published }').then(data => {
//     console.log(data)
//     return prisma.query.posts(null, '{ id title body published }')
// }).then(data => console.log(JSON.stringify(data, undefined, 2)))


