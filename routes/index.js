var express = require('express');
var router = express.Router();
var User = require('./user');
var crypto = require('crypto');
var cookieParser = require('cookie-parser');
var session = require('express-session');

/* GET home page. */
router.get('/', 
	function(req, res) 
	{
  		res.render('index');
	}
);

router.post('/logout',
	function(req, res)
	{
		var resp = {result: "", code: 0, message: ""};

		console.log("req.session.user=" + req.session.user);
		req.session.user = null;
		resp.result = "success";
		res.send(resp);
	}
);

router.post('/login',
	function(req, res)
	{
		var resp = {result: "", code: 0, message: ""};

		//生成口令的散列值
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');
		var u = new User({ name: req.body.userName, password: password });

		console.log("User login request received!");
		console.log(u);

		//检查用户名是否已经存在
		User.get(u.name, 
			function(err, user) 
			{
				if (user)
				{
					if ( user.password == u.password )
					{
						req.session.user = user;
						resp.result = "success";
						res.send(resp);
					}
					else
					{
						resp.result = "error";
						resp.code = 110;
						resp.message = "incorrect username or password";
						res.send(resp);
					}
				}
				else
				{
					resp.result = "error";
					resp.code = 111;
					resp.message = "user not found";
					res.send(resp);
				}
			}
		);

	}
);

router.post('/register', 
	function(req, res) 
	{
		var resp = {result: "", code: 0, message: ""};

		//生成口令的散列值
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');
		var newUser = new User({ name: req.body.userName, password: password });

		console.log("User register request received!");
		console.log(newUser);

		//检查用户名是否已经存在
		User.get(newUser.name, 
			function(err, user) 
			{
				console.log("Check if user is existed.");
				console.log(user);
				if (user)
				{
					resp.result = "error";
					resp.code = 100;
					resp.message = "username already exists";
					res.send(resp);
					return;
				}

				//如果不存在则新增用户
				newUser.save(
					function(err) 
					{
						if (err) 
						{
							resp.result = "error";
							resp.code = 101;
							resp.message = "error occurred when adding user to database";
							res.send(resp);
							return;
						}
						
						resp.result = "success";
						res.send(resp);
					}
				);
			}
		);
	}
);

module.exports = router;

