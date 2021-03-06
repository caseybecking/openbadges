var fs = require('fs')
  , path = require('path')
  , crypto = require('crypto')
  , logger = require('./logging').logger
  , configuration = require('./configuration')
  , Badge = require('../models/badge')

var hashObject = function(obj) {
  var sum = crypto.createHash('md5')
    , serialized = JSON.stringify(obj)
  return sum.update(serialized).digest('hex');
}

var award = module.exports = function(assertion, url, imagedata, callback) {
  var badgeDir = configuration.get('badge_path')
    , filename = hashObject(assertion) + '.png'
    , filepath = path.join(badgeDir, filename)

  callback = callback || function(){};
  fs.writeFile(filepath, imagedata, function(err){
    var badge, meta;
    if (err) return callback(err);
    badge = new Badge(assertion);
    meta = badge.meta
    meta.pingback = url;
    meta.imagePath = path.join(badgeDir.replace(/^.*?static/, ''), filename);
    meta.imageData = imagedata.toString('base64');
    badge.upsert(function(err, badge){
      if (err) return callback(err);
      return callback(null, badge);
    })
  })
}
