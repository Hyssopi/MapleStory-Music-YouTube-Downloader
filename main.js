
const fs = require('fs');
// No ES6, so fetch is not installed by default and need node-fetch
const fetch = require('node-fetch');

const youtubeDownloaderUtilities = require('./scripts/youtubeDownloaderUtilities');


const MAPLESTORY_BGM_DATA_JSON_URL = 'https://raw.githubusercontent.com/maplestory-music/maplebgm-db/master/bgm.json';

fetch(MAPLESTORY_BGM_DATA_JSON_URL)
  .then(response =>
  {
    if (response.ok)
    {
      return response.json();
    }
    else
    {
      console.error('Configuration was not ok.');
    }
  })
  .then(bgm =>
  {
    console.info('Successfully read bgm:');
    //console.log(bgm);
    
    let downloadTaskReference = translateDownloadTask(bgm);
    console.info('downloadTaskReference:');
    console.log(downloadTaskReference);
    
    youtubeDownloaderUtilities.initializeDownloading(downloadTaskReference, false, 'MapleStory Music YouTube Downloader Progress');
  })
  .catch (function(error)
  {
    console.error('Error in fetching: ' + error);
  })


/**
 * Generate the download task reference from the raw JSON data read from maplestory-music/maplebgm-db.
 *
 * @param bgm Raw JSON data read from maplestory-music/maplebgm-db
 * @return Download task reference from the raw JSON data read from maplestory-music/maplebgm-db
 */
function translateDownloadTask(bgm)
{
  let downloadTaskReference =
  {
    videoAudioFileFormat: '.mp4',
    audioOnlyFileFormat: '.mp3',
    outputDirectoryPath: 'MapleStoryMusic',
    parallelDownloadLimit: 3,
    downloadList: []
  };
  
  for (let i = 0; i < bgm.length; i++)
  {
    let downloadEntry =
    {
      linkTag: bgm[i].youtube,
      isAudioOnly: true,
      title: bgm[i].metadata.title,
      status: youtubeDownloaderUtilities.STATUS.PENDING,
      downloadTimeDuration: ''
    };
    downloadTaskReference.downloadList.push(downloadEntry);
  }
  
  return downloadTaskReference;
}
