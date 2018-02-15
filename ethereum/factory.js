import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x365b226483f4f8c1c323790c94b229863bdba6a9'
);

export default instance;
