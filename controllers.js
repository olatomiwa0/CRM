const {Clients} = require('./models');
const {Physios} = require('./models');
const {Sessions} = require('./models');

// CLIENTS CONTROLLERS
exports.addClient = (req, res) => {
    // //validate client
    if(!req.body.firstName || !req.body.surname || !req.body.dob 
        || !req.body.mobilePhone || !req.body.homePhone || !req.body.email
        || !req.body.guardianName || !req.body.permission || !req.body.record
        || !req.body.doctor || !req.body.referred || !req.body.address1 || !req.body.town 
        || !req.body.county){
            return res.status(400).send({
                message: "Required fields cannot be empty."
            });
        }

    //create client
    const client = new Clients({
        title: req.body.title,
        firstName: req.body.firstName,
        surname: req.body.surname,
        dob: req.body.dob,
        mobilePhone: req.body.mobilePhone,
        homePhone: req.body.homePhone,
        email: req.body.email,
        guardianName: req.body.guardianName,
        permission: req.body.permission,
        record: req.body.record,
        doctor: req.body.doctor,
        referred: req.body.referred,
        address1: req.body.address1,
        address2: req.body.address2,
        town: req.body.town,
        county: req.body.county,
        eircode: req.body.eircode
    });

    client.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occured while creating the client"
        });
    });
};

exports.findClient = (req, res) => {
    Clients.findById(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client with Id " + req.params.clientId + " not found."
            });
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Client with Id " + req.params.clientId + " not found."
            });
        }
        return res.status(500).send({
            message: "Error retrieving client with Id " +  req.params.clientId
        });
    });
};

exports.updateClient = (req, res) => {
     //validate client
     if(!req.body.firstName || !req.body.surname || !req.body.dob 
        || !req.body.mobilePhone || !req.body.homePhone || !req.body.email
        || !req.body.guardianName || !req.body.permission || !req.body.record
        || !req.body.doctor || !req.body.referred || !req.body.address1 || !req.body.town 
        || !req.body.county){
            return res.status(400).send({
                message: "Required fields cannot be empty."
            });
        }
//find client by Id and update
    Clients.findByIdAndUpdate(req.params.clientId,{
       $set: {title: req.body.title,
        firstName: req.body.firstName,
        surname: req.body.surname,
        dob: req.body.dob,
        mobilePhone: req.body.mobilePhone,
        homePhone: req.body.homePhone,
        email: req.body.email,
        guardianName: req.body.guardianName,
        permission: req.body.permission,
        record: req.body.record,
        doctor: req.body.doctor,
        referred: req.body.referred,
        address1: req.body.address1,
        address2: req.body.address2,
        town: req.body.town,
        county: req.body.county,
        eircode: req.body.eircode}
        
    },{new: true})
    .then(client => {
        if(!client){
            return res.status(404).send({
                message: "Client with Id " + req.params.clientId + " not found."
            });
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Client with Id " + req.params.clientId + " not found."
            });
        }
        return res.status(500).send({
            message: "Error updating client with Id " + req.params.clientId
        });
    });
};

exports.deleteClient = (req, res) => {
    Clients.findByIdAndRemove(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client with Id " + req.params.clientId + " not found."
            });
        }
        res.send({
            message: "Client deleted successfully!"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Client with Id " + req.params.clientId + " not found."
            });                
        }
        return res.status(500).send({
            message: "Could not delete client with Id " + req.params.clientId
        });
    });
};

exports.searchClientByName = (req, res) => {
    var search = req.params.firstName;
    
    Clients.find({ firstName: new RegExp(search,"ig")})
    .then(firstName => {
        res.render('crm',{
            a: firstName
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred..."
        });
    });
};


//  PHYSIO CONTROLLERS
exports.addPhysio = (req, res) => {
    //validate physio
    if(!req.body.firstName || !req.body.surname || !req.body.mobilePhone || !req.body.homePhone 
        || !req.body.email || !req.body.address1 || !req.body.town || !req.body.county){
            return res.status(400).send({
                message: "Required fields cannot be empty."
            });
        }

    //create physio
    const physio = new Physios({
        title: req.body.title,
        firstName: req.body.firstName,
        surname: req.body.surname,
        mobilePhone: req.body.mobilePhone,
        homePhone: req.body.homePhone,
        email: req.body.email,
        address1: req.body.address1,
        address2: req.body.address2,
        town: req.body.town,
        county: req.body.county,
        eircode: req.body.eircode
    });

    physio.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occured while creating the physiotherapist"
        });
    });
};

exports.findPhysio = (req, res) => {
    Physios.findById(req.params.physioId)
    .then(physio => {
        if(!physio) {
            return res.status(404).send({
                message: "Physiotherapist with Id " + req.params.physioId + " not found."
            });
        }
        res.send(physio);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Physiotherapist with Id " + req.params.physioId + " not found."
            });
        }
        return res.status(500).send({
            message: "Error retrieving physiotherapist with Id " +  req.params.physioId
        });
    });
};

