import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    fragmentReplacements
})

export default prisma

// prisma.exists.Comment({
//     id: "1218"
// }).then(dataExists => console.log(dataExists))

// const createPostForUser = async (authorID, data) => {
//     const userExists = await prisma.exists.User({
//         id: authorID
//     })

//     if(!userExists) {
//         throw new Error('User not found')
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data, 
//             author: {
//                 connect: {
//                     id: authorID
//                 }
//             }
//         }
//     }, '{ id author { id name email posts { id title body published }}}')

//     return post.author
// }

// // createPostForUser('ck8zzkybz00qs08602kbs7o79', {
// //     title: "Da new title",
// //     body: "This is a new body",
// //     published: true
// // }).then(user => {
// //     console.log(JSON.stringify(user, undefined, 2))
// // }).catch(error => console.log(error.message))

// const updateUserPost = async (postID, data) => {
//     const postExists = await prisma.exists.Post({
//         id: postID
//     })

//     if(!postExists) {
//         throw new Error('Post not found')
//     }

//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postID
//         },
//         data
//     }, '{ author { id name email posts { id title published}}}')

//     return post.author
// }

// updateUserPost('12', {
//     published: false
// }).then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
// }).catch(error => console.log(error.message))
