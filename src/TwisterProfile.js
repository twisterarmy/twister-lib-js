var inherits = require('inherits');

var TwisterResource = require('./TwisterResource.js');

/**
 * Describes the profile of a {@link TwisterUser}.
 * @class
 */
TwisterProfile = function (name,scope) {
    
    TwisterResource.call(this,name,scope);
    
    this._type = "profile";

    
}

inherits(TwisterProfile,TwisterResource);

module.exports = TwisterProfile;

TwisterProfile.prototype._queryAndDo = function (cbfunc) {

    var thisResource = this;
    
    var Twister = this._scope;
    
    thisResource.dhtget([thisResource._name, "profile", "s"],
                   
        function (result) {

            if (result[0]) {

                thisResource._data=result[0].p.v;
                thisResource._revisionNumber=result[0].p.seq;
                thisResource._lastUpdate=Date.now()/1000;
                cbfunc(thisResource);

            } else {
			
				
                thisResource._revisionNumber=0;
                thisResource._lastUpdate=Date.now()/1000;
                cbfunc(thisResource);
			
			}

        }

    );   
        
}

TwisterProfile.prototype.getAllFields = function () {

    return this._data;
    
}

TwisterProfile.prototype.getField = function (fieldname) {

    return this._data[fieldname];
    
}