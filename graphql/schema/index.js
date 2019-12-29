const { buildSchema } = require('graphql');
module.exports = buildSchema(`
type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String! 
    creator: User!
}

type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
}

input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String! 
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
}

input StudentInput {
    name: String!
    email: String!
    gtid: String!
}

type RootQuery{
    events: [Event!]!
    students: [Student!]!
    bookings: [Booking!]!
}

type RootMutation{
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    createStudent(studentInput: StudentInput): Student
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema{
    query: RootQuery
    mutation: RootMutation

}
`);