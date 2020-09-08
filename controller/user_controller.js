
/* GET home page. */
function statusAPI(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.status(200).json(
      {
        "success" : true
      }
    );
  };
  
  
  function messageAPI(req, res, next) {
    
    res.status(200).json(
      {
        "message" : "test"
      }
    );
  };
  
  
  function postAPI(req, res, next) {
    
    const user_message = req.body.message;
  
    console.log(user_message)
  
    res.status(200).json(
      {
        "message" : user_message
      }
    );
  };
  
  module.exports = {
      statusAPI : statusAPI,
      messageAPI: messageAPI,
      postAPI: postAPI,
  }

  