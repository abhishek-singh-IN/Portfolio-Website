module.exports = function(founduser, profile) {

  if (profile.displayName) {
    if (founduser.displayName == null) {
      founduser.displayName = profile.displayName;
    }
  }
  if (profile.name) {
    if (profile.name.givenName) {
      if (founduser.firstName == null) {
        founduser.firstName = profile.name.givenName
      }
    }

    if (profile.name.familyName) {
      if (founduser.lastName == null) {
        founduser.lastName = profile.name.familyName
      }
    }
  }
  if (profile.photos) {
    if (profile.photos[0].value) {
      if (founduser.icon == null) {
        founduser.icon = profile.photos[0].value
      }
    };
  }
  founduser.save();
};
