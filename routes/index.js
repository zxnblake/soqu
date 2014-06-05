var express = require('express');
var router = express.Router();
var User = require('./user');
var crypto = require('crypto');

/* GET home page. */
router.get('/', 
	function(req, res) 
	{
  		res.render('index');
	}
);

router.post('/register', 
	function(req, res) 
	{
		//生成口令的散列值
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');
		var newUser = new User({ name: req.body.username, password: password });

		console.log("User register request received!");

		//检查用户名是否已经存在
		User.get(newUser.name, 
			function(err, user) 
			{
				console.log("Check if user is existed.");
				if (user)
				{
					res.send('Username already exists.');
					return;
				}

				//如果不存在则新增用户
				newUser.save(
					function(err) 
					{
						if (err) 
						{
							res.send('Error occurred when adding user to database.');
							return;
						}
						req.session.user = newUser;
						res.send('success');
					}
				);
			}
		);
	}
);

module.exports = router;

