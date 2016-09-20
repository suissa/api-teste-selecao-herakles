var JWT = require('../../src/services/JWTService');

module.exports = {
	setUp: function(callback){
		this.data = {
			user:{
				name:"",
				email:"",
				password:""
			}
		};
		this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiTHVjYXMgRnJhbsOnYSIsImVtYWlsIjoibHVjYXNoeXRlY0BnbWFpbC5jb20iLCJwYXNzd29yZCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAxNi0wOS0xOVQyMTo0Mzo0OS4yMzhaIiwidXBkYXRlZEF0IjoiMjAxNi0wOS0xOVQyMTo0Mzo0OS4yMzhaIn0sImlhdCI6MTQ3NDM0NDYwMH0.WXm1wyh17hbk6Xbeuf0skIUUc8gx-WQktTvswKew5O4";
		this.jwt = new JWT();
		callback();
	},
	tokenGenerate: function(test) {
		test.throws(function(){
			this.jwt.generate(this.data);
		}, Error, "Dados Inválidos.");
		test.done();
	},
	tokenVerify: function(test) {
		test.throws(function(){
			this.jwt.verify(this.token);
		}, Error, "Token Inválido.");
		test.done();
	},
	tearDown: function (callback) {
		this.data = undefined;
		this.token = undefined;
		this.jwt = undefined;
		callback();
	}
};