
const fs = require('fs');


// From utilities.js
const utilities = {};

/**
 * Sanitize input string to get filename-safe string.
 *
 * @param filename Filename to sanitize
 * @return Sanitized filename-safe string
 */
function getSanitizedFilename(filename)
{
  return filename.replace(/[^A-Za-z0-9-_ \[\]()]/g, '_');
}
utilities.getSanitizedFilename = getSanitizedFilename;

/**
 * Check if the path exists.
 *
 * @param path Path to check
 * @return True if the path exists in the given path, false if the path does not exist
 */
function isPathExist(path)
{
  return fs.existsSync(path);
}
utilities.isPathExist = isPathExist;

/**
 * Write text to a file.
 *
 * @param filePath Path and filename of the file to save
 * @param contents Text to write to file
 */
function writeToFile(filePath, contents)
{
  fs.writeFile(filePath, contents, function(error)
  {
    if (error)
    {
      return console.error(error);
    }
  });
}
utilities.writeToFile = writeToFile;

// Export
module.exports = utilities;
