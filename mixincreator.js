function createMixin (execlib, gclib) {
  'use strict';

  var lib = execlib.lib;

  function GoogleGeocodingMixin (prophash) {
    this.apikey = prophash.googlemapsapikey;
    this.googleGeocoder = null;
    this.googleCityGeocoder = null;
  }
  GoogleGeocodingMixin.prototype.destroy = function () {
    if (this.googleCityGeocoder) {
      this.googleCityGeocoder.destroy();
    }
    this.googleCityGeocoder = null;
    if (this.googleGeocoder) {
      this.googleGeocoder.destroy();
    }
    this.googleGeocoder = null;
    this.apikey = null;
  };
  GoogleGeocodingMixin.prototype.geoCodeLatLng = function (latlngobj) {
    ensureGoogleGeocoderOn(this);
    return this.googleGeocoder.doLatLng(latlngobj);
  };
  GoogleGeocodingMixin.prototype.geoCodeAddressBrief = function (address) {
    ensureGoogleCityGeocoderOn(this);
    return this.googleCityGeocoder.doAddress(address);
  };

  GoogleGeocodingMixin.addMethods = function (klass) {
    lib.inheritMethods(klass, GoogleGeocodingMixin
      ,'geoCodeLatLng'
      ,'geoCodeAddressBrief'
    );
  };

  function ensureGoogleGeocoderOn (service) {
    if (!service.googleGeocoder) {
      service.googleGeocoder = new gclib.Geocoder(service.apikey);  //format needs to be resolved still
    }
  }
  function ensureGoogleCityGeocoderOn (service) {
    if (!service.googleCityGeocoder) {
      service.googleCityGeocoder = new gclib.CityGeocoder(service.apikey);
    }
  }


  return GoogleGeocodingMixin;
}
module.exports = createMixin;
