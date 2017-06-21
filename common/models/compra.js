'use strict';

module.exports = function(Compra) {


Compra.getDatosCompra= function(compraId,cb){
	Compra.findById(compraId,function(err, compra){
		if(!err && compra)
		{
			cb(null,
				{
					fecha:compra.fecha,
					horaLimite:compra.horaLimite
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
