type VerificationToken = {
    _id: string,
    token: string,
    email: string,
    userID: string,
    createdAt: DateTime,
}

export default VerificationToken