exports.updatePhysio = (req, res) => {
     //validate physio
     if(!req.body.firstName || !req.body.surname || !req.body.mobilePhone || !req.body.homePhone 
        || !req.body.email || !req.body.address1 || !req.body.town || !req.body.county){
            return res.status(400).send({
                message: "Required fields cannot be empty."
            });
        }
//find physio by Id and update
    Physios.findByIdAndUpdate(req.params.physioId,{
        $set: {title: req.body.title,
            firstName: req.body.firstName,
            surname: req.body.surname,
            mobilePhone: req.body.mobilePhone,
            homePhone: req.body.homePhone,
            email: req.body.email,
            address1: req.body.address1,
            address2: req.body.address2,
            town: req.body.town,
            county: req.body.county,
            eircode: req.body.eircode}
    }, {new: true})
    .then(physio => {
        if(!physio){
            return res.status(404).send({
                message: "Physiotherapist with Id " + req.params.physioId + " not found."
            });
        }
        res.send(physio);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Physiotherapist with Id " + req.params.physioId + " not found."
            });
        }
        return res.status(500).send({
            message: "Error updating physiotherapist with Id " + req.params.physioId
        });
    });
};

exports.deletePhysio = (req, res) => {
    Physios.findByIdAndRemove(req.params.physioId)
    .then(physio => {
        if(!physio) {
            return res.status(404).send({
                message: "Physiotherapist with Id " + req.params.physioId + " not found."
            });
        }
        res.send({
            message: "Physiotherapist deleted successfully!"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Physiotherapist with Id " + req.params.physioId + " not found."
            });                
        }
        return res.status(500).send({
            message: "Could not delete physiotherapist with Id " + req.params.physioId
        });
    });
};

exports.searchPhysioByName = (req, res) => {
    var search = req.params.firstName;
    
    Physios.find({ firstName: new RegExp(search,"ig")})
    .then(firstName => {
        res.render('crm',{
            results: firstName
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred..."
        });
    });
};

// SESSION CONTROLLERS
exports.addSession = (req, res) => {
    //validate session
    if(!req.body.sessionDate || !req.body.sessionTime || !req.body.client || !req.body.physio 
        || !req.body.fee || !req.body.sessionNo || !req.body.sessionStatus || !req.body.sessionType
        || !req.body.sessionNotes){
            return res.status(400).send({
                message: "Required fields cannot be empty."
            });
        }

    //create session
    const session = new Sessions({
        sessionDate: req.body.sessionDate,
        sessionTime: req.body.sessionTime,
        client: req.body.client,
        physio: req.body.physio,
        fee: req.body.fee,
        sessionNo: req.body.sessionNo,
        sessionStatus: req.body.sessionStatus,
        sessionType: req.body.sessionType,
        sessionNotes: req.body.sessionNotes
    });

    session.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occured while creating the session"
        });
    });
};

exports.findSession = (req, res) => {
    Sessions.findById(req.params.sessionId)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session with Id " + req.params.sessionId + " not found."
            });
        }
        res.send(session);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Session with Id " + req.params.sessionId + " not found."
            });
        }
        return res.status(500).send({
            message: "Error retrieving session with Id " +  req.params.sessionId
        });
    });
};

exports.updateSession = (req, res) => {
     //validate session
     if(!req.body.sessionDate || !req.body.sessionTime || !req.body.client || !req.body.physio 
        || !req.body.fee || !req.body.sessionNo || !req.body.sessionStatus || !req.body.sessionType
        || !req.body.sessionNotes){
            return res.status(400).send({
                message: "Required fields cannot be empty."
            });
        }
//find session by Id and update
    Sessions.findByIdAndUpdate(req.params.sessionId,{
        $set: {sessionDate: req.body.sessionDate,
            sessionTime: req.body.sessionTime,
            client: req.body.client,
            physio: req.body.physio,
            fee: req.body.fee,
            sessionNo: req.body.sessionNo,
            sessionStatus: req.body.sessionStatus,
            sessionType: req.body.sessionType,
            sessionNotes: req.body.sessionNotes}
    },{new: true})
    .then(session => {
        if(!session){
            return res.status(404).send({
                message: "Session with Id " + req.params.sessionId + " not found."
            });
        }
        res.send(session);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Session with Id " + req.params.sessionId + " not found."
            });
        }
        return res.status(500).send({
            message: "Error updating session with Id " + req.params.sessionId
        });
    });
};
//delete session by id
exports.deleteSession = (req, res) => {
    Sessions.findByIdAndRemove(req.params.sessionId)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session with Id " + req.params.sessionId + " not found."
            });
        }
        res.send({
            message: "Session deleted successfully!"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound'){
            return res.status(404).send({
                message: "Session with Id " + req.params.sessionId + " not found."
            });                
        }
        return res.status(500).send({
            message: "Could not delete session with Id " + req.params.sessionId
        });
    });
};

exports.searchSessionByDate = (req, res) => {
    var search = req.params.sessionDate;
    
    Sessions.find({ sessionDate: new RegExp(search,"ig")})
    .then(sessionDate => {
        res.render('crm',{
            results: sessionDate
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred..."
        });
    });
};

//////////////////////////////////////////////////////
exports.root = (req, res) => {
    Clients.find().then(clients => {
           res.render('crm', {
            a: clients,
          });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all data."
        });
    });
};