var async = require('async');
module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.mongoDs; // 'name' of your mongo connector, you can find it in datasource.json
 // var mysqlDs = app.dataSources.mysqlDs;
  //create all models


  async.parallel({
    usuarios: async.apply(createUsers),
    menues: async.apply(createMenues),
    compras: async.apply(createCompras),
  }, function(err, results) {
    if (err) throw err;

    createSuscripciones(results.usuarios, results.menues, results.compras, function(err) {
      console.log('> sample models created sucessfully');
    });
  });


  //create reviewers
  function createUsers(cb) {
    mongoDs.automigrate('Usuario', function(err) {
      if (err) return cb(err);
      var Usuario = app.models.Usuario;
      Usuario.create([
      {
        nombre:'Vale',
        email: 'Vale@vale.com',
        password: 'test'
      },
      {
        nombre:'Maxi',
        email: 'maxi@maxi.com',
        password: 'test'
      }, {
        nombre:'Alan',
        email: 'alan@alan.com',
        password: 'test2'
      }, {
        nombre:'Diego',
        email: 'diego@diego.com',
        password: 'test3'
      }], cb);
    });
  }

  function createMenues(cb) {
    mongoDs.automigrate('Menu', function(err) {
      if (err) return cb(err);
      var Menu = app.models.Menu;
      Menu.create([{
        nombre: 'Pastel de papas'
      }, {
        nombre: 'Polenta'
      }, {
        nombre: 'Milanesas'
      }], cb);
    });
  }

    function createCompras(cb) {
    mongoDs.automigrate('Compra', function(err) {
      if (err) return cb(err);
      var Compra = app.models.Compra;
      Compra.create([{
        fecha: '2017-06-18 03:25:11.305Z',
        horaLimite: '10:00',        
      }], cb);
    });
  }


  function createSuscripciones(usuarios, menues, compras, cb) {

    app.models.Compra.updateAll({id:compras[0].id},{Compador:usuarios[0].id},function(err,info)
    {

    });  

    mongoDs.automigrate('Suscripcion', function(err) {
      if (err) return cb(err);
      var Suscripcion = app.models.Suscripcion;

      Suscripcion.create([{
        usuarioId:usuarios[0].id,      
        menuId: menues[0].id,
        esDeCompra: compras[0].id,
      }, {
        usuarioId:usuarios[1].id,      
        menuId: menues[0].id,
        esDeCompra: compras[0].id,
      }, {
        usuarioId:usuarios[2].id,      
        menuId: menues[0].id,
        esDeCompra: compras[0].id,
      }, {
        usuarioId:usuarios[3].id,      
        menuId: menues[0].id,
        esDeCompra: compras[0].id,
      }], cb);
    });


  }
};
