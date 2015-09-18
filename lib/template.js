exports.prepareTemplateData = function(keys, values) {
  var templateData = {};

  values.forEach(function(value, i) {
    keys.forEach(function(key, j) {
      if (i === j) {
	templateData[key] = value.rows;
      }
    });
  });

  return templateData;
}
