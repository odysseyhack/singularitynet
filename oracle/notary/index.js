'use strict'

/* 
Example:

const payload = new Buffer.from("porca madonna in culo", 'utf8').toString('hex'); 
stamp()
  .then(({ots, hash}) => {
    console.log('Timestamped! Hash ' + hash);
    const buffer = Buffer.from(ots)
    saveOts('file4.ots', buffer)
  })
  .catch(console.log);
 */


const OpenTimestamps = require('javascript-opentimestamps');
const fs             = require('fs');




  /**
   * Create a timestamp
   * @param {hex} hex - The timestamp hex endoded.
   * @return {Promise<fileOts,Error>} if resolve return new ots file serialized as bytes.
   */
async function stamp(hex) {
  const hexEncodedFile = Buffer.from(hex,'hex');
  const detached = OpenTimestamps.DetachedTimestampFile.fromBytes(new OpenTimestamps.Ops.OpSHA256(), hexEncodedFile);
  try {
      await OpenTimestamps.stamp(detached);
      const ots = detached.serializeToBytes();
      const hash = bytesToHex(string2Bin(bin2String(ots)));
      return { ots, hash};
  } catch(err) {
      console.log(err);
  } 
}

async function verify(ots, file) {

}


function bin2String(array) {
	return String.fromCharCode.apply(String, array);
}

function string2Bin(str) {
	var result = [];
	for (var i = 0; i < str.length; i++) {
		result.push(str.charCodeAt(i));
	}
	return result;
}

function bytesToHex (bytes) {
	const hex = [];
	for (var i = 0; i < bytes.length; i++) {
		hex.push((bytes[i] >>> 4).toString(16));
		hex.push((bytes[i] & 0xF).toString(16));
	}
	return hex.join('');
};

function hexToBytes(hex) {
	const bytes = [];
	for (var c = 0; c < hex.length; c += 2) {
		bytes.push(parseInt(hex.substr(c, 2), 16));
	}
	return bytes;
};

function saveOts (otsFilename, buffer) {
  fs.stat(otsFilename, (err, stats) => {
    if (!err) {
      console.log('The timestamp proof \'' + otsFilename + '\' already exists')
    } else {
      fs.writeFile(otsFilename, buffer, 'binary', err => {
        if (err) {
          return console.log(err)
        }
        console.log('The timestamp proof \'' + otsFilename + '\' has been created!')
      })
    }
  })
}




module.exports = { stamp, verify, saveOts };