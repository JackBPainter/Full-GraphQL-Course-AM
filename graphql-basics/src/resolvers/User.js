const User = {
    posts(parent, args, { db }, info) {
        return db.posts.filter((post) => {
            return post.author === parent.author
        })
    },
    comments(parent, args, { db }, info) {
        return db.comments.filter(comment => {
            return comment.author === parent.id
        })
    }
}

export default User 