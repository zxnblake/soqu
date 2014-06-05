var mongodb = require('../models/soqudb');

function User(user) 
{
	this.name = user.name;
	this.password = user.password;
};

User.prototype.save = function save(callback) 
{
	// 存入 Mongodb 的文档
	var user = 
	{
		name: this.name,
		password: this.password,
	};

	mongodb.open(
		function(err, db) 
		{
			if (err) 
			{
				return callback(err);
			}

			// 读取 users 集合
			db.collection('users', 
				function(err, collection) 
				{
					if (err) 
					{
						mongodb.close();
						return callback(err);
					}

					// 为 name 属性添加索引
					collection.ensureIndex('name', {unique: true});

					// 写入 user 文档
					collection.insert(user, {safe: true}, 
						function(err, user) 
						{
							mongodb.close();
							callback(err, user);
						}
					);
				}
			);

		}
	);
};

User.get = function get(username, callback) 
{
	mongodb.open(
		function(err, db) 
		{
			if (err) 
			{
				console.log("Error when open mongo db");
				return callback(err);
			}

			// 读取 users 集合
			db.collection('users', 
				function(err, collection) 
				{
					if (err) 
					{
						console.log("Error when query users from mongo db");
						mongodb.close();
						return callback(err);
					}

					// 查找 name 属性为 username 的文档
					console.log("search the user with name: " + username);
					collection.findOne({name: username}, 
						function(err, doc) 
						{
							mongodb.close();
							if (doc) 
							{
								console.log("the user is found.");
								console.log(doc);
								// 封装文档为 User 对象
								var user = new User(doc);
								callback(err, user);
							} 
							else 
							{
								console.log("the user is not found.");
								callback(err, null);
							}
						}
					);
				}
			);
		}
	);
};

module.exports = User;

