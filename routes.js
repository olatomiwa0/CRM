module.exports = (app) => {

    //CLIENTS ROUTES
    const clients = require('./controllers');
    app.get('/', clients.root);
    app.post('/clients', clients.addClient);
    app.get('/clients/:clientId', clients.findClient);
    app.put('/clients/:clientId', clients.updateClient);
    app.delete('/clients/:clientId', clients.deleteClient);
    
    app.get('/clients/:s', clients.searchClientByName);

    //PHYSIOS ROUTES
    const physios = require('./controllers');
    app.get('/', physios.root);
    app.post('/physios', physios.addPhysio);
    app.get('/physios/:physioId', physios.findPhysio);
    app.put('/physios/:physioId', physios.updatePhysio);
    app.delete('/physios/:physioId', physios.deletePhysio);

    app.get('physios/:s', physios.searchPhysioByName);

    // SESSIONS ROUTES
    const sessions = require('./controllers');
    app.get('/', sessions.root);
    app.post('/sessions', sessions.addSession);
    app.get('/sessions/:sessionId', sessions.findSession);
    app.put('/sessions/:sessionId', sessions.updateSession);
    app.delete('/sessions/:sessionId', sessions.deleteSession);

    app.get('/sessions/:s', sessions.searchSessionByDate);
}
