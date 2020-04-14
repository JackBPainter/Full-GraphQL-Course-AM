import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// const users = prisma.query.users(null, '{ id name posts { id title body }}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// }) 

// const comments = prisma.query.comments(null, '{ id text author { id name }}').then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.mutation.createPost({
//     data: {
//         title: "Post 2",
//         body: "dead",
//         published: false,
//         author: {
//             connect: {
//                 id: "ck8zzkybz00qs08602kbs7o79"
//             }
//         }
//     }
// }, '{ id title body published }').then(data => {
//     console.log(data)
//     return prisma.query.users(null, '{ id name posts { id title body }}')
// }).then(data => console.log(JSON.stringify(data, undefined, 2)))


prisma.mutation.updatePost({
    data: {
        body: "No longer dead",
        published: true
    }, 
    where: {
        id: "ck906d86t023s0860cf6wgbfr"
    }
}, '{ id title body published }').then(data => {
    console.log(data)
    return prisma.query.posts(null, '{ id title body published }')
}).then(data => console.log(JSON.stringify(data, undefined, 2)))
