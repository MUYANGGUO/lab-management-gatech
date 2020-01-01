const { buildSchema } = require('graphql');
module.exports = buildSchema(`
type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}
type Checkingout {
    _id: ID!
    asset: Asset!
    student: Student!
    comments: String
    createdAt: String!
    updatedAt: String!
}

input CheckingoutInput {
    assetId: ID!
    studentId: ID!
    comments: String
}
input CancelcheckingoutInput {
    checkingoutId: ID!
    studentId: ID!
}

type Event {
    _id: ID!
    title: String!
    description: String
    price: Float!
    date: String! 
    creator: User!
}
input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String! 
}

type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
}

input UserInput {
    email: String!
    password: String!
}

type Student{
    _id: ID!
    name: String!
    email: String!
    gtid: String!
    section: String
    checkedoutLogs: [Checkingout!]
}

input StudentInput {
    name: String!
    email: String!
    gtid: String!
    section: String
}

type Asset{
    _id: ID!
    asset_id: String!
    name: String!
    asset_type: String!
    tag_number: String!
    status: String!
}

input AssetInput {
    name: String!
    asset_type: String!
    tag_number: String!
}

type RootQuery{
    events: [Event!]!
    users: [User!]!
    students: [Student!]!
    bookings: [Booking!]!
    assets: [Asset!]!
    checkingouts: [Checkingout!]!
}

type RootMutation{
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    createAsset(assetInput: AssetInput): Asset
    createStudent(studentInput: StudentInput): Student
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
    createCheckingout(checkingoutInput: CheckingoutInput): Checkingout!
    cancelCheckingout(cancelcheckingoutInput: CancelcheckingoutInput): Asset!
}

schema{
    query: RootQuery
    mutation: RootMutation

}
`);