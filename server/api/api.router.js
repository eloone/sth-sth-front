'use strict';

module.exports = {
	setApiRouter: setApiRouter,
	handleApiResponse: handleApiResponse
};

function setApiRouter(routeName, api, apiHandler){

	api.get('/' + routeName, function(req, res) {
	  apiHandler.getAll(handleApiResponse(res, 200));
	});

	api.get('/' + routeName + '/:id', function(req, res) {
	  apiHandler.get(req.params.id, handleApiResponse(res, 200));
	});

	if(apiHandler.getCategory){
		api.get('/' + routeName + '/category/:category', function(req, res) {
		  apiHandler.getCategory(req.params.category, handleApiResponse(res, 200));
		});
	}
}

function handleApiResponse(res, successStatus) {
  return function(err, payload) {
    if (err) {
      console.error(err);
      res.status(err.code).send(err.message);
      return;
    }

    if (successStatus) {
      res.status(successStatus);
    }

    res.json(payload);
  };
}