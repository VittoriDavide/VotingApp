import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xd6be507ba5698ee31ba49ab2281b5be06e545a50'
);

export default instance;
