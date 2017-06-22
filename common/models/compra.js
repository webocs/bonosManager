'use strict';
var app = require('../../server/server');
module.exports = function(Compra) {



// FILTER INCLUDE WONT WORK WITH HASONE RELATIONS
/*
WARNING: when accessing a related model, the active ACL is still the one for the model
 you are calling. So even if your model has DENY ALL permissions set, if the model
  relating to it has no ACL, then all the relation endpoints will be open. This 
  can be a security risk because, for example, GET /OpenModel/{id}/ACLSecuredModel
   will allow full access to ACLSecuredModel through the OpenModel relations.
*/
Compra.getDatosCompra= function(compraId,cb){
	
	Compra.findById(compraId,
		{include: 'menues'},
  		function(err, compra){
  		console.log(compra);
		if(!err && compra)
		{
			app.models.Usuario.findById(compra.Comprador, function(err,usuario){
				if(!err && usuario)
					cb(null,
					{
						fecha:compra.fecha,
						horaLimite:compra.horaLimite,
						comprador:usuario.nombre,
						menues:compra.menues.nombre
					});
				else{
					console.log("No user..");
					cb(null,
					{
						fecha:compra.fecha,
						horaLimite:compra.horaLimite,
						menues:compra.menues.nombre			
					});
				}
			});		
		
		}
		else
			cb(null,{info:"No existe la compra"});
	});
};

Compra.remoteMethod('getDatosCompra',{
	accepts:{arg:'compraId',type:'string'},
	returns:[{arg:'data',type:'object'}],
	http:{verb:'get'}
});

};
