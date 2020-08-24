const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parentValue, args, request){
                return AuthService.signup({
                    password: args.password,
                    email: args.email,
                    req: request
                });
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, request){
                const {user} = request;
                request.logout();
                return user;
            }
        },
        login: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parentValue, args, request){
                return AuthService.login({
                    email: args.email, 
                    password: args.password, 
                    req: request
                })
            }
        }
    }
});

module.exports = mutation;